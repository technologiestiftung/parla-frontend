"use client";
/* eslint-disable @next/next/no-img-element */
import MobileSidebar from "@/components/MobileSidebar";
import { SplashScreen } from "@/components/splash-screen";
import PromptForm from "@/components/ui/promptForm";
import PromptContent from "@/components/ui/promtContent";
import ResultHistory from "@/components/ui/resultHistory";
import Sidebar from "@/components/ui/sidebar";
import {
	Algorithms,
	DocumentSearchBody,
	DocumentSearchResponse,
	GenerateAnswerResponse,
	HistoryEntryType,
	availableAlgorithms,
} from "@/lib/common";
import { generateAnswer } from "@/lib/generate-answer";
import { useLocalStorage } from "@/lib/hooks/localStorage";
import { cn } from "@/lib/utils";
import { vectorSearch } from "@/lib/vector-search";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

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
	const [generatedAnswer, setGeneratedAnswer] =
		useState<GenerateAnswerResponse | null>(null);
	const [_errors, setErrors] = useState<Record<string, any> | null>(null);
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const [resultHistory, setResultHistory] = useLocalStorage<HistoryEntryType[]>(
		"ki-anfragen-history",
		[],
	);
	const algorithm = availableAlgorithms.find(
		(alg) => alg.search_algorithm === selectedSearchAlgorithm,
	) as DocumentSearchBody;
	const [searchConfig] = useState<DocumentSearchBody>(algorithm);

	useEffect(() => {
		setSidebarIsOpen(!isMobile);
		setShowSplash(true);
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [searchResult, generatedAnswer]);

	async function onSubmit(query?: string) {
		setErrors(null);
		setSearchIsLoading(true);
		setAnswerIsLoading(true);
		setSearchResult(null);

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

			abortController.current = new AbortController();
			const answerResponse = await generateAnswer({
				query,
				documentMatches: searchResponse.documentMatches,
				signal: abortController.current.signal,
			});

			setResultHistory((prev) => [
				...prev,
				{
					id: answerResponse.answer.id,
					query,
					searchResponse,
					answerResponse,
				},
			]);

			setAnswerIsLoading(false);
			setGeneratedAnswer(answerResponse);
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
		setTitle(null);
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
			<div className="min-h-screen w-full z-50">
				<div className="flex flex-col min-h-screen lg:grid lg:grid-cols-[280px_1fr] lg:gap-4 bg-slate-100 lg:p-4">
					<aside className="hidden h-[calc(100vh-2rem)] lg:block sidebar overflow-y-auto">
						<Sidebar
							sidebarIsOpen={sidebarIsOpen}
							onNewRequest={newRequestHandler}
							onSidebarOpenChange={setSidebarIsOpen}
						>
							{resultHistory && resultHistory.length > 0 && (
								<ResultHistory
									resultHistory={resultHistory}
									restoreResultHistoryItem={restoreResultHistoryItem}
								/>
							)}
						</Sidebar>
					</aside>
					<main
						className={cn(
							"flex h-screen lg:h-[calc(100vh-2rem)] overflow-y-auto justify-center",
							"bg-white  lg:rounded-md border border-slate-200 relative",
						)}
					>
						<div className="w-full flex flex-col justify-between">
							<div className="px-10 py-7 space-y-4">
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
							<PromptForm
								query={formData.query}
								onChange={onChange}
								onSubmit={(evt) => {
									evt.preventDefault();
									onSubmit(formData.query);
								}}
								isLoading={searchIsLoading}
							/>
						</div>
					</main>
					<MobileSidebar
						resultHistory={resultHistory}
						restoreResultHistoryItem={restoreResultHistoryItem}
						isHistoryOpen={sidebarIsOpen}
						setSidebarisOpen={setSidebarIsOpen}
						newRequestHandler={newRequestHandler}
					>
						{resultHistory && (
							<ResultHistory
								resultHistory={resultHistory}
								restoreResultHistoryItem={restoreResultHistoryItem}
							/>
						)}
					</MobileSidebar>
				</div>
			</div>
		</>
	);
}
