import { codeBlock, oneLine } from "common-tags";
import GPT3Tokenizer from "gpt3-tokenizer";
import type { CreateChatCompletionRequest } from "openai";
import { ApplicationError, EnvError, UserError } from "../../../lib/errors";
import supabase from "../../../lib/supabase";
import { NextRequest } from "next/server";

export const config = {
	runtime: "edge",
};

export async function POST(req: NextRequest) {
	try {
		const OPENAI_KEY = process.env.OPENAI_KEY;
		const OPENAI_MODEL = process.env.OPENAI_MODEL;
		if (OPENAI_KEY === undefined) throw new EnvError("OPENAI_KEY");
		if (OPENAI_MODEL === undefined) throw new EnvError("OPENAI_MODEL");

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
				match_threshold: 0.78,
				match_count: 10,
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
			.select("*")
			.in("id", ids);

		if (pagesError) {
			throw new ApplicationError(
				"Failed to match pages to pageSections",
				pagesError,
			);
		}
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
			// filter one unique page from the array pages by matching the content pageSection["page_id"] with the page.id
			// if (uniqueSectionIds.has(section.id)) {
			// 	const section = sections.find(
			// 		(sec) => sec.id === section.id,
			// 	) as Database["public"]["Tables"]["parsed_document_sections"]["Row"];
			// 	// if (section) {
			// 	// 	content += `**[Quelle](${section.})**\n\n`;
			// 	// }
			// }

			const encoded = tokenizer.encode(content);
			tokenCount += encoded.text.length;

			if (tokenCount >= 1500) {
				// throw new ApplicationError("Reached max token count of 1500.", {
				// 	tokenCount,
				// });
				break;
			}

			contextText += `${content.trim()}\n---\n`;
		}
		const prompt = codeBlock`
		${oneLine`
			Du bist ein freundlicher Assistent des Verwaltung. Du antwortest immer in Deutsch. Du benutzt immer das Sie nie das du.
			Mit den folgenden Abschnitte aus das den schriftlichen Anfragen, beantwortest du die Frage nur mit diesen Informationen, ausgegeben im Markdown-Format. Wenn du unsicher bist und die Antwort nicht explizit in dem Abschnitte des schriftlichen Anfrage: steht, sagst du: Entschuldigung, damit kann ich leider nicht helfen.
		`}
		${oneLine`Abschnitte des schriftlichen Anfrage:`}
		${contextText}
		Antwort als Markdown (mit möglichen Zitaten in Anführungszeichen), in diesem Format:
		Antwort Text

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
			max_tokens: 2048,
			temperature: 0,
			stream: false,
		};
		console.log("These are the complitionOptions");
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

		return new Response(
			JSON.stringify({
				json,
				pdfs,
				sections,
				docs,
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "s-maxage=10, stale-while-revalidate",
				},
			},
		);
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
