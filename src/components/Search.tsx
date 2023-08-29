"use client";
import type { FormValues, Model, ResponseDetail } from "@/lib/common";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { examplesQuestions } from "../lib/examples-questions";
import { Column } from "./Column";
import { InputNumber } from "./InputNumber";
import { Label } from "./Label";
import { Row } from "./Row";
import "./Search.css";
import SearchResult from "./SearchResult";
export const MODELS: Record<string, Model> = {
	GPT_4: "gpt-4",
	GPT_3_5_TURBO: "gpt-3.5-turbo",
	GPT_3_5_TURBO_16K: "gpt-3.5-turbo-16k",
};

const formValuesDefault: FormValues = {
	query: "",
	openai_model: MODELS.GPT_3_5_TURBO_16K,
	temperature: 0.5,
	match_threshold: 0.85,
	num_probes: 7,
	match_count: 5,
	min_content_length: 50,
};

export default function Search() {
	const [result, setResult] = useState<ResponseDetail[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, any> | null>(null);
	const [formValues, setFormValues] = useState<FormValues>(formValuesDefault);

	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	async function vectorSearch({
		query,
		openai_model,
		temperature,
		match_threshold,
		num_probes,
		match_count,
	}: FormValues): Promise<void> {
		if (!query) {
			throw new Error("no query provided");
		}
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_KI_ANFRAGEN_API_URL}/vector-search`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query,
					openai_model,
					temperature,
					match_threshold,
					num_probes,
					match_count,
				}),
			},
		);
		if (!response.ok) {
			setLoading(false);
			const error = await response.json();
			setErrors(error);
			return;
		}
		const json = (await response.json()) as ResponseDetail[];
		setResult(json);
		console.info(json);
		setLoading(false);
	}

	const handleInputChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = event.target;

		setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrors(null);
		setLoading(true);
		if (formValues.query && formValues.query.length === 0) {
			setLoading(false);
			setErrors({ message: "no query provided" });
			return;
		}
		if (formValues.query) {
			vectorSearch(formValues).catch((error) => {
				setLoading(false);
				setErrors(error);
				console.error(error);
			});
			return false;
		}
	}

	return (
		<>
			<Row>
				<Column additionalClassNames="w-full">
					<form
						onSubmit={handleSubmit}
						className="flex w-full flex-col justify-between"
					>
						<Label
							text={"Frage"}
							title={
								"Hier sollte die Frage eingegeben werden die an >ki.anfragen gesendet werden soll. Halten sie die Frage kurz"
							}
						></Label>
						<textarea
							id="query"
							name="query"
							className="border border-gray-400 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Frage hier eingeben"
							onChange={handleInputChange}
							value={formValues.query}
						/>
						<Label
							text={"Temperatur"}
							title={`Werte zwischen 0-2 Standarteinstellung: ${formValuesDefault.temperature}. Niedrigere Temperatureinstellungen führen zu konsistenteren Ergebnissen, während höhere Werte zu vielfältigeren und kreativeren Ergebnissen führen. Wählen Sie einen Temperaturwert aus, basierend auf dem gewünschten Kompromiss zwischen Konsistenz und Kreativität für Ihre spezifische Anwendung.`}
						></Label>
						{
							<InputNumber
								id="temperature"
								name="temperature"
								min="0"
								max="2"
								step="0.01"
								value={
									formValues.temperature
										? formValues.temperature
										: formValuesDefault.temperature!
								}
								handleInputChange={handleInputChange}
							/>
						}
						<Label
							text={"Ähnlichkeits Schwellenwert"}
							title={`Werte zwischen 0-1. Standarteinstellung: ${formValuesDefault.match_threshold} Der Schwellenwert legt fest, wie groß die Ähnlichkeitswerte sein müssen, damit die Frage und die gespeicherten Abschnitte der Anfragen als ähnlich betrachtet werden. Wenn die Ähnlichkeitswert über dem Schwellenwert liegt, werden sie als ähnlich betrachtet. Diese werden dan an >ki.anfragen gesendet um eine Antwort zu erhalten.`}
						></Label>

						<InputNumber
							name="match_threshold"
							id="match_threshold"
							min="0"
							max="1"
							step="0.01"
							value={
								formValues.match_threshold
									? formValues.match_threshold
									: formValuesDefault.match_threshold!
							}
							handleInputChange={handleInputChange}
						/>
						{
							<Label
								text={"Suchindex Proben"}
								title={`Werte zwischen 1-49. Standarteinstellung: ${formValuesDefault.num_probes} Um die Suche in den Abschnitten der Anfragen zu verbessern, haben wir diese indexiert. Ein IVFFlat-Index teilt Vektoren in Listen auf und sucht dann eine Teilmenge dieser Listen, die dem Abfragevektor am nächsten liegen. 1 Bedeutet das er nur eine Liste durchsucht 49 bedeutet das er alle durchscht. Je geringer der Wert desto schneller die Suche, desto schlechter das Ergebnis.`}
							></Label>
						}
						<InputNumber
							name="num_probes"
							id="num_probes"
							min="1"
							max="49"
							step="1"
							value={
								formValues.num_probes
									? formValues.num_probes
									: formValuesDefault.num_probes!
							}
							handleInputChange={handleInputChange}
						/>

						<Label
							text={"Treffer Anzahl"}
							title={`Werte zwischen 1-10. Standarteinstellung: ${formValuesDefault.match_count} Die Menge an Abschnitten die als Kontext für die Frage verwendet werden sollen. Je mehr Abschnitte desto mehr Kosten entstehen, aber desto mehr Information. erhält.`}
						></Label>
						<InputNumber
							id="match_count"
							name="match_count"
							min="1"
							max="10"
							step="1"
							value={
								formValues.match_count
									? formValues.match_count
									: formValuesDefault.match_count!
							}
							handleInputChange={handleInputChange}
						/>
						<Label
							text={"Minimum Treffer Länge"}
							title={`Werte zwischen 1-10000. Standarteinstellung: ${formValuesDefault.min_content_length} Dieser Wert gibt die länge an Abschnitten an, die als Kontext für die Frage verwendet werden sollen.`}
						></Label>

						<InputNumber
							id="min_content_length"
							name="min_content_length"
							min="10"
							max="10000"
							// step="10"
							value={
								formValues.min_content_length
									? formValues.min_content_length
									: formValuesDefault.min_content_length!
							}
							handleInputChange={handleInputChange}
						/>

						<Label
							text={"OpenAI Model"}
							title={`3 Modelle. Standarteinstellung: ${formValuesDefault.openai_model} Dieser Wert gibt den Modell an, der verwendet wird. Achtung! Das Modell bestimmt auch wieviel Kontext mit gegeben werden kann. GPT 3.5-turbo hat einen Kontext von 4 Tokens. Das ist meist zu klein für unseren Bedarf. die 16k Version hat einen Kontext von 16000 Tokens. Damit können wir bis zu 10 Abschnitte und die Frage verarbeiten. GPT-4 ist das beste aber auch teuerste Model und hat einen Kontext von 8000 Tokens.`}
						></Label>

						<select
							className="border border-gray-400 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							name="openai_model"
							id="openai_model"
							value={formValues?.openai_model || MODELS.GPT_3_5_TURBO_16K}
							onChange={handleInputChange}
						>
							{Object.values(MODELS).map((model) => (
								<option key={model} value={model}>
									{model}
								</option>
							))}
						</select>
						{formValues.openai_model === MODELS.GPT_4 && (
							<div className="py-4">
								<p className="text-red-500 font-bold">
									Achtung!: Dies macht die Fragen langsamer und teurer!
								</p>
							</div>
						)}
						<div
							// separate the button from the select
							className="py-4"
						></div>
						<button
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4"
							type="submit"
						>
							{loading ? (
								<FontAwesomeIcon icon={faSpinner} className="fa-spin" />
							) : (
								"Senden"
							)}
						</button>
					</form>
				</Column>
			</Row>

			{errors && (
				<>
					<Row>
						<Column>
							{<H2 message={errors.message as string} />}
							<pre>
								<code>{JSON.stringify(errors, null, 2)}</code>
							</pre>
						</Column>
					</Row>
				</>
			)}
			{result &&
				result.length > 0 &&
				result.map((res) => <SearchResult result={res} key={res.gpt?.id} />)}

			<Row>
				<Column>
					<H2 message="Beispiel Fragen"></H2>
				</Column>
			</Row>
			{examplesQuestions.map((example) => (
				<Row key={example.pdf}>
					<Column additionalClassNames="w-full py-4">
						<button
							onClick={() => {
								setFormValues({ ...formValues, query: example.query });
							}}
							className="bg-gray-500 hover:bg-gray-700 text-white py-5 px-4  text-left w-full"
						>
							<span className="font-bold">{example.pdf}</span>: {example.query}
						</button>
					</Column>
				</Row>
			))}
		</>
	);
}
function H2({ message }: { message: string }) {
	return <h2 className="text-2xl py-2 pt-8 text-left">{message}</h2>;
}
