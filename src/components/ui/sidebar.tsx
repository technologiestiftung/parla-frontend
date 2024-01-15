import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import {
	ChevronDownIcon,
	ChevronRightIcon,
	InfoCircledIcon,
	PlusCircledIcon,
} from "@radix-ui/react-icons";
import { MouseEventHandler, ReactNode } from "react";

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
			<header className="flex items-center justify-between px-4 py-2">
				<a
					href="/"
					title="Startseite"
					className={cn(
						"py-3 flex justify-between items-center text-lg font-bold rounded",
						"hover:text-slate-600",
						"focus-visible:ring-2 focus-visible:ring-blue-700",
						"focus-visible:outline-none",
					)}
				>
					Parla
				</a>
				<button onClick={props.openSplashScreen}>
					<InfoCircledIcon className="w-6 h-6 text-slate-400"></InfoCircledIcon>
				</button>
			</header>

			<button
				className="w-full flex items-center justify-between px-4 py-2 rounded-md bg-blue-700 text-white font-bold hover:bg-blue-900 hover:cursor-pointer"
				onClick={props.onNewRequest}
			>
				<div>Neue Frage</div>
				<div>
					<PlusCircledIcon className="w-6 h-6 text-white"></PlusCircledIcon>
				</div>
			</button>

			<button
				className="w-full flex items-center justify-between px-4 py-6 pb-1"
				onClick={() => props.setHistoryIsOpen(!props.historyIsOpen)}
			>
				<div>Vorherige Fragen</div>
				<div>
					{props.historyIsOpen ? (
						<ChevronDownIcon className="w-6 h-6 text-slate-400" />
					) : (
						<ChevronRightIcon className="w-6 h-6 text-slate-400" />
					)}
				</div>
			</button>

			<Collapsible
				open={props.historyIsOpen}
				onOpenChange={props.setHistoryIsOpen}
			>
				<CollapsibleContent>{props.children}</CollapsibleContent>
			</Collapsible>
		</>
	);
}

export default Sidebar;
