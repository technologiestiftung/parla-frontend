"use client";
/* eslint-disable @next/next/no-img-element */
import { isMobile } from "react-device-detect";

import SearchResultSection from "@/components/SearchResultSection";
import { SplashScreen } from "@/components/splash-screen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Body, ResponseDetail } from "@/lib/common";
import { useLocalStorage } from "@/lib/hooks/localStorage";
import { vectorSearch } from "@/lib/vector-search";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDownIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import MobileSidebar from "@/components/MobileSidebar";
const defaultFormdata: Body = {
	query: "",
};

export default function Home() {
	const [title, setTitle] = useState<string | null>(null);
	const [formData, setFormData] = useState(defaultFormdata);
	const [isLoading, setIsLoading] = React.useState(false);
	const [showSplash, setShowSplash] = React.useState(false);
	const [result, setResult] = useState<ResponseDetail[] | null>(null);
	const [_errors, setErrors] = useState<Record<string, any> | null>(null);
	const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

	const { resultHistory, setResultHistory } = useLocalStorage(
		"ki-anfragen-history",
		[],
	);

	useEffect(() => {
		setSidebarIsOpen(!isMobile);
		setShowSplash(true);
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [result]);

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setErrors(null);
		setIsLoading(true);
		setResult(null);

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
				setResultHistory,
				resultHistory,
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

	function exampleClickHandler(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		text: string,
	) {
		event.preventDefault();
		setFormData((prevValues) => ({ ...prevValues, query: text }));
	}

	function newRequestHandler(event: React.MouseEvent<HTMLButtonElement>): void {
		event.preventDefault();
		setTitle(null);
		setResult(null);
		setErrors(null);
		setFormData(defaultFormdata);
	}

	function restoreResultHistoryItem(id: string): void {
		// filter an arroy ResponseDetail items by their gpt.id
		const filtered = resultHistory.filter((item) => item.gpt?.id === id);
		if (filtered.length > 0) {
			setResult([filtered[0]]);
			setTitle(filtered[0].requestBody?.query!);
		}
	}

	return (
		<>
			<SplashScreen open={showSplash} setOpen={setShowSplash} />
			<div className="absolute min-h-screen w-full z-50">
				<div className="flex flex-col min-h-screen lg:grid w-full lg:grid-cols-[280px_1fr]">
					<MobileSidebar
						resultHistory={resultHistory}
						restoreResultHistoryItem={restoreResultHistoryItem}
						isHistoryOpen={sidebarIsOpen}
						setSidebarisOpen={setSidebarIsOpen}
						newRequestHandler={newRequestHandler}
					/>
					<aside className="hidden lg:block sidebar border-r overflow-auto bg-slate-300">
						<div className="px-4 py-2">
							<Button
								onClick={newRequestHandler}
								className="w-full text-white bg-blue-400 hover:bg-blue-700 font-bold py-2 px-4 rounded-none"
							>
								Neue Anfrage
							</Button>

							<Separator className="my-3" />

							<div
								className="flex bg-inherit rounded-none justify-between w-full items-center hover:bg-none"
								onClick={() => {
									setSidebarIsOpen(!sidebarIsOpen);
								}}
							>
								<div className="text-slate-800">Anfrageverlauf</div>
								{sidebarIsOpen ? (
									<ChevronDownIcon className="text-slate-800"></ChevronDownIcon>
								) : (
									<ChevronLeftIcon></ChevronLeftIcon>
								)}
							</div>

							<Collapsible
								open={sidebarIsOpen}
								onOpenChange={() => setSidebarIsOpen(!sidebarIsOpen)}
							>
								<CollapsibleContent className="p-2">
									{resultHistory &&
										resultHistory.map((history, i, arr) => {
											return (
												<React.Fragment key={history.gpt.id}>
													<button
														className="text-left w-full text-sm text-zinc-600 hover:text-zinc-100"
														onClick={() =>
															restoreResultHistoryItem(history.gpt.id)
														}
													>
														{history.requestBody?.query}
													</button>
													{i !== arr.length - 1 ? (
														<Separator className="my-3" />
													) : null}
												</React.Fragment>
											);
										})}
								</CollapsibleContent>
							</Collapsible>
						</div>
					</aside>
					<main className="flex min-h-screen justify-between bg-slate-200 py-3">
						<div className="flex flex-col min-h-screen justify-between px-10 py-4 space-y-4">
							<div className="flex flex-col space-y-2">
								<div className="lg:w-1/2 lg:mx-auto px-3">
									{!title && (
										<h3 className="text-sm font-semibold text-zinc-900 py-3">
											{
												"Schreiben Sie Ihre Frage in das Suchfeld oder klicken Sie auf auf eines der Beispiele, um den KI-Assistenten zu starten."
											}
										</h3>
									)}
								</div>
								<div className="lg:w-1/2 lg:mx-auto">
									{title && (
										<>
											<h3 className="text-lg font-bold">Ihre Frage</h3>
											<p>{title}</p>
										</>
									)}
									{result &&
										result.length > 0 &&
										result.map((res) => (
											<div key={res.gpt?.id}>
												<h3 className="text-lg font-bold">Antwort</h3>
												<p>{res.gpt?.choices[0].message.content}</p>
												{res.sections &&
													res.sections.map((section) => {
														return (
															<SearchResultSection
																key={section.id}
																sectionDocument={section}
																sectionReport={undefined}
															></SearchResultSection>
														);
													})}
												{res.reportSections &&
													res.reportSections.map((section) => {
														return (
															<SearchResultSection
																key={section.id}
																sectionDocument={undefined}
																sectionReport={section}
															></SearchResultSection>
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
