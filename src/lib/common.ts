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
	num_probes_summaries: number;
	num_probes_chunks: number;
	match_count: number;
	chunk_limit: number;
	summary_limit: number;
	document_limit: number;
	search_algorithm: Algorithms;
}

export interface GenerateAnswerBody {
	userRequestId: string;
	query: string;
	documentMatches: Array<ResponseDocumentMatch>;
	include_summary_in_response_generation: boolean;
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
	userRequestId: string;
	documentMatches: ResponseDocumentMatch[];
}

export interface Feedback {
	id?: number;
	created_at?: string;
	feedback_id: number;
	request_id: number;
	session_id: string;
}

export interface HistoryEntryType {
	id: string;
	query: string;
	feedbacks: Feedback[];
	searchResponse: DocumentSearchResponse;
	answerResponse: string;
}

export enum Algorithms {
	ChunksAndSummaries = "chunks-and-summaries",
	ChunksOnly = "chunks-only",
	SummariesThenChunks = "summaries-then-chunks",
}

export const availableAlgorithms = [
	{
		match_threshold: 0.85,
		num_probes_summaries: 3,
		num_probes_chunks: 9,
		chunk_limit: 64,
		document_limit: 20,
		search_algorithm: Algorithms.ChunksOnly,
	} as DocumentSearchBody,
	{
		match_threshold: 0.85,
		num_probes_summaries: 3,
		num_probes_chunks: 9,
		chunk_limit: 128,
		summary_limit: 16,
		document_limit: 20,
		search_algorithm: Algorithms.ChunksAndSummaries,
	} as DocumentSearchBody,
	{
		match_threshold: 0.85,
		num_probes_summaries: 3,
		num_probes_chunks: 9,
		summary_limit: 64,
		document_limit: 20,
		search_algorithm: Algorithms.SummariesThenChunks,
	} as DocumentSearchBody,
];

export interface FeedbackType {
	id: number;
	tag: string | null;
	kind: "positive" | "negative";
}
