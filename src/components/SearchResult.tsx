import { ResponseDetail } from "@/lib/common";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface SearchResultProps {
	result: ResponseDetail;
}
export default function SearchResult({ result }: SearchResultProps) {
	// const [isExpanded, setIsExpanded] = useState(false);

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
						{[...result.sections]
							.sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0))
							.map((section) => {
								const { content, similarity } = section;
								return (
									<li
										key={section.id}
										className="py-4 pb-8 overflow-x-auto table-container"
									>
										<table className="table-auto min-w-full">
											{section.pdfs &&
												section.pdfs.map((pdf) => (
													<tbody key={pdf.id}>
														<tr>
															<td>Titel:</td>
															<td>{pdf.titel}</td>
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
																	{pdf.lokurl
																		?.split("/")
																		.findLast((str) => str.endsWith(".pdf"))}
																</a>
															</td>
														</tr>

														<tr>
															<td>Beschreibung:</td>
															<td>{pdf.desk}</td>
														</tr>
													</tbody>
												))}
											<tbody>
												<tr>
													<td>Similarität:</td>
													<td>{similarity}</td>
												</tr>
												<tr>
													<td>Kontext</td>
													<td
													// onMouseEnter={() => setIsExpanded(true)}
													// onMouseLeave={() => setIsExpanded(false)}
													>
														{/* <div
															className={
																isExpanded ? "h-auto" : "h-10 overflow-hidden"
															}
														> */}
														{content}
														{/* </div> */}
													</td>
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
