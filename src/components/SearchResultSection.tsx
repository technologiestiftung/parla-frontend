import type { ResponseDocumentMatch } from "@/lib/common";
import { cn, getCleanedMetadata } from "@/lib/utils";
import { useState } from "react";
import { Link } from "./Link";
import { AcrobatIcon } from "./ui/acrobat-icon";
import { GlobeIcon } from "@radix-ui/react-icons";

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
			<button
				className={cn(
					"underline text-blue-700 hover:text-blue-900",
					"bg-none focus-visible:outline-none",
					"focus-visible:ring-2 focus-visible:ring-blue-700",
					"focus-visible:ring-offset-4 focus-visible:ring-offset-white",
					"focus-visible:rounded-sm ml-2",
				)}
				onClick={handleClick}
			>
				{isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
			</button>
		</p>
	);
}

interface TagsListProps {
	tags: string[];
}

function TagsList({ tags }: TagsListProps) {
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
		</div>
	);
}

type SimilarityDisplayProps = {
	similarity: number;
};

function SimilarityDisplay(props: SimilarityDisplayProps): JSX.Element {
	const similarityRouded = Math.floor(props.similarity * 1000) / 10;
	return <span className="text-xs">{similarityRouded}% Relevanz</span>;
}

export default function SearchResultSection({
	documentMatch,
}: SearchResultProps) {
	const { title, pdfUrl, documentName, pages, similarity, type, tags } =
		getCleanedMetadata(documentMatch);

	const isWebSource = type === "Webseite";
	const processedAt = new Date(
		documentMatch?.processed_document.processing_finished_at!,
	);
	return (
		<div className="bg-white p-4 rounded-lg shadow-md">
			<div className="flex gap-2 justify-between items-center">
				<span className="flex gap-x-2 flex-wrap items-center text-sm sm:text-base">
					<span>{type}</span>
					<span className="text-slate-400 hidden sm:inline" aria-hidden="true">
						∙
					</span>
					{pdfUrl && (
						<Link
							href={pdfUrl}
							title={`Dokument "${documentName}" öffnen`}
							className="no-underline flex gap-1 items-center flex-wrap"
						>
							{pdfUrl.endsWith(".pdf") ? (
								<AcrobatIcon />
							) : (
								<GlobeIcon></GlobeIcon>
							)}
							<span>{documentName}</span>{" "}
							{!isWebSource && pages && pages.length > 0 && (
								<span className="text-slate-600 ml-1">
									(S. {pages?.join(", ")})
								</span>
							)}
							{isWebSource && (
								<span className="text-slate-600 ml-1">
									(Abgerufen am {processedAt.toLocaleDateString()})
								</span>
							)}
						</Link>
					)}
				</span>
				<SimilarityDisplay similarity={similarity} />
			</div>

			<h6 className="text-lg mt-2 sm:mt-1 mb-3 leading-snug">{title}</h6>

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
