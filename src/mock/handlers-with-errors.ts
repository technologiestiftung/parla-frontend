import { http, HttpResponse, delay } from "msw";

export const handlersWithErrors = [
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
		await delay(500);
		const res = HttpResponse.json(
			{ error: "something failed" },
			{ status: 500 },
		);
		return res;
	}),

	http.post("http://localhost:8080/generate-answer", async () => {
		await delay(500);
		const res = HttpResponse.json(
			{ error: "something failed" },
			{ status: 500 },
		);
		return res;
	}),
];
