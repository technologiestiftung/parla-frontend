import { codeBlock, oneLine } from "common-tags";
import GPT3Tokenizer from "gpt3-tokenizer";
import type { CreateChatCompletionRequest } from "openai";
import { ApplicationError, EnvError, UserError } from "../../../lib/errors";
import supabase from "../../../lib/supabase";
import { NextRequest } from "next/server";
import { Database } from "@/lib/database";
import { createPrompt } from "./creat-prompt";

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
	similarity?: number;
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
		const { error: matchSectionError, data: docSections } = await supabase.rpc(
			"match_parsed_dokument_sections",
			{
				embedding,
				match_threshold: 0.85,
				match_count: 5,
				min_content_length: 50,
			},
		);
		if (matchSectionError) {
			throw new ApplicationError(
				"Failed to match page sections",
				matchSectionError,
			);
		}
		const { error: sectionsError, data: sections } = await supabase
			.from("parsed_document_sections")
			.select("content,id,parsed_document_id")
			.in(
				"id",
				docSections.map((section) => section.id),
			);

		if (sectionsError) {
			throw new ApplicationError(
				"Failed to match pages to pageSections",
				sectionsError,
			);
		}
		const responseDetail: ResponseDetail = {
			sections: sections.map((section) => {
				const docSection = docSections.find((sec) => section.id === sec.id);
				return {
					similarity: docSection?.similarity ?? 0,
					...section,
				};
			}),
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
		responseDetail.sections.forEach((section) => {
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
		const completionOptions = createPrompt({
			sections,
			MAX_CONTENT_TOKEN_LENGTH,
			OPENAI_MODEL,
			sanitizedQuery,
			MAX_TOKENS,
		});

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

		// START ----------------------------------------------------------------
		// TODO: This is only for testing purpose and can be removed
		const { error: matchSectionErrorLarge, data: docSectionsLarge } =
			await supabase.rpc("match_parsed_dokument_sections_large", {
				embedding,
				match_threshold: 0.85,
				match_count: 5,
				min_content_length: 50,
			});
		if (matchSectionErrorLarge) {
			throw new ApplicationError(
				"Failed to match page sections large",
				matchSectionErrorLarge,
			);
		}

		const { error: sectionsErrorLarge, data: sectionsLarge } = await supabase
			.from("parsed_document_sections_large")
			.select("content,id,parsed_document_id")
			.in(
				"id",
				docSectionsLarge.map((section) => section.id),
			);

		if (sectionsErrorLarge) {
			throw new ApplicationError(
				"Failed to match pages to pageSections Large",
				sectionsErrorLarge,
			);
		}
		const responseDetailLarge: ResponseDetail = {
			sections: sectionsLarge.map((section) => {
				const docSection = docSectionsLarge.find(
					(sec) => section.id === sec.id,
				);
				return {
					similarity: docSection?.similarity ?? 0,
					...section,
				};
			}),
		};

		const { error: docsLargeError, data: docsLarge } = await supabase
			.from("parsed_documents")
			.select("*")
			.in(
				"id",
				sectionsLarge.map((section) => section.parsed_document_id),
			);
		if (docsLargeError) {
			throw new ApplicationError("Failed to match docsSections to docs");
		}
		responseDetailLarge.sections.forEach((section) => {
			section.parsed_documents = docsLarge.filter(
				(doc) => doc.id === section.parsed_document_id,
			);
		});
		console.log(responseDetailLarge);
		const { error: pdfErrorLarge, data: pdfsLarge } = await supabase
			.from("dokument")
			.select("*")
			.in(
				"id",
				docsLarge.map((doc) => doc.dokument_id),
			);
		if (pdfErrorLarge) {
			throw new ApplicationError("Failed to match docs to pdfs large");
		}

		responseDetailLarge.sections.forEach((section) => {
			section.pdfs = pdfsLarge.filter(
				(pdf) =>
					section.parsed_documents
						?.map((doc) => doc.dokument_id)
						.includes(pdf.id),
			);
		});

		const completionOptionsLarge = createPrompt({
			sections: responseDetailLarge.sections,
			MAX_CONTENT_TOKEN_LENGTH,
			OPENAI_MODEL,
			sanitizedQuery,
			MAX_TOKENS,
		});

		const responseLarge = await fetch(
			"https://api.openai.com/v1/chat/completions",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${OPENAI_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(completionOptionsLarge),
			},
		);

		if (responseLarge.status !== 200) {
			throw new ApplicationError(
				"Failed to create completion for question",
				responseLarge,
			);
		}
		const jsonLarge = await responseLarge.json();
		responseDetailLarge.gpt = jsonLarge;
		// END ----------------------------------------------------------------

		return new Response(
			JSON.stringify([responseDetail, responseDetailLarge] as ResponseDetail[]),
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
