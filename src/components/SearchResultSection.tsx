import * as Tooltip from "@radix-ui/react-tooltip";
import type { ResponseDocumentMatch } from "@/lib/common";
import React, { ReactNode, useState } from "react";
import { Link } from "./Link";
import { cn, getCleanedMetadata } from "@/lib/utils";
import { AcrobatIcon } from "./ui/acrobat-icon";

interface SearchResultProps {
	documentMatch: ResponseDocumentMatch | undefined;
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
		<p className="text-sm sm:text-base mb-4">
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
	const similarityRouded = Math.floor(props.similarity * 1000) / 10;
	return <span className="text-xs">{similarityRouded}% Relevanz</span>;
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

			<ExpandableTableCell
				content={
					documentMatch?.processed_document_summary_match
						.processed_document_summary.summary ?? ""
				}
			/>

			{tags.length > 0 && <TagsList tags={tags} />}
		</div>
	);
}
