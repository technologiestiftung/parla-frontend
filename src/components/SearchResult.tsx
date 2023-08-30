import type { ResponseDetail } from "@/lib/common";
import ReactMarkdown from "react-markdown";
import { Column } from "./Column";
import { Link } from "./Link";
import { Row } from "./Row";
import { H2 } from "./h2";
import { TD, TR, Table } from "./table";

interface SearchResultProps {
	result: ResponseDetail;
}
export default function SearchResult({ result }: SearchResultProps) {
	return (
		<>
			<Row>
				<Column>
					<H2 message="Ergebnisse" />
					{
						<ReactMarkdown>
							{`${result.gpt?.choices[0].message.content}`
								.split("Zusammenfassung: ")
								.join("\n\n**Zusammenfassung:** ")}
						</ReactMarkdown>
					}
				</Column>
			</Row>
			<Row>
				<Column>
					<H2 message="Referenzierte Daten" />
					<div className="text-left w-full">
						{[...result.sections]
							.sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0))
							.map((section) => {
								const { content, similarity } = section;
								return (
									<div key={section.id} className="py-4 pb-8 overflow-x-auto">
										<Table>
											{section.pdfs &&
												section.pdfs.map((pdf) => (
													<>
														<tbody key={pdf.id}>
															<TR
																withBg
																additionalClassNames="border-t border-t-blue-500 border-2"
															>
																<TD additionalClassNames="font-bold">Titel:</TD>
																<TD>{pdf.titel}</TD>
															</TR>
															<TR>
																<TD additionalClassNames="font-bold">Seite:</TD>
																<TD>{section.page}</TD>
															</TR>
															<TR withBg>
																<TD additionalClassNames="font-bold">PDF:</TD>
																<TD>
																	{pdf.lokurl && (
																		<Link
																			url={pdf.lokurl}
																			text={pdf.lokurl
																				?.split("/")
																				.findLast((str) =>
																					str.endsWith(".pdf"),
																				)}
																		/>
																	)}
																</TD>
															</TR>
															<TR>
																<TD additionalClassNames="font-bold">
																	Beschreibung:
																</TD>
																<TD>{pdf.desk}</TD>
															</TR>
														</tbody>
													</>
												))}
											<tbody>
												<TR withBg>
													<TD additionalClassNames="font-bold">Ähnlichkeit:</TD>
													<TD>{similarity}</TD>
												</TR>
												<TR>
													<TD additionalClassNames="font-bold">Kontext:</TD>
													<TD>{content && <>{content}</>}</TD>
												</TR>
												<TR withBg>
													<TD additionalClassNames="font-bold">
														Token Anzahl:
													</TD>
													<TD>{section.token_count}</TD>
												</TR>
											</tbody>
										</Table>
									</div>
								);
							})}
					</div>
				</Column>
			</Row>

			<Row>
				<Column>
					<H2 message="Request Statistik" />
					<div className="text-left w-full">
						<div className="py-4 pb-8 overflow-x-auto">
							<Table>
								<tbody>
									<TR
										withBg
										additionalClassNames="border-t border-t-blue-500 border-2"
									>
										<TD additionalClassNames="font-bold">GPT Model:</TD>
										<TD>{result.gpt?.model}</TD>
									</TR>
									<TR>
										<TD additionalClassNames="font-bold">Tokens Gesamt:</TD>
										<TD>{result.gpt?.usage.total_tokens}</TD>
									</TR>
									<TR withBg>
										<TD additionalClassNames="font-bold">Prompt Tokens:</TD>
										<TD>{result.gpt?.usage.prompt_tokens}</TD>
									</TR>
									<TR>
										<TD additionalClassNames="font-bold">Completion Tokens:</TD>
										<TD>{result.gpt?.usage.completion_tokens}</TD>
									</TR>
									<TR withBg>
										<TD additionalClassNames="font-bold">Temperatur:</TD>
										<TD>{result.requestBody?.temperature}</TD>
									</TR>
									<TR>
										<TD additionalClassNames="font-bold">Match Threshold:</TD>
										<TD>{result.requestBody?.match_threshold}</TD>
									</TR>
									<TR withBg>
										<TD additionalClassNames="font-bold">Num Probes:</TD>
										<TD>{result.requestBody?.num_probes}</TD>
									</TR>
									<TR>
										<TD additionalClassNames="font-bold">Match Count:</TD>
										<TD>{result.requestBody?.match_count}</TD>
									</TR>
									<TR withBg>
										<TD additionalClassNames="font-bold">
											Min Content Length:
										</TD>
										<TD>{result.requestBody?.min_content_length}</TD>
									</TR>
								</tbody>
							</Table>
						</div>
					</div>
				</Column>
			</Row>
		</>
	);
}
