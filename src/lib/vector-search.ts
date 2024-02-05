import { DocumentSearchResponse, DocumentSearchBody } from "./common";

const API_URL =
	process.env.NEXT_PUBLIC_PARLA_API_URL || "http://localhost:8080";

type InputType = DocumentSearchBody & {
	signal?: AbortSignal;
};

export async function vectorSearch({
	query,
	match_threshold,
	num_probes_chunks,
	num_probes_summaries,
	chunk_limit,
	summary_limit,
	document_limit,
	search_algorithm,
	signal,
}: InputType): Promise<DocumentSearchResponse> {
	if (!query) throw new Error("no query provided");

	const response = await fetch(`${API_URL}/vector-search`, {
		signal,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query,
			match_threshold,
			num_probes_chunks,
			num_probes_summaries,
			search_algorithm,
			chunk_limit,
			summary_limit,
			document_limit,
		}),
	});
	if (!response.ok) {
		const error = await response.json();
		console.error(error);
		throw new Error(error);
	}
	const json = (await response.json()) as DocumentSearchResponse;
	return json;
}
