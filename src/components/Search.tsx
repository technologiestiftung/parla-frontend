"use client";
import type { Body, Model, ResponseDetail } from "@/lib/common";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { examplesQuestions } from "../lib/examples-questions";
import { Column } from "./Column";
import { InputNumber } from "./InputNumber";
import { Label, createLabels } from "./Label";
import { Row } from "./Row";
import "./Search.css";
import SearchResult from "./SearchResult";
import { H2 } from "./h2";
import { vectorSearch } from "@/lib/vector-search";
export const MODELS: Record<string, Model> = {
	GPT_4: "gpt-4",
	GPT_3_5_TURBO: "gpt-3.5-turbo",
	GPT_3_5_TURBO_16K: "gpt-3.5-turbo-16k",
};

export const formValuesDefault: Body = {
	query: "",
	openai_model: MODELS.GPT_3_5_TURBO_16K,
	temperature: 0.5,
	match_threshold: 0.85,
	num_probes: 7,
	match_count: 5,
	min_content_length: 50,
};
const labels = createLabels(formValuesDefault);

export default function Search() {
	const [result, setResult] = useState<ResponseDetail[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, any> | null>(null);
	const [formValues, setFormValues] = useState<Body>(formValuesDefault);
	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

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
			vectorSearch({ ...formValues, setErrors, setLoading, setResult }).catch(
				(error) => {
					setLoading(false);
					setErrors(error);
					console.error(error);
				},
			);
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
						<ResponsiveFormRow>
							<ResponsiveFormRowItem>
								<Label {...labels.query}></Label>
								<textarea
									rows={5}
									id="query"
									name="query"
									className="border border-gray-400 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Frage hier eingeben"
									onChange={handleInputChange}
									value={formValues.query}
								/>
							</ResponsiveFormRowItem>
						</ResponsiveFormRow>
						<ResponsiveFormRow>
							<ResponsiveFormRowItem>
								<Label {...labels.temperature}></Label>

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
							</ResponsiveFormRowItem>
							<ResponsiveFormRowItem>
								<Label {...labels.match_threshold}></Label>

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
							</ResponsiveFormRowItem>
						</ResponsiveFormRow>
						<ResponsiveFormRow>
							<ResponsiveFormRowItem>
								{<Label {...labels.num_probes}></Label>}
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
							</ResponsiveFormRowItem>
							<ResponsiveFormRowItem>
								<Label {...labels.match_count} text={"Treffer Anzahl"}></Label>
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
							</ResponsiveFormRowItem>
						</ResponsiveFormRow>
						<ResponsiveFormRow>
							<ResponsiveFormRowItem>
								<Label {...labels.min_content_length}></Label>

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
							</ResponsiveFormRowItem>
							<ResponsiveFormRowItem>
								<Label {...labels.openai_model}></Label>

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
							</ResponsiveFormRowItem>
						</ResponsiveFormRow>

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
						<ResponsiveFormRow>
							<ResponsiveFormRowItem>
								<button
									className=" bg-blue-700 hover:bg-blue-900 text-white font-bold py-4 w-full"
									type="submit"
								>
									{loading ? (
										<FontAwesomeIcon icon={faSpinner} className="fa-spin" />
									) : (
										"Senden"
									)}
								</button>
							</ResponsiveFormRowItem>
						</ResponsiveFormRow>
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
					<H2 message="Beispiel-Fragen"></H2>
				</Column>
			</Row>
			{examplesQuestions.map((example) => (
				<Row key={example.pdf}>
					<Column additionalClassNames="w-full">
						<button
							onClick={() => {
								setFormValues({ ...formValues, query: example.query });
							}}
							className="bg-blue-700 hover:bg-blue-900 text-white py-5 px-4  text-left w-full"
						>
							<span className="font-bold">{example.pdf}</span>: {example.query}
						</button>
					</Column>
				</Row>
			))}
		</>
	);
}

interface ResponsiveFormDiv extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

function ResponsiveFormRow({ children, ...rest }: ResponsiveFormDiv) {
	return (
		<div
			{...rest}
			className="lg:flex lg:flex-col xl:flex-row xl:gap-8 lg:justify-between"
		>
			{children}
		</div>
	);
}

function ResponsiveFormRowItem({ children, ...rest }: ResponsiveFormDiv) {
	return (
		<div
			{...rest}
			className="sm:pt-6 lg:pt-2 xl:flex xl:flex-col lg:pt-8: lg:w-full"
		>
			{children}
		</div>
	);
}
