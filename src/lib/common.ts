import type {
	CreateChatCompletionRequest,
	CreateChatCompletionResponse,
} from "openai";
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

export interface DocumentSearchBody {
	query: string;
	match_threshold: number;
	num_probes: number;
	match_count: number;
	chunk_limit: number;
	summary_limit: number;
	document_limit: number;
	search_algorithm: Algorithms;
}

export interface GenerateAnswerBody {
	query: string;
	documentMatches: Array<ResponseDocumentMatch>;
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

export interface DocumentSearchResponse {
	documentMatches: ResponseDocumentMatch[];
}

export interface GenerateAnswerResponse {
	answer: CreateChatCompletionResponse;
}

export interface HistoryEntryType {
	id: string;
	query: string;
	searchResponse: DocumentSearchResponse;
	answerResponse: GenerateAnswerResponse;
}

export enum Algorithms {
	ChunksAndSummaries = "chunks-and-summaries",
	ChunksOnly = "chunks-only",
	SummariesThenChunks = "summaries-then-chunks",
}

export const availableAlgorithms = [
	{
		match_threshold: 0.85,
		num_probes: 8,
		chunk_limit: 64,
		document_limit: 3,
		search_algorithm: Algorithms.ChunksOnly,
	} as DocumentSearchBody,
	{
		match_threshold: 0.85,
		num_probes: 8,
		chunk_limit: 128,
		summary_limit: 16,
		document_limit: 3,
		search_algorithm: Algorithms.ChunksAndSummaries,
	} as DocumentSearchBody,
	{
		match_threshold: 0.85,
		num_probes: 8,
		summary_limit: 64,
		document_limit: 3,
		search_algorithm: Algorithms.SummariesThenChunks,
	} as DocumentSearchBody,
];
