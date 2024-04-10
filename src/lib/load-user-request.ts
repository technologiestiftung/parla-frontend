const API_URL =
	process.env.NEXT_PUBLIC_PARLA_API_URL || "http://localhost:8080";

export async function loadUserRequest(
	userRequestId: string,
	signal?: AbortSignal,
): Promise<any> {
	const response = await fetch(`${API_URL}/requests/${userRequestId}`, {
		signal,
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});

	if (!response.body || response.status !== 200) {
		throw new Error("Could not load user request from API");
	}

	const json = await response.json();

	return json;
}
