import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { HistoryEntryType } from "@/lib/common";

type ResultHistoryProps = {
	resultHistory: HistoryEntryType[];
	restoreResultHistoryItem: (id: string) => void;
	clearResultHistory: () => void;
	removeResultHistoryItem: (id: string) => void;
};

function ResultHistory(props: ResultHistoryProps) {
	return (
		<>
			<Button
				className={cn(
					"-mt-3",
					"bg-transparent w-full text-left text-sm whitespace-normal h-auto text-blue-700",
					"rounded-none first-of-type:rounded-t last-of-type:rounded-b",
					"hover:text-white justify-start hover:border-blue-900 relative focus-visible:z-10",
					"focus-visible:rounded",
				)}
				onClick={() => props.clearResultHistory()}
			>
				Fragenverlauf löschen
			</Button>
			<div className="flex flex-col mt-2">
				{props.resultHistory.map((history, i, arr) => {
					return (
						<div className="group relative" key={`${history.id}-${i}`}>
							<Button
								className={cn(
									"bg-white w-full text-left text-sm whitespace-normal h-auto text-blue-700",
									"border border-t-0 group-first-of-type:border-t border-slate-200",
									"rounded-none group-first-of-type:rounded-t group-last-of-type:rounded-b",
									"hover:text-white justify-start hover:border-blue-900 relative focus-visible:z-10",
									"focus-visible:rounded pr-10",
								)}
								onClick={() => props.restoreResultHistoryItem(history.id)}
							>
								{history.query}
							</Button>
							<button
								className={cn(
									"absolute top-1 right-1 px-2 py-0.5 opacity-0 pointer-events-none",
									"group-hover:opacity-100 group-hover:pointer-events-auto",
									"focus-visible:opacity-100 focus-visible:pointer-events-auto",
									"bg-white h-auto text-blue-700 shadow rounded",
									"border border-slate-200 text-xl leading-tight",
									"hover:text-white hover:bg-blue-900 hover:border-blue-900 focus-visible:z-10",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2",
								)}
								onClick={() => props.removeResultHistoryItem(history.id)}
							>
								×
							</button>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default ResultHistory;
