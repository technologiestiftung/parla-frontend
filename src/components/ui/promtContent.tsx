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
		<div className="flex flex-col space-y-2">
			{!title && (
				<div className="lg:w-1/2 lg:mx-auto px-3">
					<h3 className="text-sm font-semibold text-zinc-900 py-3">
						{
							"Schreiben Sie Ihre Frage in das Suchfeld oder klicken Sie auf auf eines der Beispiele, um den KI-Assistenten zu starten."
						}
					</h3>
				</div>
			)}
			<div className="lg:w-1/2 lg:mx-auto">
				{title && (
					<>
						<h3 className="text-lg font-bold">Ihre Frage</h3>
						<p>{title}</p>
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
