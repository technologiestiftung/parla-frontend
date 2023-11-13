import type { CreateChatCompletionRequest } from "openai";
import type { Database } from "./database.js";

type Section = Database["public"]["Tables"]["processed_document_chunks"]["Row"];
type RegisteredDocuments =
	Database["public"]["Tables"]["registered_documents"]["Row"];
type Doc = Database["public"]["Tables"]["processed_documents"]["Row"];

export type Model =
	| "gpt-4"
	| "gpt-3.5-turbo"
	| "gpt-3.5-turbo-16k"
	| "gpt-3.5-turbo-1106";

export interface Question {
	query: string;
	pdf: string;
}

export interface Body {
	query?: string;
	temperature?: number;
	match_threshold?: number;
	num_probes?: number;
	match_count?: number;
	min_content_length?: number;
	openai_model?: Model;
}

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
	finish_reason?: string;
}

interface Usage {
	prompt_tokens: number;
	completion_tokens: number;
	total_tokens: number;
}

export interface ResponseSectionDocument extends Partial<Section> {
	processed_documents?: Doc[];
	similarity?: number;
	registered_documents?: RegisteredDocuments[];
}

export interface ResponseDetail {
	gpt: Gpt;
	sections: ResponseSectionDocument[];
	requestBody: Body;
	completionOptions: CreateChatCompletionRequest;
}
