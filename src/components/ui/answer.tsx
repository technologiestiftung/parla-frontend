import { ResponseDetail } from "@/lib/common";
import React, { ReactNode } from "react";
import SearchResultSection from "../SearchResultSection";
import ReactMarkdown from "react-markdown";
import { getCleanedMetadata } from "@/lib/utils";

type AnswerProps = {
	answer: ResponseDetail | null;
};

function Answer(props: AnswerProps): ReactNode {
	const { answer } = props;
	const content = answer?.gpt?.choices[0].message.content;

	if (answer?.documentMatches.length === 0) {
		return (
			<>
				<h4 className="text-lg font-bold mb-2">
					Keine relevanten Dokumente gefunden
				</h4>
			</>
		);
	}

	return (
		<>
			<div className="mb-4">
				{content && <h4 className="text-lg font-bold mb-2">Antwort</h4>}
				{content && <ReactMarkdown className="prose">{content}</ReactMarkdown>}
				{content && <h5 className="font-bold mt-4">Quellen</h5>}
			</div>
			<div className="w-[calc(100%+2rem)] -ml-4">
				{answer?.documentMatches &&
					answer.documentMatches
						.sort((l, r) => {
							const lm = getCleanedMetadata(l);
							const rm = getCleanedMetadata(r);
							return lm.similarity < rm.similarity ? 1 : -1;
						})
						.map((documentMatch) => {
							return (
								<SearchResultSection
									key={documentMatch.registered_document.id}
									documentMatch={documentMatch}
								></SearchResultSection>
							);
						})}
			</div>
		</>
	);
}

export default Answer;
