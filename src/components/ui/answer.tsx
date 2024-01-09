import { DocumentSearchResponse } from "@/lib/common";
import React, { ReactNode, useEffect, useState } from "react";
import SearchResultSection from "../SearchResultSection";
import AnswerLoadingSkeleton from "./textLoadingSkeleton";
import DocumentLoadingSkeleton from "./documentLoadingSkeleton";
import ReactMarkdown from "react-markdown";
import { cn, getCleanedMetadata } from "@/lib/utils";
import { getDocumentsCount } from "@/lib/get-documents-count";
import { texts } from "@/lib/texts";

type AnswerProps = {
	generatedAnswer: string | null;
	searchResult: DocumentSearchResponse | null;
	searchIsLoading: boolean;
	answerIsLoading: boolean;
};

const formatter = new Intl.NumberFormat("de-DE");

function Answer(props: AnswerProps): ReactNode {
	const [documentsCount, setDocumentsCount] = useState("");
	const { generatedAnswer, searchResult, searchIsLoading, answerIsLoading } =
		props;
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
				<h5 className="text-lg mb-2 ml-4">
					{answerIsLoading && texts.answerIsLoading}
					{!answerIsLoading && generatedAnswer && texts.answerTitle}
				</h5>
				{answerIsLoading && !generatedAnswer && <AnswerLoadingSkeleton />}
				{generatedAnswer && (
					<>
						<ReactMarkdown className="prose leading-6 bg-white p-4 rounded-lg shadow-md">
							{generatedAnswer}
						</ReactMarkdown>
						<div
							tabIndex={0}
							className={cn(`leading-6 p-4 rounded-lg text-sm w-full`)}
						>
							<ReactMarkdown
								className={cn(
									`text-slate-500 transition-colors group-hover:text-slate-900`,
									`group-focus-visible:text-slate-900 prose-strong:text-inherit`,
									`group-focus-visible:ring-2 group-focus-visible:rounded-sm`,
									`group-focus-visible:ring-blue-500 group-focus-visible:ring-offset-8`,
								)}
							>
								{`**${texts.disclaimerLabel}:**
${texts.answerDisclaimer}
`}
							</ReactMarkdown>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default Answer;
