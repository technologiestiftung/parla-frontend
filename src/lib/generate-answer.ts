import { GenerateAnswerBody } from "./common";

const API_URL =
	process.env.NEXT_PUBLIC_PARLA_API_URL || "http://localhost:8080";

type InputType = GenerateAnswerBody & {
	signal?: AbortSignal;
	chunkCallback: (answer: string) => void;
};

export async function generateAnswer({
	userRequestId,
	query,
	documentMatches,
	include_summary_in_response_generation,
	signal,
	chunkCallback,
}: InputType): Promise<string> {
	if (!query) throw new Error("no query provided");

	const response = await fetch(`${API_URL}/generate-answer`, {
		signal,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			userRequestId: userRequestId,
			include_summary_in_response_generation,
			query,
			documentMatches,
		}),
	});

	if (!response.body) {
		throw new Error("Could not generate answer");
	}

	const reader = response.body.getReader();
	let chunks = [];

	while (true) {
		const { value, done } = await reader.read();
		if (done) {
			break;
		}
		const rawChunk = new TextDecoder().decode(value, { stream: true });
		chunks.push(rawChunk);
		chunkCallback(chunks.join(""));
	}

	return chunks.join("");
}
