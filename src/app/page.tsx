"use client";
/* eslint-disable @next/next/no-img-element */

import { result as fixture } from "@/fixtures/results";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { SplashScreen } from "@/components/splash-screen";
import { Body, ResponseDetail } from "@/lib/common";
import SearchResult from "@/components/SearchResult";
import { vectorSearch } from "@/lib/vector-search";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Link } from "@/components/Link";
const defaultFormdata: Body = {
	query: "",
};

const DEBUG = false;
export default function Home() {
	const [title, setTitle] = useState("");
	const [formData, setFormData] = useState(defaultFormdata);
	const [isLoading, setIsLoading] = React.useState(false);
	const [showSplah, setShowSplah] = React.useState(true);
	const [result, setResult] = useState<ResponseDetail[] | null>(null);
	const [errors, setErrors] = useState<Record<string, any> | null>(null);

	useEffect(() => {
		if (DEBUG) {
			setTitle(
				"Wie bewertet der Berliner Senat das private Engagement, bei dem Ehrenamtliche Berliner Gewässer von Müll und Schrott befreien?",
			);
		}
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [result]);

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		console.log(formData);
		console.log(formData.query?.length);
		setErrors(null);
		setIsLoading(true);
		if (formData.query?.length === 0) {
			setIsLoading(false);
			setErrors({ query: "Bitte geben Sie eine Anfrage ein." });
			console.log(formData, "in empty query handler");
			return;
		}

		if (formData.query) {
			setTitle(formData.query);
			// If we want to mock loading, we can do it here
			// setTimeout(() => {
			// 	setIsLoading(false);
			// }, 3000);
			vectorSearch({
				...formData,
				setErrors,
				setLoading: setIsLoading,
				setResult,
			}).catch((error) => {
				setIsLoading(false);
				setErrors(error);
				console.error(error);
			});
		}
	}
	async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFormData((prevValues) => ({ ...prevValues, [name]: value }));
	}

	async function exampleClickHandler(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		text: string,
	) {
		event.preventDefault();
		setFormData((prevValues) => ({ ...prevValues, query: text }));
	}
	return (
		<>
			{/* {showSplah && <SplashScreen open={showSplah} setOpen={setShowSplah} />} */}
			<div className="absolute h-screen w-full z-50">
				<div className="lg:grid h-screen w-full lg:grid-cols-[280px_1fr]">
					<aside className="sidebar border-r overflow-auto bg-slate-300">
						<div className="px-4 py-2">
							<Button className="w-full text-white bg-blue-400 hover:bg-blue-700 font-bold py-2 px-4 rounded-none">
								Neue Anfrage
							</Button>
						</div>
					</aside>
					<main className="flex flex-col justify-between bg-slate-200 py-3">
						<div className="flex flex-col gap-4 p-6 flex-1 overflow-auto" />
						<div className="flex flex-col px-6 py-4 space-y-4">
							<div className="flex flex-col space-y-2">
								<div className=" w-1/2 mx-auto px-3">
									{!title && (
										<h3 className="text-sm font-semibold text-zinc-900 py-3">
											{
												"Schreiben Sie Ihre Frage in das Suchfeld oder klicken Sie auf auf eines der Beispiele, um den KI-Assistenten zu starten."
											}
										</h3>
									)}
								</div>
								<div className="w-1/2 mx-auto">
									{title && (
										<>
											<h3 className="text-lg font-bold">Ihre Frage</h3>
											<p>{title}</p>
										</>
									)}
									{result &&
										result.length > 0 &&
										result.map((res) => (
											// <SearchResult result={res} key={res.gpt?.id} />
											// <SearchResult result={res} key={res.gpt?.id} />
											<div key={res.gpt?.id}>
												<h3 className="text-lg font-bold">Antwort</h3>
												<p>{res.gpt?.choices[0].message.content}</p>
												{res.sections &&
													res.sections.map((section) => {
														return (
															<Card
																className="rounded-none mb-3"
																key={section.id}
															>
																<CardHeader>
																	{/* <CardTitle>{"sdlksmd"}</CardTitle> */}
																	{/* <CardDescription>Card Description</CardDescription> */}
																</CardHeader>
																<CardContent>
																	<Table>
																		{section.pdfs &&
																			section.pdfs.length > 0 &&
																			section.pdfs.map((pdf) => {
																				return (
																					<React.Fragment key={pdf.id}>
																						<TableRow>
																							<TableHead>Thema</TableHead>
																							<TableCell>{pdf.titel}</TableCell>
																						</TableRow>
																						<TableRow>
																							<TableHead>
																								Veröffentlichung
																							</TableHead>
																							<TableCell>
																								{pdf.dokdat}
																							</TableCell>
																						</TableRow>
																						<TableRow>
																							<TableHead>Dokument</TableHead>
																							<TableCell>
																								{pdf.lokurl && (
																									<Link href={pdf.lokurl}>
																										{pdf.lokurl
																											?.split("/")
																											.findLast((str) =>
																												str.endsWith(".pdf"),
																											)}
																									</Link>
																								)}
																								{", "}
																								{`Seite ${section.page}`}
																							</TableCell>
																						</TableRow>
																					</React.Fragment>
																				);
																			})}
																		<TableRow className="border-none">
																			<TableHead>Kontext</TableHead>
																			<ExpandableTableCell
																				content={
																					section.content ? section.content : ""
																				}
																			></ExpandableTableCell>
																		</TableRow>
																	</Table>
																</CardContent>
															</Card>
														);
													})}
											</div>
										))}
								</div>
								{!result && (
									<>
										<ExampleButton
											onClick={exampleClickHandler}
											text={
												"Wie bewertet der Berliner Senat das private Engagement, bei dem Ehrenamtliche Berliner Gewässer von Müll und Schrott befreien?"
											}
										/>
										<ExampleButton
											onClick={exampleClickHandler}
											text={
												"Wie ist der aktuelle Stand der Planungen der Fußgängerüberwege am Jacques-Offenbach-Platz in Mahlsdorf?"
											}
										/>
										<ExampleButton
											onClick={exampleClickHandler}
											text={
												"Wie begründet sich die deutlich ungleiche Besoldung von Ärtzt:innen am Landesinstitut für gerichtliche und soziale Medizin Berlin sowie am Institut für Rechtsmedizin der Charité?"
											}
										/>
									</>
								)}
							</div>

							<form
								onSubmit={onSubmit}
								className="relative  lg:w-1/2 lg:mx-auto flex py-3"
							>
								<Input
									value={formData.query}
									name="query"
									id="query"
									className="w-full px-3 rounded-none"
									placeholder="Stellen Sie hier ihre Anfrage"
									type="text"
									onChange={onChange}
								/>
								<Button
									className="w-[130px] ml-2 bg-blue-400 hover:bg-blue-700 text-white font-bold rounded-none"
									type="submit"
								>
									{isLoading ? <Spinner /> : "Anfrage stellen"}
								</Button>
							</form>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

interface ExampleButtonProps {
	text: string;
	onClick: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		text: string,
	) => void;
}

function ExampleButton({ text, onClick }: ExampleButtonProps) {
	return (
		<Button
			onClick={(e) => onClick(e, text)}
			className="inline rounded-none whitespace-normal h-auto  p-2 text-sm text-zinc-600 hover:text-zinc-100  lg:w-1/2 lg:mx-auto text-left bg-slate-300 hover:bg-slate-500"
		>
			{text}
		</Button>
	);
}

function Spinner() {
	return (
		<svg
			aria-hidden="true"
			role="status"
			className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
			viewBox="0 0 100 101"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor"
			/>
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="#1C64F2"
			/>
		</svg>
	);
}

function ExpandableTableCell({ content }: { content: string }) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const handleClick = () => {
		setIsExpanded(!isExpanded);
	};
	const displayedContent = isExpanded
		? content
		: `${content?.slice(0, 100)}${content.length > 100 ? "..." : ""}`;

	return (
		<TableCell>
			{displayedContent}
			<br />
			<a
				className="underline text-blue-700 hover:text-blue-900"
				onClick={handleClick}
			>
				{isExpanded ? "Weniger…" : "Mehr…"}
			</a>
		</TableCell>
	);
}
