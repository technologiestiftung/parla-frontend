"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Body } from "@/lib/common";

export function createLabels(formDefaultValues: Body) {
	return {
		query: {
			text: "Frage",
			title:
				"Hier können Sie die Frage eingeben, die Sie beantwortet haben möchten. Die Frage sollte so kurz wie möglich sein, aber alle relevanten Informationen enthalten.",
		},
		temperature: {
			text: "Temperatur",
			title: `Werte zwischen 0-2 Standarteinstellung: ${formDefaultValues.temperature}. Niedrigere Temperatureinstellungen führen zu konsistenteren Ergebnissen, während höhere Werte zu vielfältigeren und kreativeren Ergebnissen führen. Wählen Sie einen Temperaturwert aus, basierend auf dem gewünschten Kompromiss zwischen Konsistenz und Kreativität für Ihre spezifische Anwendung.`,
		},
		match_threshold: {
			text: "Ähnlichkeits-Schwellenwert",
			title: `Werte zwischen 0-1. Standarteinstellung: ${formDefaultValues.match_threshold} Der Schwellenwert legt fest, wie groß die Ähnlichkeitswerte sein müssen, damit die Frage und die gespeicherten Abschnitte der Anfragen als ähnlich betrachtet werden. Wenn die Ähnlichkeitswert über dem Schwellenwert liegt, werden sie als ähnlich betrachtet.`,
		},
		num_probes: {
			text: "Suchindex Proben",
			title: `Werte zwischen 1-49. Standarteinstellung: ${formDefaultValues.num_probes} Um die Suche in den Abschnitten der Anfragen zu verbessern, haben wir diese indexiert. Ein IVFFlat-Index teilt Vektoren in Listen auf und sucht dann eine Teilmenge dieser Listen, die dem Abfragevektor am nächsten liegen. 1 Bedeutet das er nur eine Liste durchsucht, 49 bedeutet das er alle durchscht. Je geringer der Wert, desto schneller die Suche, aber umso schlechter das Ergebnis.`,
		},
		match_count: {
			text: "Treffer Anzahl",
			title: `Werte zwischen 1-10. Standarteinstellung: ${formDefaultValues.match_count} Die Anzahl an Abschnitten, die als Kontext für die Frage verwendet werden sollen. Mehr Abschnitte erhöhen die Kosten für eine Abfrage, liefern aber mehr Information.`,
		},
		min_content_length: {
			text: "Minimum Trefferlänge",
			title: `Werte zwischen 1-10.000. Standarteinstellung: ${formDefaultValues.min_content_length} Dieser Wert gibt die Länge der Abschnitte an, die als Kontext für die Frage verwendet werden sollen.`,
		},
		openai_model: {
			text: "OpenAI Modell",
			title: `Es stehen drei Modelle zur Verfügung. Standarteinstellung: ${formDefaultValues.openai_model} Dieser Wert gibt das LLM-Modell an, welches verwendet wird. Achtung! Das Modell bestimmt auch, wieviel Kontext mitgegeben werden kann. GPT 3.5-turbo hat einen Kontext von 4 Tokens. Das ist meist zu klein für unseren Bedarf. die 16k Version hat einen Kontext von 16000 Tokens. Damit können wir bis zu zehn Abschnitte und die Frage verarbeiten. GPT-4 ist das beste aber auch teuerste Modell und hat einen Kontext von 8000 Tokens.`,
		},
	};
}

export function Label({ title, text }: { text: string; title: string }) {
	return (
		<label className="py-2 pt-4" htmlFor="num_probes">
			{text}
			<FontAwesomeIcon
				size="xs"
				icon={faExclamationCircle}
				className="text-blue-700 ml-2"
				title={title}
			/>
		</label>
	);
}
