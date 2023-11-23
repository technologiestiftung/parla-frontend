import { ResponseDetail } from "@/lib/common";
import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type ResultHistoryProps = {
	resultHistory: ResponseDetail[];
	restoreResultHistoryItem: (id: string) => void;
};

function ResultHistory(props: ResultHistoryProps) {
	return props.resultHistory.map((history, i, arr) => {
		return (
			<Button
				key={`${history.gpt?.id}-${i}`}
				className={cn(
					"bg-white w-full text-left text-sm whitespace-normal h-auto text-blue-700",
					"border border-t-0 first-of-type:border-t border-slate-200",
					"rounded-none first-of-type:rounded-t last-of-type:rounded-b",
					"hover:text-white justify-start hover:border-blue-900 relative focus-visible:z-10",
					"focus-visible:rounded",
				)}
				onClick={() => props.restoreResultHistoryItem(history.gpt.id)}
			>
				{history.requestBody?.query}
			</Button>
		);
	});
}

export default ResultHistory;
