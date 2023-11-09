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

	const results = result || [];

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

	function onChange(event: React.ChangeEvent<HTMLInputElement>) {
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
			setResult([filtered[0]]);
			setTitle(filtered[0].requestBody?.query!);
		}
	}

	return (
		<>
			<SplashScreen open={showSplash} setOpen={setShowSplash} />
			<div className="min-h-screen w-full z-50">
				<div className="flex flex-col min-h-screen lg:grid w-full lg:grid-cols-[280px_1fr]">
					<MobileSidebar
						resultHistory={resultHistory}
						restoreResultHistoryItem={restoreResultHistoryItem}
						isHistoryOpen={sidebarIsOpen}
						setSidebarisOpen={setSidebarIsOpen}
						newRequestHandler={newRequestHandler}
					/>
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
					<main className="flex min-h-screen justify-between bg-slate-200 py-3">
						<div className="flex flex-col min-h-screen justify-between px-10 py-4 space-y-4">
							<PromptContent
								title={title}
								results={results}
								onsubmit={(text) => setFormData((s) => ({ ...s, query: text }))}
							/>
							<PromptForm
								query={formData.query}
								onChange={onChange}
								onSubmit={onSubmit}
								isLoading={isLoading}
							/>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
