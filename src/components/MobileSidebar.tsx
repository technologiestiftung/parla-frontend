import React, { MouseEvent, ReactNode, useState } from "react";
import { ResponseDetail } from "@/lib/common";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";
import Sidebar from "./ui/sidebar";
import { Button } from "./ui/button";

export default function MobileSidebar({
	isHistoryOpen,
	setSidebarisOpen,
	newRequestHandler,
	children,
}: {
	resultHistory: ResponseDetail[];
	restoreResultHistoryItem: (id: string) => void;
	isHistoryOpen: boolean;
	setSidebarisOpen: (isOpen: boolean) => void;
	newRequestHandler: (event: MouseEvent<HTMLButtonElement>) => void;
	children: ReactNode;
}) {
	const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);

	return (
		<>
			<div
				className={`absolute lg:hidden top-0 left-0 w-screen h-screen bg-grey-300 bg-slate-400 bg-opacity-40 z-40 ${
					isMobileSidebarVisible ? "visible" : "invisible"
				}`}
				style={{
					maxHeight: "-webkit-fill-available",
					maxWidth: "-webkit-fill-available",
				}}
			>
				<div className="flex w-full h-full">
					<div
						className={`flex items-start w-80 h-full ease-in-out duration-300 ${
							isMobileSidebarVisible ? "translate-x-0" : "-translate-x-80"
						}`}
					>
						<aside className="w-80 h-screen border-r overflow-auto bg-white px-4 shadow-lg pb-4">
							<Sidebar
								sidebarIsOpen={isHistoryOpen}
								onNewRequest={newRequestHandler}
								onSidebarOpenChange={setSidebarisOpen}
							>
								{children}
							</Sidebar>
						</aside>
						<Button
							className={[
								"px-2 sm:px-3 py-3 shadow-md flex gap-2 absolute top-2 left-[calc(100%+0.5rem)]",
								"transition-opacity",
								!isMobileSidebarVisible && "opacity-0 pointer-events-none",
								isMobileSidebarVisible && "opacity-100",
							]
								.filter(Boolean)
								.join(" ")}
							onClick={() => setIsMobileSidebarVisible(false)}
						>
							<XIcon />
							<span className="hidden sm:inline">Schließen</span>
						</Button>
					</div>
					<div
						className="flex w-1 grow"
						onClick={() => setIsMobileSidebarVisible(false)}
					></div>
				</div>
			</div>
			<div className="absolute top-0 lg:hidden z-60 p-3">
				<Button
					onClick={() => setIsMobileSidebarVisible(!isMobileSidebarVisible)}
					className="p3"
					size="icon"
				>
					<HamburgerMenuIcon width={20} height={20} />
				</Button>
			</div>
		</>
	);
}