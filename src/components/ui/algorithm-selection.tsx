import { Body } from "@/lib/common";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDownIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "./button";

import { cn } from "@/lib/utils";

export enum AvailableAlgorithms {
	ChunksAndSummaries = "chunks-and-summaries",
	ChunksOnly = "chunks-only",
	SummariesThenChunks = "summaries-then-chunks",
}

export const AlgorithmNamesMap = {
	"summaries-then-chunks": "Erst Zusammenfassungen, dann Seiten",
	"chunks-and-summaries": "Seiten und Zusammenfassungen",
	"chunks-only": "Nur Seiten",
};

export const availableAlgorithms = [
	{
		temperature: 0,
		match_threshold: 0.85,
		num_probes: 8,
		openai_model: "gpt-3.5-turbo-16k",
		document_limit: 3,
		search_algorithm: AvailableAlgorithms.ChunksOnly,
		match_count: 64,
		include_summary_in_response_generation: false,
	} as Body,
	{
		temperature: 0,
		match_threshold: 0.85,
		num_probes: 8,
		openai_model: "gpt-3.5-turbo-16k",
		chunk_limit: 128,
		summary_limit: 16,
		document_limit: 3,
		search_algorithm: AvailableAlgorithms.ChunksAndSummaries,
		include_summary_in_response_generation: false,
	} as Body,
	{
		temperature: 0,
		match_threshold: 0.85,
		num_probes: 8,
		openai_model: "gpt-3.5-turbo-16k",
		document_limit: 3,
		search_algorithm: AvailableAlgorithms.SummariesThenChunks,
		match_count: 64,
		include_summary_in_response_generation: false,
	} as Body,
];

type AlgorithmSelectionProps = {
	searchConfig: Body;
	setSearchConfig: (_: Body) => void;
	settingIsOpen: boolean;
	setSettingIsOpen: (_: boolean) => void;
};

function AlgorithmSelection(props: AlgorithmSelectionProps): JSX.Element {
	return (
		<>
			<div className="px-1 py-2">
				<button
					className={cn(
						"flex bg-inherit justify-between w-full items-center hover:bg-none px-4 py-3",
						"focus-visible:ring-2 focus-visible:ring-blue-700",
						"focus-visible:outline-none focus-visible:rounded-sm my-2",
					)}
					onClick={() => props.setSettingIsOpen(!props.settingIsOpen)}
				>
					<strong className="block font-bold">Suchoptionen</strong>
					{props.settingIsOpen ? (
						<ChevronDownIcon className="text-slate-400"></ChevronDownIcon>
					) : (
						<ChevronLeftIcon className="text-slate-400"></ChevronLeftIcon>
					)}
				</button>

				<Collapsible
					open={props.settingIsOpen}
					onOpenChange={props.setSettingIsOpen}
				>
					<CollapsibleContent>
						{availableAlgorithms.map((alg) => {
							return (
								<Button
									key={alg.search_algorithm}
									onClick={() => {
										props.setSearchConfig(alg);
									}}
									className={`w-full text-white font-bold py-2 px-4 flex justify-between mb-2 text-xs bg-white text-black hover:text-white ${
										props.searchConfig &&
										props.searchConfig.search_algorithm ===
											alg.search_algorithm &&
										"text-white bg-blue-700"
									}`}
								>
									<span>{AlgorithmNamesMap[alg.search_algorithm]}</span>
								</Button>
							);
						})}
					</CollapsibleContent>
				</Collapsible>
			</div>
		</>
	);
}

export default AlgorithmSelection;
