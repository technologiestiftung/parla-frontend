import { http, HttpResponse, delay } from "msw";
import { vectorSearchResponse } from "./fixtures";

export const handlers = [
	http.get("http://localhost:8080/processed_documents/count", async () => {
		await delay(100);
		const res = HttpResponse.json(
			{
				processed_documents_count: 9939,
			},
			{ status: 200 },
		);
		return res;
	}),

	http.post("http://localhost:8080/vector-search", async () => {
		await delay(2000);
		const res = HttpResponse.json(vectorSearchResponse, { status: 200 });
		return res;
	}),

	http.post("http://localhost:8080/generate-answer", async () => {
		await delay(2000);
		const res = HttpResponse.text(
			"This is a AI-generate answer which is always correct.",
			{ status: 200 },
		);
		return res;
	}),
];
