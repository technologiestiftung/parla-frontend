import React, { MouseEventHandler, ReactNode } from "react";
import { Button } from "./button";
import { ChevronDownIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

type SidebarProps = {
	onNewRequest: MouseEventHandler<HTMLButtonElement>;
	onSidebarOpenChange: (open: boolean) => void;
	sidebarIsOpen: boolean;
	children: ReactNode;
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
						"focus-visible:ring-2 focus-visible:ring-blue-500",
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
					className="w-full text-white bg-blue-400 hover:bg-blue-700 font-bold py-2 px-4 flex justify-between"
				>
					<span>Neue Anfrage</span>
					<span>+</span>
				</Button>
			</div>
			<div className="px-1 py-2">
				<button
					className={cn(
						"flex bg-inherit justify-between w-full items-center hover:bg-none px-4 py-3",
						"focus-visible:ring-2 focus-visible:ring-blue-500",
						"focus-visible:outline-none focus-visible:rounded-sm",
					)}
					onClick={() => props.onSidebarOpenChange(!props.sidebarIsOpen)}
				>
					<div className="text-slate-600">Anfrageverlauf</div>
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
					<CollapsibleContent className="p-2">
						{props.children}
					</CollapsibleContent>
				</Collapsible>
			</div>
		</>
	);
}

export default Sidebar;
