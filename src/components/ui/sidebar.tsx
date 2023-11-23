import { cn } from "@/lib/utils";
import { MouseEventHandler, ReactNode } from "react";
import { Button } from "./button";

type SidebarProps = {
	onNewRequest: MouseEventHandler<HTMLButtonElement>;
	onSidebarOpenChange: (open: boolean) => void;
	openSplashScreen: () => void;
	sidebarIsOpen: boolean;
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
					ki.anfragen
				</a>
				<button
					className={cn(
						"px-2 hover:bg-blue-900",
						"text-sm text-slate-400 hover:text-white",
						"border-2 rounded-full border-slate-400 hover:border-blue-900",
						"focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2",
						"focus-visible:outline-none")
					}
					onClick={props.openSplashScreen}
				>
					i
				</button>
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
		</>
	);
}

export default Sidebar;
