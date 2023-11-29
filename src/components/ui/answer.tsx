import { DocumentSearchResponse, GenerateAnswerResponse } from "@/lib/common";
import React, { ReactNode, useEffect, useState } from "react";
import SearchResultSection from "../SearchResultSection";
import AnswerLoadingSkeleton from "./textLoadingSkeleton";
import DocumentLoadingSkeleton from "./documentLoadingSkeleton";
import ReactMarkdown from "react-markdown";
import { cn, getCleanedMetadata } from "@/lib/utils";
import { getDocumentsCount } from "@/lib/get-documents-count";
import { texts } from "@/lib/texts";

type AnswerProps = {
	generatedAnswer: GenerateAnswerResponse | null;
	searchResult: DocumentSearchResponse | null;
	searchIsLoading: boolean;
	answerIsLoading: boolean;
};

const formatter = new Intl.NumberFormat("de-DE");

function Answer(props: AnswerProps): ReactNode {
	const [documentsCount, setDocumentsCount] = useState("");
	const { generatedAnswer, searchResult, searchIsLoading, answerIsLoading } =
		props;
	const content = generatedAnswer?.answer?.choices[0]?.message?.content;
	const matches = searchResult?.documentMatches ?? [];

	useEffect(() => {
		getDocumentsCount().then((count) =>
			setDocumentsCount(`${formatter.format(count) || ""}`),
		);
	}, []);

	if (!searchIsLoading && searchResult && matches.length === 0) {
		return (
			<>
				<h4 className="text-lg font-bold mb-2">{texts.noResultsTitle}</h4>
			</>
		);
	}

	return (
		<>
			<div className="mb-4">
				<h4 className="text-lg font-bold mb-2">
					{answerIsLoading && texts.answerIsLoading}
					{!answerIsLoading && content && texts.answerTitle}
				</h4>
				{answerIsLoading && <AnswerLoadingSkeleton />}
				{!answerIsLoading && content && (
					<>
						<ReactMarkdown className="prose leading-6">{content}</ReactMarkdown>
						<ReactMarkdown
							className={cn(
								`prose leading-6 opacity-60 mt-4 transition-opacity hover:opacity-100`,
								`pt-4 mt-4 border-t border-slate-200 mb-8 text-sm`,
							)}
						>
							{`**${texts.disclaimerLabel}:**
${texts.answerDisclaimer}
`}
						</ReactMarkdown>
					</>
				)}
				<h5 className="font-bold mt-4">
					{searchIsLoading &&
						`${documentsCount} ${texts.documentsAreLoading}.`.trim()}
					{!searchIsLoading && searchResult && texts.documentsTitle}
				</h5>
			</div>
			{searchIsLoading && <DocumentLoadingSkeleton />}
			{!searchIsLoading && matches.length > 0 && (
				<div className="w-[calc(100%+2rem)] -ml-4">
					{matches
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
								/>
							);
						})}
				</div>
			)}
		</>
	);
}

export default Answer;
