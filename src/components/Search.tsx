"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Search.css";
import SearchResult from "./SearchResult";
import { ResponseDetail } from "@/lib/common";

interface Question {
	query: string;
	pdf: string;
}

export default function Search() {
	const [result, setResult] = useState<ResponseDetail[] | null>(null);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Error | null>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const examplesQuestions: Question[] = [
		{
			query:
				"Wie bewertet der Berliner Senat das private Engagement, bei dem Ehrenamtliche Berliner Gewässer von Müll und Schrott befreien?",
			pdf: "S19-10055.pdf",
		},
		{
			query:
				"Wie viel Personen sind 2021 bisher insgesamt aus der Republik Polen in Deutschland eingereist und haben in Berlin einen Asylantrag gestellt? Wie viel davon waren Frauen, wie viel Männer, wie viel Kinder? Welche Staatsangehörigkeit hatten die Personen?",
			pdf: "S19-10090.pdf",
		},
		{
			query:
				"Wie ist der aktuelle Stand der Planungen der Fußgängerüberwege am Jacques-Offenbach-Platz in Mahlsdorf?",
			pdf: "S19-10105.pdf",
		},
		{
			query:
				"Wie begründet sich die deutlich ungleiche Besoldung von Ärtzt:innen am Landesinstitut für gerichtliche und soziale Medizin Berlin sowie am Institut für Rechtsmedizin der Charité?",
			pdf: "S19-10011.pdf",
		},
	];

	// clear the search result on load
	useEffect(() => {
		setResult(null);
		setQuery("");
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	}, []);

	async function vectorSearch(query: string): Promise<void> {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_KI_ANFRAGEN_API_URL}/vector-search`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query,
				}),
			},
		);
		if (!response.ok) {
			setLoading(false);
			setErrors(new Error("failed to fetch dat avia /api/vector-search"));
			return;
		}
		const json = (await response.json()) as ResponseDetail[];
		setResult(json);
		console.log(json);
		setLoading(false);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrors(null);
		setLoading(true);
		if (query.length === 0) {
			setLoading(false);
			setErrors(new Error("no query provided"));
			return;
		}
		vectorSearch(query).catch((error) => {
			setLoading(false);
			setErrors(error);
			console.error(error);
		});

		return false;
	}

	return (
		<>
			<div className="row text-left">
				<div className="col text-left">
					<h1 className="text-4xl py-5">ParDok AI Suche</h1>
				</div>
			</div>
			<div className="row">
				<div className="col w-full">
					<form onSubmit={handleSubmit} className="flex w-full flex-col">
						<label htmlFor="query" className="py-4">
							Frage:
						</label>
						<textarea
							id="query"
							name="query"
							className="border border-gray-400 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							ref={inputRef}
							placeholder="Frage hier eingeben"
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4"
							type="submit"
						>
							Senden
						</button>
					</form>
				</div>
			</div>
			{loading && (
				<>
					<div className="row">
						<div className="col">{"Loading..."}</div>
					</div>
				</>
			)}
			{errors && (
				<>
					<div className="row">
						<div className="col">
							<h2 className="text-2xl py-2 text-left">{errors.name}</h2>
							<p>{errors.message}</p>
						</div>
					</div>
				</>
			)}
			{result &&
				result.length > 0 &&
				result.map((res) => <SearchResult result={res} key={res.gpt?.id} />)}

			<div className="row">
				<div className="col">
					<h2 className="text-2xl py-5">Beispiel Fragen</h2>
				</div>
			</div>
			{examplesQuestions.map((example) => (
				<div className="row" key={example.pdf}>
					<div className="col w-full">
						<button
							onClick={() => {
								setQuery(example.query);
								if (inputRef.current) inputRef.current.value = example.query;
							}}
							className="bg-gray-500 hover:bg-gray-700 text-white py-5 px-4  text-left w-full"
						>
							<span className="font-bold">{example.pdf}</span>: {example.query}
						</button>
					</div>
				</div>
			))}
		</>
	);
}
