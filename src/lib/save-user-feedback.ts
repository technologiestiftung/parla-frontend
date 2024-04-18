const API_URL =
	process.env.NEXT_PUBLIC_PARLA_API_URL || "http://localhost:8080";

type PostFeedbackProps = {
	feedbackId: number;
	userRequestId: string;
	signal?: AbortSignal;
	sessionId: string;
};

export async function saveUserFeedback({
	userRequestId,
	feedbackId,
	signal,
	sessionId,
}: PostFeedbackProps): Promise<any> {
	const response = await fetch(`${API_URL}/feedbacks`, {
		signal,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			feedback_id: feedbackId,
			user_request_id: userRequestId,
			session_id: sessionId,
		}),
	});

	if (!response.ok) {
		throw new Error("Could not post feedback");
	}
}
