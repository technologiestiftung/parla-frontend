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
	clearResultHistory: () => void;
	onNewRequest: MouseEventHandler<HTMLButtonElement>;
	openSplashScreen: () => void;
	children: ReactNode;
};

export function Sidebar(props: SidebarProps): JSX.Element {
	return (
		<>
			<div className="sticky top-0 left-0 bg-inherit">
				<header className="flex items-center justify-between px-4 pb-7 pt-3">
					<a href="/">
						<img
							alt="Parla Logo"
							src="/images/parla-logo-v1.svg"
							className="w-[50%] py-3"
						/>
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

				<button
					className="text-blue-700 flex items-center px-4 py-2 text-sm hover:bg-blue-900 hover:text-white rounded-md hover:cursor-pointer mb-4"
					onClick={() => props.clearResultHistory()}
				>
					<div>Fragenverlauf löschen</div>
				</button>
			</div>

			<Collapsible
				open={props.historyIsOpen}
				onOpenChange={props.setHistoryIsOpen}
			>
				<CollapsibleContent>{props.children}</CollapsibleContent>
			</Collapsible>
		</>
	);
}
