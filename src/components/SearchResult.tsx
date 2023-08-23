import { ResponseDetail } from "@/app/api/vector-search/route";
import React from "react";
import ReactMarkdown from "react-markdown";

interface SearchResultProps {
	result: ResponseDetail;
}
export default function SearchResult({ result }: SearchResultProps) {
	return (
		<>
			<div className="row text-left">
				<div className="col">
					<h2 className="text-2xl py-2">Ergebnisse</h2>
					{
						<ReactMarkdown>
							{`${result.gpt?.choices[0].message.content}`
								.split("Zusammenfassung: ")
								.join("\n\n**Zusammenfassung:** ")}
						</ReactMarkdown>
					}
				</div>
			</div>
			<div className="row">
				<div className="col">
					<h2 className="text-2xl py-2 text-left">referenzierte Daten</h2>
					<ul className="list-none text-left w-full">
						{result.sections.map((section) => {
							if (!section.pdfs) return null;
							const { desk, titel, lokurl } = section.pdfs[0];
							const { content } = section;
							const pdfFilename = lokurl
								?.split("/")
								.findLast((str) => str.endsWith(".pdf"));

							return (
								<li key={section.id} className="py-4 pb-8 overflow-x-auto">
									<table className="table-auto min-w-full">
										{section.pdfs.map((pdf) => (
											<tbody key={pdf.id}>
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
											</tbody>
										))}
										<tbody>
											<tr>
												<td>Kontext</td>
												<td>{content}</td>
											</tr>
										</tbody>
									</table>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
}
