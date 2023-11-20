import type { CreateChatCompletionRequest } from "openai";
import type { Database } from "./database.js";

type ProcessedDocumentChunk =
	Database["public"]["Tables"]["processed_document_chunks"]["Row"];
type RegisteredDocument =
	Database["public"]["Tables"]["registered_documents"]["Row"];
type ProcessedDocument =
	Database["public"]["Tables"]["processed_documents"]["Row"];
type ProcessedDocumentSummary =
	Database["public"]["Tables"]["processed_document_summaries"]["Row"];

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
	query: string;
	temperature: number;
	match_threshold: number;
	num_probes: number;
	match_count: number;
	openai_model: Model;
	chunk_limit: number;
	summary_limit: number;
	document_limit: number;
	search_algorithm: Algorithms;
	include_summary_in_response_generation: boolean;
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

export interface ProcessedDocumentSummaryMatch {
	processed_document_summary: ProcessedDocumentSummary;
	similarity: number;
}

export interface ProcessedDocumentChunkMatch {
	processed_document_chunk: ProcessedDocumentChunk;
	similarity: number;
}

export interface ResponseDocumentMatch {
	registered_document: RegisteredDocument;
	processed_document: ProcessedDocument;
	processed_document_summary_match: ProcessedDocumentSummaryMatch;
	processed_document_chunk_matches: Array<ProcessedDocumentChunkMatch>;
	similarity: number;
}

export interface ResponseDetail {
	gpt: Gpt;
	documentMatches: ResponseDocumentMatch[];
	requestBody: Body;
	completionOptions: CreateChatCompletionRequest;
}

export enum Algorithms {
	ChunksAndSummaries = "chunks-and-summaries",
	ChunksOnly = "chunks-only",
	SummariesThenChunks = "summaries-then-chunks",
}

export const availableAlgorithms = [
	{
		temperature: 0,
		match_threshold: 0.85,
		num_probes: 8,
		openai_model: "gpt-3.5-turbo-16k",
		document_limit: 3,
		search_algorithm: Algorithms.ChunksOnly,
		match_count: 64,
		include_summary_in_response_generation: false,
	} as Body,
	{
		temperature: 0,
		match_threshold: 0.85,
		num_probes: 8,
		openai_model: "gpt-3.5-turbo-16k",
		chunk_limit: 128,
		summary_limit: 16,
		document_limit: 3,
		search_algorithm: Algorithms.ChunksAndSummaries,
		include_summary_in_response_generation: false,
	} as Body,
	{
		temperature: 0,
		match_threshold: 0.85,
		num_probes: 8,
		openai_model: "gpt-3.5-turbo-16k",
		document_limit: 3,
		search_algorithm: Algorithms.SummariesThenChunks,
		match_count: 64,
		include_summary_in_response_generation: false,
	} as Body,
];
