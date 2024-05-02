"use client";
import MobileHeader from "@/components/mobile-header";
/* eslint-disable @next/next/no-img-element */
import MobileSidebar from "@/components/mobile-sidebar";
import { SplashScreen } from "@/components/splash-screen";
import { ErrorAlert } from "@/components/ui/error-alert";
import PromptForm from "@/components/ui/prompt-form";
import PromptContent from "@/components/ui/prompt-content";
import ResultHistory from "@/components/ui/result-history";
import Sidebar from "@/components/ui/sidebar";
import Sources from "@/components/ui/sources";
import {
	Algorithms,
	DocumentSearchBody,
	DocumentSearchResponse,
	availableAlgorithms,
} from "@/lib/common";
import { generateAnswer } from "@/lib/generate-answer";
import { useHistoryStore } from "@/lib/hooks/local-storage";
import { useShowSplashScreenFromLocalStorage } from "@/lib/hooks/show-splash-screen";
import { useMatomo } from "@/lib/hooks/use-matomo";
import { loadUserRequest } from "@/lib/load-user-request";
import { cn } from "@/lib/utils";
import { vectorSearch } from "@/lib/vector-search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useInitializeSessionId } from "@/lib/hooks/use-initialize-session-id";

// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function Home() {
	return (
		<Suspense>
			<App></App>
		</Suspense>
	);
}

function App() {
	const defaultFormdata: DocumentSearchBody = availableAlgorithms[1];

	useMatomo();
	useInitializeSessionId();

	const router = useRouter();
	const abortController = useRef<AbortController | null>(null);
	const searchParams = useSearchParams();
	const selectedSearchAlgorithm =
		searchParams.get("search-algorithm") ?? Algorithms.ChunksAndSummaries;

	const requestId = usePathname().split("/").slice(-1)[0];

	const [title, setTitle] = useState<string | null>(null);
	const [formData, setFormData] = useState(defaultFormdata);
	const [searchIsLoading, setSearchIsLoading] = useState(false);
	const [answerIsLoading, setAnswerIsLoading] = useState(false);
	const [requestLoading, setRequestLoading] = useState(false);
	const [showSplash, setShowSplash] = React.useState(false);
	const [searchResult, setSearchResult] =
		useState<DocumentSearchResponse | null>(null);
	const [generatedAnswer, setGeneratedAnswer] = useState<string | null>(null);
	const [_errors, setErrors] = useState<Record<string, any> | null>(null);
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const [historyIsOpen, setHistoryIsOpen] = useState(true);

	const { resultHistory, setResultHistory } = useHistoryStore();

	const { showSplashScreenRef } = useShowSplashScreenFromLocalStorage();
	const algorithm = availableAlgorithms.find(
		(alg) => alg.search_algorithm === selectedSearchAlgorithm,
	) as DocumentSearchBody;
	const [searchConfig] = useState<DocumentSearchBody>(algorithm);

	useEffect(() => {
		setSidebarIsOpen(false);
		setShowSplash(showSplashScreenRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps

		// For backwards compatibility with old localStorage history, we initially load the parly-history
		// save it in the new Zustand store and remove it from localStorage
		if (localStorage.getItem("parla-history")) {
			setResultHistory(JSON.parse(localStorage.getItem("parla-history")!));
			localStorage.removeItem("parla-history");
		}
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [searchResult, generatedAnswer]);

	useEffect(() => {
		if (answerIsLoading) {
			return;
		}
		if (requestId) {
			restoreResultHistoryItem(requestId);
		}
	}, [requestId]);

	async function onSubmit(query: string | null) {
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
				window.history.pushState({}, "", `/${searchResponse.userRequestId}`);
				answerResponse = await generateAnswer({
					userRequestId: searchResponse.userRequestId,
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

			setResultHistory([
				{
					id: searchResponse.userRequestId,
					query,
					feedbacks: [],
					searchResponse,
					answerResponse,
				},
				...resultHistory,
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
		setTitle(null);
		setFormData((prevValues) => ({ ...prevValues, [name]: value }));
	}

	function newRequestHandler(event: React.MouseEvent<HTMLButtonElement>): void {
		router.push("/");
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

	async function restoreResultHistoryItem(id: string) {
		let historyEntry = useHistoryStore
			.getState()
			.resultHistory.find((entry) => entry.id === id);
		if (!historyEntry) {
			setRequestLoading(true);
			try {
				const userRequest = await loadUserRequest(
					id,
					abortController.current?.signal,
				);
				if (userRequest) historyEntry = userRequest;
				setResultHistory([
					userRequest,
					...useHistoryStore.getState().resultHistory,
				]);
			} catch (e) {
				console.log(e);
				router.push("/");
			} finally {
				setRequestLoading(false);
			}
		}
		if (historyEntry) {
			resetState();
			setSearchResult(historyEntry.searchResponse);
			if (!historyEntry.answerResponse) {
				setErrors({ query: "historyEntry does not have an answer response" });
			} else {
				setGeneratedAnswer(historyEntry.answerResponse);
			}
			setTitle(historyEntry.query);
			setFormData((s) => ({ ...s, query: historyEntry!.query }));
			window.history.pushState({}, "", `/${historyEntry.id}`);
		}
	}

	return (
		<>
			<SplashScreen open={showSplash} setOpen={setShowSplash} />
			<div className="min-h-screen w-full">
				<div className="flex flex-col min-h-screen md:grid md:grid-cols-[280px_1fr] md:gap-2 md:p-2 lg:grid lg:grid-cols-[320px_1fr] lg:gap-4 bg-slate-100 lg:p-4">
					<aside className="hidden h-[calc(100vh-2rem)] md:block sidebar overflow-y-auto bg-slate-100">
						<Sidebar
							sidebarIsOpen={sidebarIsOpen}
							setSidebarIsOpen={setSidebarIsOpen}
							historyIsOpen={historyIsOpen}
							setHistoryIsOpen={setHistoryIsOpen}
							clearResultHistory={() => setResultHistory([])}
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
									removeResultHistoryItem={(id) => {
										setResultHistory(
											resultHistory.filter((entry) => entry.id !== id),
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
									setSidebarisOpen={setSidebarIsOpen}
									openSplashScreen={() => setShowSplash(true)}
								/>
								<PromptForm
									query={formData.query || title}
									onChange={onChange}
									onSubmit={onSubmit}
									isLoading={searchIsLoading}
								/>
								{_errors && (
									<ErrorAlert
										callback={() => {
											setErrors(null);
											onSubmit(formData.query);
										}}
										error={
											"Fehler beim Generieren der Antwort. Bitte versuchen Sie es erneut."
										}
									/>
								)}
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
									searchIsLoading={searchIsLoading || requestLoading}
									answerIsLoading={answerIsLoading || requestLoading}
								/>
							</div>
							<div className="px-2 md:px-2 lg:px-10">
								<Sources
									searchIsLoading={searchIsLoading || requestLoading}
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
						clearResultHistory={() => setResultHistory([])}
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
								removeResultHistoryItem={(id) => {
									setResultHistory(
										resultHistory.filter((entry) => entry.id !== id),
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
