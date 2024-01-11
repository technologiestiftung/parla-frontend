"use client";
import MobileHeader from "@/components/MobileHeader";
/* eslint-disable @next/next/no-img-element */
import MobileSidebar from "@/components/MobileSidebar";
import { SplashScreen } from "@/components/splash-screen";
import PromptForm from "@/components/ui/promptForm";
import PromptContent from "@/components/ui/promtContent";
import ResultHistory from "@/components/ui/resultHistory";
import Sidebar from "@/components/ui/sidebar";
import Sources from "@/components/ui/sources";
import {
	Algorithms,
	DocumentSearchBody,
	DocumentSearchResponse,
	HistoryEntryType,
	availableAlgorithms,
} from "@/lib/common";
import { generateAnswer } from "@/lib/generate-answer";
import { useLocalStorage } from "@/lib/hooks/localStorage";
import { useShowSplashScreenFromLocalStorage } from "@/lib/hooks/show-splash-screen";
import { cn } from "@/lib/utils";
import { vectorSearch } from "@/lib/vector-search";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const defaultFormdata: DocumentSearchBody = availableAlgorithms[1];

export default function Home() {
	const abortController = useRef<AbortController | null>(null);
	const searchParams = useSearchParams();
	const selectedSearchAlgorithm =
		searchParams.get("search-algorithm") ?? Algorithms.ChunksAndSummaries;

	const [title, setTitle] = useState<string | null>(null);
	const [formData, setFormData] = useState(defaultFormdata);
	const [searchIsLoading, setSearchIsLoading] = useState(false);
	const [answerIsLoading, setAnswerIsLoading] = useState(false);
	const [showSplash, setShowSplash] = React.useState(false);
	const [searchResult, setSearchResult] =
		useState<DocumentSearchResponse | null>(null);
	const [generatedAnswer, setGeneratedAnswer] = useState<string | null>(null);
	const [_errors, setErrors] = useState<Record<string, any> | null>(null);
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const [historyIsOpen, setHistoryIsOpen] = useState(true);
	const [resultHistory, setResultHistory] = useLocalStorage<HistoryEntryType[]>(
		"parla-history",
		[],
	);
	const { showSplashScreenRef } = useShowSplashScreenFromLocalStorage();
	const algorithm = availableAlgorithms.find(
		(alg) => alg.search_algorithm === selectedSearchAlgorithm,
	) as DocumentSearchBody;
	const [searchConfig] = useState<DocumentSearchBody>(algorithm);

	useEffect(() => {
		setSidebarIsOpen(false);
		setShowSplash(showSplashScreenRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [searchResult, generatedAnswer]);

	async function onSubmit(query?: string) {
		setErrors(null);
		setSearchIsLoading(true);
		setAnswerIsLoading(true);
		setSearchResult(null);
		setGeneratedAnswer(null);

		if (!query || query?.trim().length === 0) {
			setSearchIsLoading(false);
			setAnswerIsLoading(false);
			setErrors({ query: "Bitte geben Sie eine Anfrage ein." });
			return;
		}

		setTitle(query);

		try {
			abortController.current = new AbortController();
			const searchResponse = await vectorSearch({
				...searchConfig,
				query,
				signal: abortController.current.signal,
			});
			setSearchResult(searchResponse);
			setSearchIsLoading(false);

			let answerResponse = "";
			if (searchResponse.documentMatches.length > 0) {
				abortController.current = new AbortController();
				answerResponse = await generateAnswer({
					include_summary_in_response_generation: true,
					query,
					documentMatches: searchResponse.documentMatches,
					signal: abortController.current.signal,
					chunkCallback: (chunk) => {
						setGeneratedAnswer(chunk);
					},
				});
				setGeneratedAnswer(answerResponse);
			}
			setAnswerIsLoading(false);

			setResultHistory((prev) => [
				{
					id: uuidv4(),
					query,
					searchResponse,
					answerResponse,
				},
				...prev,
			]);
		} catch (error) {
			if (error instanceof Error) {
				setErrors({ query: error.message });
			}
			console.error(error);
			setSearchIsLoading(false);
			setAnswerIsLoading(false);
		}
	}

	function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		const { name, value } = event.target;
		setFormData((prevValues) => ({ ...prevValues, [name]: value }));
	}

	function newRequestHandler(event: React.MouseEvent<HTMLButtonElement>): void {
		event.preventDefault();
		resetState();
	}

	function resetState(): void {
		abortController.current?.abort();
		setTitle(undefined);
		setSearchResult(null);
		setErrors(null);
		setFormData(defaultFormdata);
		setAnswerIsLoading(false);
		setGeneratedAnswer(null);
		setSearchIsLoading(false);
	}

	function restoreResultHistoryItem(id: string): void {
		const historyEntry = resultHistory.find((entry) => entry.id === id);
		if (!historyEntry) return;
		resetState();
		setSearchResult(historyEntry.searchResponse);
		setGeneratedAnswer(historyEntry.answerResponse);
		setTitle(historyEntry.query);
	}

	return (
		<>
			<SplashScreen open={showSplash} setOpen={setShowSplash} />
			<div className="min-h-screen w-full">
				<div className="flex flex-col min-h-screen md:grid md:grid-cols-[280px_1fr] md:gap-2 md:p-2 lg:grid lg:grid-cols-[320px_1fr] lg:gap-4 bg-slate-100 lg:p-4">
					<aside className="hidden h-[calc(100vh-2rem)] md:block sidebar overflow-y-auto">
						<Sidebar
							sidebarIsOpen={sidebarIsOpen}
							setSidebarIsOpen={setSidebarIsOpen}
							historyIsOpen={historyIsOpen}
							setHistoryIsOpen={setHistoryIsOpen}
							onNewRequest={newRequestHandler}
							openSplashScreen={() => setShowSplash(true)}
						>
							{resultHistory && resultHistory.length > 0 && (
								<ResultHistory
									resultHistory={resultHistory}
									restoreResultHistoryItem={(id) => {
										setSidebarIsOpen(false);
										restoreResultHistoryItem(id);
									}}
									clearResultHistory={() => setResultHistory([])}
									removeResultHistoryItem={(id) => {
										setResultHistory((prev) =>
											prev.filter((entry) => entry.id !== id),
										);
									}}
								/>
							)}
						</Sidebar>
					</aside>
					<main
						className={cn(
							"flex h-auto lg:h-[calc(100vh-2rem)] sm:overflow-y-auto justify-center",
							"bg-[#F8FAFC] lg:rounded-md border border-slate-200",
						)}
					>
						<div className="w-full space-y-10 sm:space-y-20">
							<div
								className={`sticky top-0 w-full bg-[#F8FAFC] px-2 md:px-2 lg:px-10`}
								style={{ zIndex: 1 }}
							>
								<MobileHeader
									sidebarIsOpen={sidebarIsOpen}
									setSidebarisOpen={setSidebarIsOpen}
									openSplashScreen={() => setShowSplash(true)}
								></MobileHeader>
								<PromptForm
									query={formData.query || title}
									onChange={onChange}
									onSubmit={onSubmit}
									isLoading={searchIsLoading}
								/>
							</div>

							<div className="px-2 md:px-2 lg:px-10">
								<PromptContent
									title={title}
									searchResult={searchResult}
									generatedAnswer={generatedAnswer}
									onsubmit={(text) => {
										setFormData((s) => ({ ...s, query: text }));
										onSubmit(text);
									}}
									searchIsLoading={searchIsLoading}
									answerIsLoading={answerIsLoading}
								/>
							</div>

							<div className="px-2 md:px-2 lg:px-10">
								<Sources
									searchIsLoading={searchIsLoading}
									searchResult={searchResult}
								/>
							</div>
						</div>
					</main>
					<MobileSidebar
						resultHistory={resultHistory}
						restoreResultHistoryItem={restoreResultHistoryItem}
						isHistoryOpen={historyIsOpen}
						sidebarIsOpen={sidebarIsOpen}
						setSidebarisOpen={setSidebarIsOpen}
						newRequestHandler={newRequestHandler}
						openSplashScreen={() => setShowSplash(true)}
						setHistoryOpen={setHistoryIsOpen}
					>
						{resultHistory && (
							<ResultHistory
								resultHistory={resultHistory}
								restoreResultHistoryItem={(id) => {
									setSidebarIsOpen(false);
									restoreResultHistoryItem(id);
								}}
								clearResultHistory={() => setResultHistory([])}
								removeResultHistoryItem={(id) => {
									setResultHistory((prev) =>
										prev.filter((entry) => entry.id !== id),
									);
								}}
							/>
						)}
					</MobileSidebar>
				</div>
			</div>
		</>
	);
}
