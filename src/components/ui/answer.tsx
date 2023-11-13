import { ResponseDetail } from "@/lib/common";
import React, { ReactNode } from "react";
import SearchResultSection from "../SearchResultSection";

type AnswerProps = {
	answer: ResponseDetail | null;
};

function Answer(props: AnswerProps): ReactNode {
	const { answer } = props;
	const content = answer?.gpt?.choices[0].message.content;
	return (
		<div>
			{content && <h3 className="text-lg font-bold">Antwort</h3>}
			{content && <p>{content}</p>}
			{answer?.documentMatches &&
				answer.documentMatches
					.sort((l, r) =>
						l.processed_document_summary_match.similarity <
						r.processed_document_summary_match.similarity
							? 1
							: -1,
					)
					.map((documentMatch) => {
						return (
							<SearchResultSection
								key={documentMatch.registered_document.id}
								documentMatch={documentMatch}
							></SearchResultSection>
						);
					})}
		</div>
	);
}

export default Answer;
