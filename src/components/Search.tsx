"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Search.css";
import { ResponseObject } from "@/app/api/vector-search/route";

interface Question {
	query: string;
	pdf: string;
}

export default function Search() {
	const [result, setResult] = useState<ResponseObject | null>(null);
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
		const response = await fetch(`/api/vector-search`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
			}),
		});
		if (!response.ok) {
			setLoading(false);
			setErrors(new Error("failed to fetch dat avia /api/vector-search"));
			return;
		}
		const json = await response.json();
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
					{/* <h1 className="text-4xl text-left py-5">Search</h1> */}
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

			<div className="row text-left">
				<div className="col">
					<h2 className="text-2xl py-2">Ergebnisse</h2>
					{loading && "Loading..."}

					{result && <p>{result?.details?.gpt?.choices[0].message.content}</p>}
					{errors && <>{errors.message}</>}
				</div>
			</div>
			<div className="row">
				<div className="col">
					<h2 className="text-2xl py-2 text-left">referenzierte Daten</h2>

					<ul className="list-none text-left">
						{result &&
							result.details &&
							result.details.sections.map((section) => {
								if (!section.pdfs) return null;
								const { desk, titel, lokurl } = section.pdfs[0];
								const { content } = section;
								const pdfFilename = lokurl
									?.split("/")
									.findLast((str) => str.endsWith(".pdf"));

								return (
									<li key={section.id} className="p-4 pb-8">
										<table>
											<tbody>
												{section.pdfs.map((pdf) => (
													<>
														<tr>
															<td>Titel:</td>
															<td>{titel}</td>
														</tr>
														<tr>
															<td>PDF:</td>
															<td>
																<a
																	target="_blank"
																	rel="noreferrer"
																	href={pdf.lokurl ? pdf.lokurl : ""}
																	className="underline text-blue-500 hover:text-blue-800 visited:text-blue-950"
																>
																	{pdfFilename}
																</a>
															</td>
														</tr>

														<tr>
															<td>Beschreibung:</td>
															<td>{desk}</td>
														</tr>
													</>
												))}
												<tr>
													<td>Kontext</td>
													<td>{content}</td>
												</tr>
											</tbody>
										</table>
										{/* <a
											target="_blank"
											rel="noreferrer"
											href={`${lokurl}`}
											className="underline text-blue-500 hover:text-blue-800 visited:text-blue-950"
										>
											{pdfFilename}
										</a>
										<span> | </span>
										<span>{desk}</span>
										<span> | </span>
										<span>{titel}</span> */}
									</li>
								);
							})}
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<h2 className="text-2xl py-5">Beispiel Fragen</h2>
				</div>
			</div>
			{examplesQuestions.map((example) => (
				<div className="row " key={example.pdf}>
					<div className="col">
						<button
							onClick={() => {
								setQuery(example.query);
								if (inputRef.current) inputRef.current.value = example.query;
							}}
							className="bg-gray-500 hover:bg-gray-700 text-white py-5 px-4  text-left"
						>
							<span className="font-bold">{example.pdf}</span>: {example.query}
						</button>
					</div>
				</div>
			))}
		</>
	);
}
