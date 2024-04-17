const API_URL =
	process.env.NEXT_PUBLIC_PARLA_API_URL || "http://localhost:8080";

export async function getAllFeedbacks(): Promise<any> {
	const response = await fetch(`${API_URL}/feedbacks`, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error("Could not load user request from API");
	}

	const json = await response.json();

	return json;
}
