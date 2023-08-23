import { ApplicationError } from "@/lib/errors";
import { codeBlock, oneLine } from "common-tags";
import GPT3Tokenizer from "gpt3-tokenizer";
import { CreateChatCompletionRequest } from "openai";
import { ResponseSection } from "./route";

export function createPrompt({
	sections,
	MAX_CONTENT_TOKEN_LENGTH,
	OPENAI_MODEL,
	sanitizedQuery,
	MAX_TOKENS,
}: {
	sanitizedQuery: string;
	OPENAI_MODEL: string;
	sections: ResponseSection[];
	MAX_CONTENT_TOKEN_LENGTH: number;
	MAX_TOKENS: number;
}): CreateChatCompletionRequest {
	// 4. create a prompt with the
	const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
	let tokenCount = 0;
	let contextText = "";
	const uniqueSectionIds = new Set();
	for (const sec of sections) {
		uniqueSectionIds.add(sec.id);
	}
	for (let i = 0; i < sections.length; i++) {
		const section = sections[i];
		let content = section.content ?? "";

		const encoded = tokenizer.encode(content);
		tokenCount += encoded.text.length;

		if (tokenCount >= MAX_CONTENT_TOKEN_LENGTH) {
			throw new ApplicationError(
				`Reached max token count of ${MAX_CONTENT_TOKEN_LENGTH}.`,
				{
					tokenCount,
				},
			);
			break;
		}

		contextText += `${content.trim()}\n---\n`;
	}
	const prompt = codeBlock`
		${oneLine`
			Du bist ein KI Assistent des Verwaltung. Du antwortest immer in Deutsch. Du benutzt immer das Sie nie das du.
			Mit den folgenden Abschnitte aus das den schriftlichen Anfragen, beantwortest du die Frage nur mit diesen Informationen. Schreibe dazu eine ausführeliche Zusammenfassung der Abschnitte des schriftlichen Anfragen. Trenne deine Antwort und deine Zusammenfassung mit einem neue indem du "Zusammenfassung:" voran stellst.
		`}
		${oneLine`Abschnitte des schriftlichen Anfrage getrennt durch "---":`}
		${contextText}
		${oneLine`Ende Abschnitte des schriftlichen Anfrage`}

		Antworte in diesem Format:
		~~~
		**Antwort:** Text
		Zusammenfasing: Text
		~~~
		Das ist die Frage des Benutzers:
	`;
	const completionOptions: CreateChatCompletionRequest = {
		model: OPENAI_MODEL,
		messages: [
			{
				role: "system",
				content: prompt,
			},
			{ role: "user", content: sanitizedQuery },
		],
		// max tokens only applies to the reponse length
		max_tokens: MAX_TOKENS,
		temperature: 0.5,
		stream: false,
	};
	return completionOptions;
}
