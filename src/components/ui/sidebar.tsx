import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { MouseEventHandler, ReactNode } from "react";
import { Button } from "./button";

type SidebarProps = {
	sidebarIsOpen: boolean;
	setSidebarIsOpen: (open: boolean) => void;
	historyIsOpen: boolean;
	setHistoryIsOpen: (open: boolean) => void;
	onNewRequest: MouseEventHandler<HTMLButtonElement>;
	openSplashScreen: () => void;
	children: ReactNode;
};

function Sidebar(props: SidebarProps): JSX.Element {
	return (
		<>
			<header className="flex items-center justify-between px-1 py-2">
				<a
					href="/"
					title="Startseite"
					className={cn(
						"py-3 px-4 flex justify-between items-center text-lg font-bold rounded",
						"hover:text-slate-600",
						"focus-visible:ring-2 focus-visible:ring-blue-700",
						"focus-visible:outline-none",
					)}
				>
					Parla
				</a>
				<button
					className={cn(
						"px-2 hover:bg-blue-900",
						"text-sm text-slate-400 hover:text-white",
						"border-2 rounded-full border-slate-400 hover:border-blue-900",
						"focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2",
						"focus-visible:outline-none",
					)}
					onClick={props.openSplashScreen}
				>
					i
				</button>
			</header>
			<div className="py-2 border-slate-200">
				<Button
					onClick={props.onNewRequest}
					className="w-full text-white bg-blue-700 hover:bg-blue-900 font-bold py-2 px-4 flex justify-between"
				>
					<span>Neue Frage</span>
					<span>+</span>
				</Button>
			</div>
			<div className="py-2">
				<button
					className={cn(
						"flex bg-inherit justify-between w-full items-center hover:bg-none px-4",
						"focus-visible:ring-2 focus-visible:ring-blue-700",
						"focus-visible:outline-none focus-visible:rounded-sm my-2",
					)}
					onClick={() => props.setHistoryIsOpen(!props.historyIsOpen)}
				>
					<span className="block">Vorherige Fragen</span>
					{props.historyIsOpen ? (
						<ChevronDownIcon className="text-slate-400" />
					) : (
						<ChevronRightIcon className="text-slate-400" />
					)}
				</button>

				<Collapsible
					open={props.historyIsOpen}
					onOpenChange={props.setHistoryIsOpen}
				>
					<CollapsibleContent>{props.children}</CollapsibleContent>
				</Collapsible>
			</div>
		</>
	);
}

export default Sidebar;
