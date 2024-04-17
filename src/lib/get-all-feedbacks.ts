const API_URL =
	process.env.NEXT_PUBLIC_PARLA_API_URL || "http://localhost:8080";

export async function getAllFeedbacks(signal?: AbortSignal): Promise<any> {
	try {
		const response = await fetch(`${API_URL}/feedbacks`, {
			method: "GET",
			signal,
		});

		if (!response.ok) {
			throw new Error("Could not load user request from API");
		}

		const json = await response.json();

		return json;
	} catch (error) {
		if ((error as Error).name === "AbortError") {
			return;
		}

		throw error;
	}
}
