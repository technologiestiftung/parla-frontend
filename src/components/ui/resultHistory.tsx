import { ResponseDetail } from "@/lib/common";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

type ResultHistoryProps = {
	resultHistory: ResponseDetail[];
	restoreResultHistoryItem: (id: string) => void;
};

function ResultHistory(props: ResultHistoryProps) {
	return props.resultHistory.map((history, i, arr) => {
		return (
			<React.Fragment key={history.gpt.id}>
				<button
					className="text-left w-full text-sm text-zinc-600 hover:text-zinc-100"
					onClick={() => props.restoreResultHistoryItem(history.gpt.id)}
				>
					{history.requestBody?.query}
				</button>
				{i !== arr.length - 1 ? <Separator className="my-3" /> : null}
			</React.Fragment>
		);
	});
}

export default ResultHistory;
