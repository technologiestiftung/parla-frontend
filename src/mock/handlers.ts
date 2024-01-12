import { http, HttpResponse, delay } from "msw";

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
];
