import { ResponseDetail, Body } from "./common";

interface VectorSearchProps extends Body {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setErrors: React.Dispatch<React.SetStateAction<Record<string, any> | null>>;
	setResult: React.Dispatch<React.SetStateAction<ResponseDetail | null>>;
	setResultHistory: (value: ResponseDetail[]) => void;
	resultHistory: ResponseDetail[];
}
export async function vectorSearch({
	query,
	openai_model,
	temperature,
	match_threshold,
	num_probes,
	match_count,
	setLoading,
	setErrors,
	setResult,
	setResultHistory,
	resultHistory,
}: VectorSearchProps): Promise<void> {
	if (!query) {
		throw new Error("no query provided");
	}

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_KI_ANFRAGEN_API_URL}/vector-search`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
				openai_model,
				temperature,
				match_threshold,
				num_probes,
				match_count,
			}),
		},
	);
	if (!response.ok) {
		setLoading(false);
		const error = await response.json();
		console.error(error);
		setErrors(error);
		return;
	}
	const json = (await response.json()) as ResponseDetail;
	setResult(json);
	setResultHistory([json, ...resultHistory]);
	setLoading(false);
}
