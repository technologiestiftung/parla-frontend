"use client";
/* eslint-disable @next/next/no-img-element */
import { isMobile } from "react-device-detect";
import { SplashScreen } from "@/components/splash-screen";
import Sidebar from "@/components/ui/sidebar";
import { Body, ResponseDetail } from "@/lib/common";
import { useLocalStorage } from "@/lib/hooks/localStorage";
import { vectorSearch } from "@/lib/vector-search";
import React, { useEffect, useState } from "react";
import MobileSidebar from "@/components/MobileSidebar";
import ResultHistory from "@/components/ui/resultHistory";
import PromptContent from "@/components/ui/promtContent";
import PromptForm from "@/components/ui/promptForm";
import { cn } from "@/lib/utils";
const defaultFormdata: Body = {
	query: "",
};

const chunkAndSummaryConfig = {
	temperature: 0,
	match_threshold: 0.85,
	num_probes: 8,
	openai_model: "gpt-3.5-turbo-16k",
	chunk_limit: 128,
	summary_limit: 16,
	document_limit: 3,
	search_algorithm: "chunks-and-summaries",
	include_summary_in_response_generation: false,
} as Body;

const chunkOnlyConfig = {
	temperature: 0,
	match_threshold: 0.85,
	num_probes: 8,
	openai_model: "gpt-3.5-turbo-16k",
	document_limit: 3,
	search_algorithm: "chunks-only",
	match_count: 64,
	include_summary_in_response_generation: false,
} as Body;

const summariesThenChunksConfig = {
	temperature: 0,
	match_threshold: 0.85,
	num_probes: 8,
	openai_model: "gpt-3.5-turbo-16k",
	document_limit: 3,
	search_algorithm: "summaries-then-chunks",
	match_count: 64,
	include_summary_in_response_generation: false,
} as Body;

export default function Home() {
	const [title, setTitle] = useState<string | null>(null);
	const [formData, setFormData] = useState(defaultFormdata);
	const [isLoading, setIsLoading] = React.useState(false);
	const [showSplash, setShowSplash] = React.useState(false);
	const [result, setResult] = useState<ResponseDetail | null>(null);
	const [_errors, setErrors] = useState<Record<string, any> | null>(null);
	const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
	const { resultHistory, setResultHistory } = useLocalStorage(
		"ki-anfragen-history",
		[],
	);
	const [searchConfig, setSearchConfig] = useState<Body>(chunkAndSummaryConfig);

	useEffect(() => {
		setSidebarIsOpen(!isMobile);
		setShowSplash(true);
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [result]);

	function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setErrors(null);
		setIsLoading(true);
		setResult(null);

		if (formData.query?.trim().length === 0) {
			setIsLoading(false);
			setErrors({ query: "Bitte geben Sie eine Anfrage ein." });
			return;
		}

		if (formData.query) {
			setTitle(formData.query);

			vectorSearch({
				...formData,
				...searchConfig,
				// ...chunkAndSummaryConfig,
				// ...summariesThenChunksConfig,
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

	function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		const { name, value } = event.target;
		setFormData((prevValues) => ({ ...prevValues, [name]: value }));
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
			setResult(filtered[0]);
			setTitle(filtered[0].requestBody?.query!);
		}
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
							{resultHistory && (
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
								<div>
									<button
										onClick={() => {
											setSearchConfig(chunkOnlyConfig);
										}}
									>
										chunks-only
									</button>
									<br />
									<button
										onClick={() => {
											setSearchConfig(chunkAndSummaryConfig);
										}}
									>
										chunks-and-summaries
									</button>
									<br />
									<button
										onClick={() => {
											setSearchConfig(summariesThenChunksConfig);
										}}
									>
										summaries-then-chunks
									</button>
									<br />
									<div>{JSON.stringify(searchConfig)}</div>
								</div>
								<PromptContent
									title={title}
									result={result}
									onsubmit={(text) =>
										setFormData((s) => ({ ...s, query: text }))
									}
									isLoading={isLoading}
								/>
							</div>
							<PromptForm
								query={formData.query}
								onChange={onChange}
								onSubmit={onSubmit}
								isLoading={isLoading}
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
