import * as Tooltip from "@radix-ui/react-tooltip";
import type { ResponseDocumentMatch } from "@/lib/common";
import React, { ReactNode, useState } from "react";
import { Link } from "./Link";
import { cn, getCleanedMetadata } from "@/lib/utils";

interface SearchResultProps {
	documentMatch: ResponseDocumentMatch | undefined;
}

function AcrobatIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			aria-label="Acrobat PDF icon"
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M1.041 18.061c-.03.031-.059.063-.087.096A3.456 3.456 0 0 0 3.444 24a3.43 3.43 0 0 0 2.413-.967l.046-.04.051-.046.045-.054c.915-1.093 1.945-2.959 2.83-4.62 1.903-.745 3.83-1.468 5.69-1.948 1.73 1.246 4.046 2.053 6.037 2.053A3.456 3.456 0 0 0 24 14.933a3.456 3.456 0 0 0-3.444-3.444c-1.509 0-3.533.466-5.174.978a17.194 17.194 0 0 1-2.724-3.577l.154-.466c.234-.702.473-1.42.667-2.099.278-.967.499-1.962.499-2.88A3.456 3.456 0 0 0 10.533 0 3.456 3.456 0 0 0 7.09 3.444c0 1.003.275 2.064.646 3.08.327.899.75 1.813 1.18 2.685-.69 2.141-1.45 4.338-2.38 6.23l-.786.302c-.711.272-1.405.537-2.027.8-.96.408-1.874.861-2.593 1.44l-.046.038-.042.042Zm10.47-14.617a.967.967 0 0 0-.978-.977.967.967 0 0 0-.977.977c0 .769.5 2.124 1.107 3.537.455-1.452.848-2.803.848-3.537Zm1.979 10.61a19.587 19.587 0 0 1-2.537-3.223c-.51 1.556-1.051 3.137-1.726 4.66 1.397-.532 2.813-1.04 4.263-1.436Zm8.043.88a.967.967 0 0 0-.977-.978c-.915 0-2.483.357-3.92.763 1.252.695 2.818 1.192 3.92 1.192a.967.967 0 0 0 .977-.978ZM4.117 21.28c.478-.576 1.16-1.721 1.848-2.948-1.418.567-2.665 1.099-3.239 1.543a1.05 1.05 0 0 0-.26.68c0 .548.43.977.978.977a.93.93 0 0 0 .673-.252Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

function ExpandableTableCell({ content }: { content: string }) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const handleClick = () => {
		setIsExpanded(!isExpanded);
	};
	const displayedContent = isExpanded
		? content
		: `${content?.slice(0, 200)}${content.length > 200 ? "..." : ""}`;

	return (
		<p className="text-sm sm:text-base">
			{displayedContent}
			<br />
			<button
				className={cn(
					"underline text-blue-700 hover:text-blue-900",
					"bg-none focus-visible:outline-none",
					"focus-visible:ring-2 focus-visible:ring-blue-700",
					"focus-visible:ring-offset-4 focus-visible:ring-offset-white",
					"focus-visible:rounded-sm",
				)}
				onClick={handleClick}
			>
				{isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
			</button>
		</p>
	);
}

function TagsList(props: { tags: string[] }) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const maxTags = 3;
	const tags = isExpanded ? props.tags : props.tags.slice(0, maxTags);
	return (
		<div className="flex gap-x-2 gap-y-1 flex-wrap">
			{tags.map((tag) => (
				<span
					className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs inline-block rounded-full"
					key={tag}
				>
					{tag}
				</span>
			))}
			{props.tags.length > maxTags && (
				<button
					className={cn(
						"inline-block rounded-full transition-colors text-xs",
						isExpanded
							? "text-blue-700 underline"
							: "bg-slate-100 text-slate-600 px-2 py-0.5 hover:bg-blue-900 hover:text-white",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700",
						"focus-visible:ring-offset-4 focus-visible:ring-offset-white",
					)}
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{!isExpanded
						? `+${props.tags.length - maxTags}`
						: `Schlagworte ausblenden`}
				</button>
			)}
		</div>
	);
}

type SimilarityDisplayProps = {
	similarity: number;
};

function SimilarityDisplay(props: SimilarityDisplayProps): ReactNode {
	const similarityRouded = Math.floor(props.similarity * 10) / 10;
	return (
		<Tooltip.Provider delayDuration={0}>
			<Tooltip.Root>
				<Tooltip.Trigger asChild className="group shrink-0">
					<span className="h-1.5 w-8 rounded-full bg-slate-200 inline-block relative">
						<span
							className={cn(
								"h-1.5 w-8 rounded-full absolute top-0 left-0",
								"transition-colors cursor-pointer",
								similarityRouded < 0.5 && "bg-red-500 group-hover:bg-red-700",
								similarityRouded >= 0.5 &&
									similarityRouded < 0.8 &&
									"bg-orange-500 group-hover:bg-orange-700",
								similarityRouded >= 0.8 &&
									"bg-blue-700 group-hover:bg-blue-900",
							)}
							style={{ width: `${similarityRouded * 100}%` }}
						/>
					</span>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						className="px-3 py-2 bg-blue-700 text-white shadow-lg rounded animate-in"
						sideOffset={5}
					>
						{Math.floor(props.similarity * 1000) / 10}% Relevanz
						<Tooltip.Arrow className="fill-blue-700" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}

export default function SearchResultSection({
	documentMatch,
}: SearchResultProps) {
	const { title, pdfUrl, pdfName, pages, similarity, type, tags } =
		getCleanedMetadata(documentMatch);

	return (
		<div className="border-x border-t last-of-type:border-b first-of-type:rounded-t last-of-type:rounded-b p-4">
			<div className="flex gap-2 justify-between items-center relative">
				<span className="flex gap-x-2 flex-wrap items-center text-sm sm:text-base">
					<span>{type}</span>
					<span className="text-slate-400 hidden sm:inline" aria-hidden="true">
						∙
					</span>
					{pdfUrl && (
						<Link
							href={pdfUrl}
							title={`PDF "${pdfName}" öffnen`}
							className="no-underline flex gap-1 items-center flex-wrap"
						>
							<AcrobatIcon />
							<span>{pdfName}</span>{" "}
							{pages && pages.length > 0 && (
								<span className="text-slate-600 ml-1">
									(S. {pages?.join(", ")})
								</span>
							)}
						</Link>
					)}
				</span>
				<SimilarityDisplay similarity={similarity} />
			</div>

			<h6 className="font-bold text-lg mt-2 sm:mt-1 mb-3 leading-snug">
				{title}
			</h6>

			{/* INFO: Commented out because AI-generated summaries could contain hallucinations  */}
			{/* <ExpandableTableCell
				content={
					documentMatch?.processed_document_summary_match
						.processed_document_summary.summary ?? ""
				}
			/> */}

			{tags.length > 0 && <TagsList tags={tags} />}
		</div>
	);
}
