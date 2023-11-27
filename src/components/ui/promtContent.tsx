import { DocumentSearchResponse, GenerateAnswerResponse } from "@/lib/common";
import React from "react";
import Answer from "./answer";
import ExamplePrompts from "./examplePrompts";

type PromptContentProps = {
	title?: string | null;
	searchResult: DocumentSearchResponse | null;
	generatedAnswer: GenerateAnswerResponse | null;
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
	return (
		<div className="space-y-2 pt-8 lg:pt-0">
			{!title && (
				<div className="max-w-xl mx-auto">
					<h3 className="text-xl font-bold py-3">
						Schreiben Sie Ihre Frage in das Suchfeld oder klicken Sie auf auf
						eines der Beispiele, um den KI-Assistenten zu starten.
					</h3>
				</div>
			)}
			<div className="max-w-xl mx-auto">
				{title && (
					<>
						<h3 className="text-xl font-bold mb-2">Ihre Frage</h3>
						<p className="text-lg font-light">{title}</p>
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
					examplePrompts={[
						"Wie bewertet der Berliner Senat das private Engagement, bei dem Ehrenamtliche Berliner Gewässer von Müll und Schrott befreien?",
						"Wie ist der aktuelle Stand der Planungen der Fußgängerüberwege am Jacques-Offenbach-Platz in Mahlsdorf?",
						"Wie begründet sich die deutlich ungleiche Besoldung von Ärzt:innen am Landesinstitut für gerichtliche und soziale Medizin Berlin sowie am Institut für Rechtsmedizin der Charité?",
					]}
					onClick={(text) => onsubmit(text)}
				/>
			)}
		</div>
	);
}

export default PromptContent;
