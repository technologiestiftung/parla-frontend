import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { ResponseDetail } from "@/lib/common";
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";

export default function MobileSidebar({
	resultHistory,
	restoreResultHistoryItem,
	isHistoryOpen,
	setSidebarisOpen,
	newRequestHandler,
}: {
	resultHistory: ResponseDetail[];
	restoreResultHistoryItem: (id: string) => void;
	isHistoryOpen: boolean;
	setSidebarisOpen: (isOpen: boolean) => void;
	newRequestHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);

	return (
		<>
			<div className="absolute top-0 lg:hidden z-60 p-3">
				<button
					onClick={() => setIsMobileSidebarVisible(!isMobileSidebarVisible)}
				>
					<HamburgerMenuIcon width={20} height={20} />
				</button>
			</div>

			<div
				className={`absolute lg:hidden top-0 left-0 w-screen h-screen bg-grey-300 bg-white bg-opacity-40 z-40 ${
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
						<aside className="w-80 h-full border-r overflow-auto bg-slate-300">
							<div className="px-4 py-2">
								<Button
									onClick={newRequestHandler}
									className="w-full text-white bg-blue-400 hover:bg-blue-700 font-bold py-2 px-4"
								>
									Neue Anfrage
								</Button>

								<Separator className="my-3" />

								<div
									className="flex bg-inherit justify-between w-full items-center hover:bg-none"
									onClick={() => {
										setSidebarisOpen(!isHistoryOpen);
									}}
								>
									<div className="text-slate-800">Anfrageverlauf</div>
									{isHistoryOpen ? (
										<ChevronDownIcon className="text-slate-800"></ChevronDownIcon>
									) : (
										<ChevronLeftIcon></ChevronLeftIcon>
									)}
								</div>

								<Collapsible
									open={isHistoryOpen}
									onOpenChange={() => setSidebarisOpen(!isHistoryOpen)}
								>
									<CollapsibleContent className="p-2">
										{resultHistory &&
											resultHistory.map((history, i, arr) => {
												return (
													<React.Fragment key={history.gpt.id}>
														<button
															className="text-left w-full text-sm text-zinc-600 hover:text-zinc-100"
															onClick={() =>
																restoreResultHistoryItem(history.gpt.id)
															}
														>
															{history.requestBody?.query}
														</button>
														{i !== arr.length - 1 ? (
															<Separator className="my-3" />
														) : null}
													</React.Fragment>
												);
											})}
									</CollapsibleContent>
								</Collapsible>
							</div>
						</aside>
						<button
							className="p-2"
							onClick={() => setIsMobileSidebarVisible(false)}
						>
							<XIcon />
						</button>
					</div>
					<div
						className="flex w-1 grow"
						onClick={() => setIsMobileSidebarVisible(false)}
					></div>
				</div>
			</div>
		</>
	);
}
