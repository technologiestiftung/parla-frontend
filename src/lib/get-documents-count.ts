const API_URL =
	process.env.NEXT_PUBLIC_KI_ANFRAGEN_API_URL || "http://localhost:8080";

export const getDocumentsCount = async (): Promise<number> => {
	const response = await fetch(`${API_URL}/processed_documents/count`);
	if (!response.ok) {
		const error = await response.json();
		console.error(error);
		throw new Error(error);
	}
	const json = (await response.json()) as { processed_documents_count: number };
	return json.processed_documents_count;
};
