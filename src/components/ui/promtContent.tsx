import { ResponseDetail } from "@/lib/common";
import React from "react";
import Answer from "./answer";
import ExamplePrompts from "./examplePrompts";

type PromptContentProps = {
	title?: string | null;
	results: ResponseDetail[];
	onsubmit: (text: string) => void;
};

function PromptContent(props: PromptContentProps) {
	const { title, results, onsubmit } = props;
	return (
		<div className="space-y-2">
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
				{results.map((res) => (
					<Answer key={res.gpt?.id} answer={res} />
				))}
			</div>
			{results.length === 0 && (
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
