import { FC } from "react";
import { cn } from "@/lib/utils";
import { useTexts } from "@/lib/hooks/useTexts";

export const LegalFooter: FC = () => {
	const texts = useTexts();

	return (
		<>
			<footer className={cn(`border-t border-gray-20`)}>
				<div
					className={cn(
						"md:container mx-auto md:max-w-7xl",
						"px-5 py-10 lg:px-8 items-center",
						"flex gap-x-4 gap-y-3 flex-wrap justify-between",
					)}
				>
					<p className="text-sm px-2 py-0.5 rounded text-slate-600 border border-slate-100 bg-slate-100 bg-opacity-25">
						<b className="text-slate-800">{texts?.footer.disclaimerPrefix}</b>{" "}
						{texts?.footer.disclaimerContent}
					</p>
					<section
						className={cn(
							`flex gap-x-6 gap-y-1 flex-wrap text-slate-500`,
							`justify-center sm:justify-start`,
						)}
					>
						<a
							className={cn(
								`underline transition-colors hover:text-primary`,
								`focus:outline-none focus:ring-2 focus:ring-primary`,
								`focus:ring-offset-2 focus:ring-offset-white`,
							)}
							href={texts?.footer.imprintLinkUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{texts?.footer.imprintLinkText}
						</a>
						<a
							className={cn(
								`underline transition-colors hover:text-primary`,
								`focus:outline-none focus:ring-2 focus:ring-primary`,
								`focus:ring-offset-2 focus:ring-offset-white`,
							)}
							href={texts?.footer.privacyLinkUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{texts?.footer.privacyLinkText}
						</a>
					</section>
				</div>
			</footer>
		</>
	);
};
