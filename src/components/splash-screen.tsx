"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/os3Im0Kjb6V
 */
import {
	DialogTitle,
	DialogHeader,
	DialogContent,
	Dialog,
	DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";

export function SplashScreen({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<Dialog open={open}>
			<div>
				<DialogContent
					// onClick={() => setOpen(false)}
					className=" bg-white dark:bg-gray-800 rounded-md shadow-lg  max-w-lg mx-auto my-8 px-6 py-4 z-50"
				>
					<DialogHeader className="flex justify-center mb-4">
						<DialogTitle>Modal Title</DialogTitle>
					</DialogHeader>
					<div className="absolute top-2 right-2"></div>
					<div className="space-y-3 text-sm">
						<p>
							This is the first paragraph. It contains some information related
							to the modal.
						</p>
						<p>
							This is the second paragraph. It continues from where the first
							paragraph left off.
						</p>
						<p>
							This is the third paragraph. It concludes the information in the
							modal.
						</p>
					</div>
					<div className="flex justify-around mt-4">
						<img
							alt="Logo 1"
							height="50"
							src="/placeholder.svg"
							style={{
								aspectRatio: "50/50",
								objectFit: "cover",
							}}
							width="50"
						/>
						<img
							alt="Logo 2"
							height="50"
							src="/placeholder.svg"
							style={{
								aspectRatio: "50/50",
								objectFit: "cover",
							}}
							width="50"
						/>
						<img
							alt="Logo 3"
							height="50"
							src="/placeholder.svg"
							style={{
								aspectRatio: "50/50",
								objectFit: "cover",
							}}
							width="50"
						/>
					</div>
					<div className="flex justify-around mt-4">
						<Link className="text-blue-500 dark:text-blue-300" href="#">
							Link 1
						</Link>
						<Link className="text-blue-500 dark:text-blue-300" href="#">
							Link 2
						</Link>
						<Link className="text-blue-500 dark:text-blue-300" href="#">
							Link 3
						</Link>
						<Link className="text-blue-500 dark:text-blue-300" href="#">
							Link 4
						</Link>
					</div>
				</DialogContent>
			</div>
		</Dialog>
	);
}
