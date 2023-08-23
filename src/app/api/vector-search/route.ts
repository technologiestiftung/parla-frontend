import { codeBlock, oneLine } from "common-tags";
import GPT3Tokenizer from "gpt3-tokenizer";
import type { CreateChatCompletionRequest } from "openai";
import { ApplicationError, EnvError, UserError } from "../../../lib/errors";
import supabase from "../../../lib/supabase";
import { NextRequest } from "next/server";
import { Database } from "@/lib/database";

type Section = Database["public"]["Tables"]["parsed_document_sections"]["Row"];
type Pdf = Database["public"]["Tables"]["dokument"]["Row"];
type Doc = Database["public"]["Tables"]["parsed_documents"]["Row"];
export const runtime = "edge";

interface Gpt {
	id: string;
	object: string;
	created: number;
	model: string;
	choices: Choice[];
	usage: Usage;
}

interface Choice {
	index: number;
	message: {
		role: string;
		content: string;
	};
	finish_reason: string;
}

interface Usage {
	prompt_tokens: number;
	completion_tokens: number;
	total_tokens: number;
}

export interface ResponseSection extends Partial<Section> {
	parsed_documents?: Doc[];
	pdfs?: Pdf[];
}

export interface ResponseDetail {
	gpt?: Gpt;
	sections: ResponseSection[];
}
export async function POST(req: NextRequest) {
	try {
		const OPENAI_KEY = process.env.OPENAI_KEY;
		const OPENAI_MODEL = process.env.OPENAI_MODEL;
		if (OPENAI_KEY === undefined) throw new EnvError("OPENAI_KEY");
		if (OPENAI_MODEL === undefined) throw new EnvError("OPENAI_MODEL");
		let MAX_CONTENT_TOKEN_LENGTH = 1500;
		const MAX_TOKENS = 2048;
		// set MAX_CONTENT_LENGTH based on the openai model
		// models we use
		// - gpt-4 has max tokens length of 8192
		// - gpt-3.5-turbo has max tokens length of 4096
		// - gpt-3.5-turbo-16k has max tokens length of 16384
		switch (OPENAI_MODEL) {
			case "gpt-4":
				MAX_CONTENT_TOKEN_LENGTH = 8192;
				// MAX_TOKENS = 8192;
				break;
			case "gpt-3.5-turbo":
				MAX_CONTENT_TOKEN_LENGTH = 2048;
				// MAX_TOKENS = 2048;
				break;
			case "gpt-3.5-turbo-16k":
				MAX_CONTENT_TOKEN_LENGTH = 8192;
				// MAX_TOKENS = 16384;
				break;
			default:
				MAX_CONTENT_TOKEN_LENGTH = 1500;
				// MAX_TOKENS = 2048;
				break;
		}

		// 1. get the query from the request ✓
		const requestJson = await req.json();

		const { query } = requestJson;
		if (query === undefined) {
			throw new UserError("query in JSON body is undefined");
		}

		// 2. moderate content
		// Moderate the content to comply with OpenAI T&C
		const sanitizedQuery = query.trim();
		const moderationResponse = await fetch(
			"https://api.openai.com/v1/moderations",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${OPENAI_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					input: sanitizedQuery,
				}),
			},
		);

		if (!moderationResponse.ok) {
			throw new ApplicationError(
				`OpenAI moderation failed with status ${moderationResponse.status}`,
			);
		}
		const moderationResponseJson = await moderationResponse.json();

		const [results] = moderationResponseJson.results;

		if (results.flagged) {
			throw new UserError("Flagged content", {
				flagged: true,
				categories: results.categories,
			});
		}
		// 3. generate an embeedding using openai api
		const embeddingResponse = await fetch(
			"https://api.openai.com/v1/embeddings",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${OPENAI_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "text-embedding-ada-002",
					input: sanitizedQuery.replaceAll("\n", " "),
				}),
			},
		);

		if (embeddingResponse.status !== 200) {
			throw new ApplicationError(
				"Failed to create embedding for question",
				embeddingResponse,
			);
		}

		const {
			data: [{ embedding }],
		} = await embeddingResponse.json();

		// 4. make the similarity search
		const { error: matchError, data: docSections } = await supabase.rpc(
			"match_parsed_dokument_sections",
			{
				embedding,
				match_threshold: 0.85,
				match_count: 5,
				min_content_length: 50,
			},
		);
		console.log("docSections", docSections);

		if (matchError) {
			throw new ApplicationError("Failed to match page sections", matchError);
		}
		const ids = docSections.map((section) => section.id);
		const { error: pagesError, data: sections } = await supabase
			.from("parsed_document_sections")
			.select("content,id,parsed_document_id")
			.in("id", ids);

		if (pagesError) {
			throw new ApplicationError(
				"Failed to match pages to pageSections",
				pagesError,
			);
		}
		const responseDetail: ResponseDetail = {
			sections: sections,
		};
		// match documents to pdfs
		const { error: docsError, data: docs } = await supabase
			.from("parsed_documents")
			.select("*")
			.in(
				"id",
				sections.map((section) => section.parsed_document_id),
			);
		if (docsError) {
			throw new ApplicationError("Failed to match docsSections to docs");
		}
		responseDetail.sections.forEach((section, i, arr) => {
			section.parsed_documents = docs.filter(
				(doc) => doc.id === section.parsed_document_id,
			);
		});

		const { error: pdfError, data: pdfs } = await supabase
			.from("dokument")
			.select("*")
			.in(
				"id",
				docs.map((doc) => doc.dokument_id),
			);
		if (pdfError) {
			throw new ApplicationError("Failed to match docs to pdfs");
		}

		responseDetail.sections.forEach((section, i, arr) => {
			section.pdfs = pdfs.filter(
				(pdf) =>
					section.parsed_documents
						?.map((doc) => doc.dokument_id)
						.includes(pdf.id),
			);
		});
		// 4. create a prompt with the
		const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
		let tokenCount = 0;
		let contextText = "";
		const uniqueSectionIds = new Set();
		for (const sec of sections) {
			uniqueSectionIds.add(sec.id);
		}
		for (let i = 0; i < sections.length; i++) {
			const section = sections[i];
			let content = section.content ?? "";

			const encoded = tokenizer.encode(content);
			tokenCount += encoded.text.length;

			if (tokenCount >= MAX_CONTENT_TOKEN_LENGTH) {
				throw new ApplicationError(
					`Reached max token count of ${MAX_CONTENT_TOKEN_LENGTH}.`,
					{
						tokenCount,
					},
				);
				break;
			}

			contextText += `${content.trim()}\n---\n`;
		}
		const prompt = codeBlock`
		${oneLine`
			Du bist ein KI Assistent des Verwaltung. Du antwortest immer in Deutsch. Du benutzt immer das Sie nie das du.
			Mit den folgenden Abschnitte aus das den schriftlichen Anfragen, beantwortest du die Frage nur mit diesen Informationen. Schreibe dazu eine ausführeliche Zusammenfassung der Abschnitte des schriftlichen Anfragen. Trenne deine Antwort und deine Zusammenfassung mit einem neue indem du "Zusammenfassung:" voran stellst.
		`}
		${oneLine`Abschnitte des schriftlichen Anfrage:`}
		${contextText}
		${oneLine`Ende Abschnitte des schriftlichen Anfrage`}

		Antworte in diesem Format:
		~~~
		**Antwort:** Text
		Zusammenfasing: Text
		~~~
		Das ist die Frage des Benutzers:
	`;
		const completionOptions: CreateChatCompletionRequest = {
			model: OPENAI_MODEL,
			messages: [
				{
					role: "system",
					content: prompt,
				},
				{ role: "user", content: sanitizedQuery },
			],
			// max tokens only applies to the reponse length
			max_tokens: MAX_TOKENS,
			temperature: 0.5,
			stream: false,
		};
		// console.log("These are the complitionOptions");
		console.log(completionOptions);
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${OPENAI_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(completionOptions),
		});

		if (response.status !== 200) {
			throw new ApplicationError(
				"Failed to create completion for question",
				response,
			);
		}
		const json = await response.json();
		responseDetail.gpt = json;

		return new Response(JSON.stringify([responseDetail] as ResponseDetail[]), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "s-maxage=10, stale-while-revalidate",
			},
		});
	} catch (error: unknown) {
		if (error instanceof UserError) {
			console.error(error);
			return new Response(JSON.stringify({ error: error.message }), {
				status: 400,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "s-maxage=10, stale-while-revalidate",
				},
			});
		}
		console.error(error);
		return new Response(JSON.stringify({ error: "unknown error" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "s-maxage=10, stale-while-revalidate",
			},
		});
	}
}
