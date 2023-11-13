import { ResponseDetail } from "@/lib/common";
import React from "react";
import Answer from "./answer";
import ExamplePrompts from "./examplePrompts";
import LoadingSkeletion from "./loadingSkeleton";

type PromptContentProps = {
	title?: string | null;
	results: ResponseDetail[];
	onsubmit: (text: string) => void;
	isLoading?: boolean;
};

function PromptContent(props: PromptContentProps) {
	const { title, results, onsubmit, isLoading } = props;
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
				{!isLoading &&
					results.map((res) => <Answer key={res.gpt?.id} answer={res} />)}
				{isLoading && (
					<>
						<h3 className="text-lg font-bold">Antwort lädt...</h3>
						<LoadingSkeletion />
					</>
				)}
			</div>
			{results.length === 0 && !isLoading && (
				<ExamplePrompts
					examplePrompts={[
						"Wie bewertet der Berliner Senat das private Engagement, bei dem Ehrenamtliche Berliner Gewässer von Müll und Schrott befreien?",
						"Wie ist der aktuelle Stand der Planungen der Fußgängerüberwege am Jacques-Offenbach-Platz in Mahlsdorf?",
						"Wie begründet sich die deutlich ungleiche Besoldung von Ärtz:innen am Landesinstitut für gerichtliche und soziale Medizin Berlin sowie am Institut für Rechtsmedizin der Charité?",
					]}
					onClick={(text) => onsubmit(text)}
				/>
			)}
		</div>
	);
}

export default PromptContent;
