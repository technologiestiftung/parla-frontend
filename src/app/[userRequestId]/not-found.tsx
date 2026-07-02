/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { texts } from "@/lib/texts";
import { cn } from "@/lib/utils";

export default function NotFound() {
	return (
		<div className="min-h-screen w-full bg-slate-100">
			<div
				className={cn(
					"mx-auto max-w-3xl min-h-screen",
					"flex flex-col items-center justify-center gap-6 text-center",
					"p-5 md:p-8",
				)}
			>
				<img
					alt="Parla Logo"
					src="/images/parla-logo-v1.svg"
					className="w-40 mb-2"
				/>
				<p className="text-7xl font-bold text-parla-blue">404</p>
				<h1 className="text-2xl font-bold text-parla-black">
					{texts.notFound.title}
				</h1>
				<p className="text-lg text-parla-grey">{texts.notFound.description}</p>
				<Link
					href="/"
					className={cn(
						"flex items-center justify-center",
						"px-6 py-2 rounded-md font-bold",
						"bg-blue-700 text-white hover:bg-blue-900",
						"transition-colors",
						"focus:outline-none focus:ring-2 focus:ring-primary",
						"focus:ring-offset-2 focus:ring-offset-white",
					)}
				>
					{texts.notFound.backToHome}
				</Link>
			</div>
		</div>
	);
}
