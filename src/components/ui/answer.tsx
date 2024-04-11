import { DocumentSearchResponse } from "@/lib/common";
import { getDocumentsCount } from "@/lib/get-documents-count";
import { texts } from "@/lib/texts";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import AnswerLoadingSkeleton from "./textLoadingSkeleton";
import { AnswerFeedback } from "@/components/ui/answer-feedback";

type AnswerProps = {
	generatedAnswer: string | null;
	searchResult: DocumentSearchResponse | null;
	searchIsLoading: boolean;
	answerIsLoading: boolean;
};

const formatter = new Intl.NumberFormat("de-DE");

function Answer(props: AnswerProps): JSX.Element {
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
				<h4 className="mb-2 leading-6 bg-white p-4 rounded-lg shadow-md">
					{texts.noResultsTitle}
				</h4>
			</>
		);
	}

	return (
		<>
			<div>
				<h5 className="text-lg mb-2 ml-4">
					{answerIsLoading && texts.answerIsLoading}
					{!answerIsLoading && generatedAnswer && texts.answerTitle}
				</h5>
				{answerIsLoading && !generatedAnswer && (
					<div
						data-testid="answer-loading-skeleton"
						className="rounded-lg shadow-md p-4 bg-white"
					>
						<AnswerLoadingSkeleton />
					</div>
				)}
				{generatedAnswer && (
					<>
						<div data-testid="generated-answer">
							<ReactMarkdown className="markdown-container leading-6 bg-white p-4 rounded-lg shadow-md space-y-4">
								{generatedAnswer}
							</ReactMarkdown>
						</div>

						<AnswerFeedback generatedAnswer={generatedAnswer}  />

						<div
							tabIndex={0}
							className={cn(
								`leading-6 pt-4 pl-4 pr-4 pb-0 rounded-lg text-sm w-full`,
							)}
							data-testid="generated-answer-disclaimer"
						>
							<ReactMarkdown
								className={cn(
									`markdown-container`,
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
