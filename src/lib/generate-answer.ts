import { GenerateAnswerResponse, GenerateAnswerBody } from "./common";

const API_URL =
	process.env.NEXT_PUBLIC_KI_ANFRAGEN_API_URL || "http://localhost:8080";

type InputType = GenerateAnswerBody & {
	signal?: AbortSignal;
};

export async function generateAnswer({
	query,
	documentMatches,
	signal,
}: InputType): Promise<GenerateAnswerResponse> {
	if (!query) throw new Error("no query provided");

	const response = await fetch(`${API_URL}/generate-answer`, {
		signal,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query, documentMatches }),
	});
	if (!response.ok) {
		const error = await response.json();
		console.error(error);
		throw new Error(error);
	}
	const json = (await response.json()) as GenerateAnswerResponse;
	return json;
}
