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
		<div className="">
			<div className="max-w-3xl mx-auto">
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
