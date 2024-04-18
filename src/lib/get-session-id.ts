export function getSessionId() {
	const currentSessionId = sessionStorage.getItem("sessionId");

	if (currentSessionId) {
		return currentSessionId;
	}

	const newSessionId = crypto.randomUUID();

	sessionStorage.setItem("sessionId", newSessionId);

	return newSessionId;
}
