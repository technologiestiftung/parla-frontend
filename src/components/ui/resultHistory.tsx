import { HistoryEntryType } from "@/lib/common";
import { cn } from "@/lib/utils";
import { MessageIcon } from "./MessageIcon";

type ResultHistoryProps = {
	resultHistory: HistoryEntryType[];
	restoreResultHistoryItem: (id: string) => void;
	clearResultHistory: () => void;
	removeResultHistoryItem: (id: string) => void;
};

function ResultHistory(props: ResultHistoryProps) {
	return (
		<>
			<button
				className="text-blue-700 flex items-center px-4 py-2 text-sm hover:bg-blue-900 hover:text-white rounded-md hover:cursor-pointer mb-4"
				onClick={() => props.clearResultHistory()}
			>
				<div>Fragenverlauf löschen</div>
			</button>
			<div className="flex flex-col mt-2">
				{props.resultHistory.map((history, i, arr) => {
					return (
						<div className="group relative" key={`${history.id}-${i}`}>
							<button
								className={cn(
									"bg-transparent w-full text-left text-sm whitespace-normal text-black",
									"hover:text-blue-700",
									"pr-10 pl-4 pb-6",
								)}
								onClick={() => props.restoreResultHistoryItem(history.id)}
							>
								<div className="flex flex-row gap-2">
									<div>
										<MessageIcon></MessageIcon>
									</div>
									<div>{history.query}</div>
								</div>
							</button>
							<button
								className={cn(
									"absolute top-1 right-1 px-2 py-0.5 opacity-0 pointer-events-none",
									"group-hover:opacity-100 group-hover:pointer-events-auto",
									"focus-visible:opacity-100 focus-visible:pointer-events-auto",
									"bg-white h-auto text-blue-700 shadow rounded",
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
