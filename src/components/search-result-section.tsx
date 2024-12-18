import type { ResponseDocumentMatch } from "@/lib/common";
import { cn, getCleanedMetadata } from "@/lib/utils";
import { useState } from "react";
import { Link } from "./link";
import { AcrobatIcon } from "./ui/icons/acrobat-icon";
import { GlobeIcon } from "@radix-ui/react-icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
			<ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-container">
				{displayedContent}
			</ReactMarkdown>

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

export function SearchResultSection({ documentMatch }: SearchResultProps) {
	const { title, pdfUrl, documentName, pages, type, tags, formattedDate } =
		getCleanedMetadata(documentMatch);

	const isWebSource = type === "Webseite";

	// Hacky fix: "Hauptausschussprotokoll" documents in the database should be named "Hauptausschussvorgang"
	// Ideally, this should be fixed in the database
	const documenType =
		type === "Hauptausschussprotokoll" ? "Hauptausschussvorgang" : type;

	const processedAt = new Date(
		documentMatch?.processed_document.processing_finished_at!,
	);
	return (
		<div className="bg-white p-4 rounded-lg shadow-md">
			<div className="flex gap-2 justify-between items-center">
				<span className="flex gap-x-2 flex-wrap items-center text-sm sm:text-base">
					<span>{documenType}</span>
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
				<span className="text-slate-400 text-sm">{formattedDate}</span>
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
