import { Body } from "@/lib/common";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDownIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { MouseEventHandler, ReactNode } from "react";
import AlgorithmSelection from "./algorithm-selection";
import { Button } from "./button";

type SidebarProps = {
	onNewRequest: MouseEventHandler<HTMLButtonElement>;
	onSidebarOpenChange: (open: boolean) => void;
	sidebarIsOpen: boolean;
	children: ReactNode;
	searchConfig: Body;
	setSearchConfig: (_: Body) => void;
	settingIsOpen: boolean;
	setSettingIsOpen: (_: boolean) => void;
};

function Sidebar(props: SidebarProps): JSX.Element {
	return (
		<>
			<header className="px-1 py-2">
				<a
					href="/"
					title="Startseite"
					className={cn(
						"py-3 px-4 flex justify-between items-center text-lg font-bold rounded",
						"focus-visible:ring-2 focus-visible:ring-blue-700",
						"focus-visible:outline-none",
					)}
				>
					<span>ki.anfragen</span>
					<span className="text-slate-400 text-xs">?</span>
				</a>
			</header>
			<div className="px-1 py-2 border-y border-slate-200">
				<Button
					onClick={props.onNewRequest}
					className="w-full text-white bg-blue-700 hover:bg-blue-900 font-bold py-2 px-4 flex justify-between"
				>
					<span>Neue Anfrage</span>
					<span>+</span>
				</Button>
			</div>
			<div className="px-1 py-2">
				<button
					className={cn(
						"flex bg-inherit justify-between w-full items-center hover:bg-none px-4 py-3",
						"focus-visible:ring-2 focus-visible:ring-blue-700",
						"focus-visible:outline-none focus-visible:rounded-sm my-2",
					)}
					onClick={() => props.onSidebarOpenChange(!props.sidebarIsOpen)}
				>
					<strong className="block font-bold">Anfrageverlauf</strong>
					{props.sidebarIsOpen ? (
						<ChevronDownIcon className="text-slate-400"></ChevronDownIcon>
					) : (
						<ChevronLeftIcon className="text-slate-400"></ChevronLeftIcon>
					)}
				</button>

				<Collapsible
					open={props.sidebarIsOpen}
					onOpenChange={props.onSidebarOpenChange}
				>
					<CollapsibleContent>{props.children}</CollapsibleContent>
					<AlgorithmSelection
						searchConfig={props.searchConfig}
						setSearchConfig={props.setSearchConfig}
						settingIsOpen={props.settingIsOpen}
						setSettingIsOpen={props.setSettingIsOpen}
					></AlgorithmSelection>
				</Collapsible>
			</div>
		</>
	);
}

export default Sidebar;
