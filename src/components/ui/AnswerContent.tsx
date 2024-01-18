import { DocumentSearchResponse } from "@/lib/common";
import React, { useEffect, useState } from "react";
import exampleQuestions from "@/fixtures/example-questions";
import { selectRandomItems } from "@/lib/utils";
import TypeformLink from "./TypeformLink";
import { texts } from "@/lib/texts";
import ExamplePrompts from "./ExamplePrompts";
import Answer from "./Answer";

type PromptContentProps = {
	title?: string | null;
	searchResult: DocumentSearchResponse | null;
	generatedAnswer: string | null;
	onsubmit: (text: string) => void;
	searchIsLoading: boolean;
	answerIsLoading: boolean;
};

function AnswerContent(props: PromptContentProps) {
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
		setExamplesQuestionsToShow(selectRandomItems(exampleQuestions, 5));
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
			{showExamplePrompts && exampleQuestionsToShow.length > 0 && (
				<>
					<ExamplePrompts
						examplePrompts={exampleQuestionsToShow}
						onClick={(text) => onsubmit(text)}
					/>
					<TypeformLink
						question={texts.feedback.question}
						linkText={texts.feedback.long}
					></TypeformLink>
				</>
			)}
		</div>
	);
}

export default AnswerContent;
