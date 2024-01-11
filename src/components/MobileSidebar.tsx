import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";
import { MouseEvent, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import Sidebar from "./ui/sidebar";
import { HistoryEntryType } from "@/lib/common";
import { cn } from "@/lib/utils";

export default function MobileSidebar({
	isHistoryOpen,
	setHistoryOpen,
	sidebarIsOpen,
	setSidebarisOpen,
	newRequestHandler,
	openSplashScreen,
	children,
}: {
	resultHistory: HistoryEntryType[];
	restoreResultHistoryItem: (id: string) => void;
	isHistoryOpen: boolean;
	setHistoryOpen: (_: boolean) => void;
	sidebarIsOpen: boolean;
	setSidebarisOpen: (isOpen: boolean) => void;
	newRequestHandler: (event: MouseEvent<HTMLButtonElement>) => void;
	openSplashScreen: () => void;
	children: ReactNode;
}) {
	return (
		<>
			<div
				className={`absolute lg:hidden top-0 left-0 w-screen h-screen bg-grey-300 bg-slate-400 bg-opacity-40 z-40 ${
					sidebarIsOpen ? "visible" : "invisible"
				}`}
				style={{
					maxHeight: "-webkit-fill-available",
					maxWidth: "-webkit-fill-available",
				}}
			>
				<div className="flex w-full h-full">
					<div
						className={`flex items-start w-80 h-full ease-in-out duration-300 ${
							sidebarIsOpen ? "translate-x-0" : "-translate-x-80"
						}`}
					>
						<aside className="w-80 h-screen border-r overflow-auto bg-white px-4 shadow-lg pb-4">
							<Sidebar
								sidebarIsOpen={sidebarIsOpen}
								onNewRequest={newRequestHandler}
								setSidebarIsOpen={setSidebarisOpen}
								openSplashScreen={openSplashScreen}
								setHistoryIsOpen={setHistoryOpen}
								historyIsOpen={isHistoryOpen}
							>
								{children}
							</Sidebar>
						</aside>
						<Button
							className={[
								"px-2 sm:px-3 py-3 shadow-md flex gap-2 absolute top-2 left-[calc(100%+0.5rem)]",
								"transition-opacity",
								!sidebarIsOpen && "opacity-0 pointer-events-none",
								sidebarIsOpen && "opacity-100",
							]
								.filter(Boolean)
								.join(" ")}
							onClick={() => setSidebarisOpen(false)}
						>
							<XIcon />
							<span className="hidden sm:inline">Schließen</span>
						</Button>
					</div>
					<div
						className="flex w-1 grow"
						onClick={() => setSidebarisOpen(false)}
					></div>
				</div>
			</div>
		</>
	);
}
