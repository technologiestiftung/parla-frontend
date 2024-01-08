import { DocumentSearchResponse } from "@/lib/common";
import React, { useEffect, useState } from "react";
import Answer from "./answer";
import ExamplePrompts from "./examplePrompts";
import exampleQuestions from "@/fixtures/example-questions";
import { selectRandomItems } from "@/lib/utils";

type PromptContentProps = {
	title?: string | null;
	searchResult: DocumentSearchResponse | null;
	generatedAnswer: string | null;
	onsubmit: (text: string) => void;
	searchIsLoading: boolean;
	answerIsLoading: boolean;
};

function PromptContent(props: PromptContentProps) {
	const {
		title,
		searchResult,
		generatedAnswer,
		onsubmit,
		searchIsLoading,
		answerIsLoading,
	} = props;

	const showExamplePrompts =
		!searchResult && !searchIsLoading && !generatedAnswer && !answerIsLoading;

	// Prevent hydration error when randomly selecting 3 example questions
	// See: https://nextjs.org/docs/messages/react-hydration-error
	const [exampleQuestionsToShow, setExamplesQuestionsToShow] = useState<
		string[]
	>([]);

	useEffect(() => {
		setExamplesQuestionsToShow(selectRandomItems(exampleQuestions, 3));
	}, []);

	return (
		<div className="space-y-2 pt-8 lg:pt-0">
			{!title && (
				<div className="max-w-xl mx-auto">
					<h3 className="leading-snug text-xl font-bold py-3">
						Schreiben Sie Ihre Frage in das Suchfeld oder klicken Sie auf auf
						eines der Beispiele, um den KI-Assistenten zu starten.
					</h3>
				</div>
			)}
			<div className="max-w-xl mx-auto">
				{title && (
					<>
						<h3 className="text-xl font-bold mb-2">Ihre Frage</h3>
						<p className="leading-7 text-lg font-light whitespace-pre-wrap mb-6">
							{title}
						</p>
					</>
				)}
				<Answer
					generatedAnswer={generatedAnswer}
					answerIsLoading={answerIsLoading}
					searchResult={searchResult}
					searchIsLoading={searchIsLoading}
				/>
			</div>
			{showExamplePrompts && (
				<ExamplePrompts
					examplePrompts={exampleQuestionsToShow}
					onClick={(text) => onsubmit(text)}
				/>
			)}
		</div>
	);
}

export default PromptContent;
