import { useEffect } from "react";

export function useInitializeSessionId() {
	useEffect(() => {
		const currentSessionId = sessionStorage.getItem("sessionId");

		if (currentSessionId) {
			return;
		}

		const newSessionId = crypto.randomUUID();

		sessionStorage.setItem("sessionId", newSessionId);
	}, []);
}
