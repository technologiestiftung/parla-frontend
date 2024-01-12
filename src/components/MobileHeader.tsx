import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";
import { MouseEvent, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import Sidebar from "./ui/sidebar";
import { HistoryEntryType } from "@/lib/common";
import { cn } from "@/lib/utils";

export default function MobileHeader({
	sidebarIsOpen,
	setSidebarisOpen,
	openSplashScreen,
}: {
	sidebarIsOpen: boolean;
	setSidebarisOpen: (isOpen: boolean) => void;
	openSplashScreen: () => void;
}) {
	return (
		<div className="md:hidden p-3">
			<div className="flex flex-row justify-between items-center">
				<button
					onClick={() => {
						setSidebarisOpen(true);
					}}
				>
					<HamburgerMenuIcon className="w-[20px] h-[20px]"></HamburgerMenuIcon>
				</button>
				<div className="italic font-bold">Parla</div>
				<div>
					<button
						onClick={() => {
							openSplashScreen();
						}}
						className={cn(
							"px-2 hover:bg-blue-900",
							"text-sm text-slate-400 hover:text-white",
							"border-2 rounded-full border-slate-400 hover:border-blue-900",
							"focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2",
							"focus-visible:outline-none",
						)}
					>
						i
					</button>
				</div>
			</div>
		</div>
	);
}
