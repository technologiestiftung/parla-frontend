import type {
	ResponseDocumentMatch,
	ResponseSectionDocument,
} from "@/lib/common";
import React, { useState } from "react";
import { Link } from "./Link";
import { Table } from "./table";
import { Card, CardContent, CardHeader } from "./ui/card";
import { TableBody, TableCell, TableHead, TableRow } from "./ui/table";

interface Pdf {
	id: number;
	url: string;
	desk: string | undefined;
	title: string | undefined;
	published_at: string | undefined;
	summary: string;
}

interface CombinedSection {
	id: number;
	page: number;
	content: string;
	similarity: number;
	token_count: number;
	registered_documents: Array<Pdf>;
	source: string;
}

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
		: `${content?.slice(0, 100)}${content.length > 100 ? "..." : ""}`;

	return (
		<TableCell>
			{displayedContent}
			<br />
			<a
				className="underline text-blue-700 hover:text-blue-900"
				onClick={handleClick}
			>
				{isExpanded ? "Weniger…" : "Mehr…"}
			</a>
		</TableCell>
	);
}

export default function SearchResultSection({
	documentMatch,
}: SearchResultProps) {
	const metadata = documentMatch?.registered_document.metadata;

	//@ts-ignore
	const title: string | undefined = metadata["title"] ?? metadata["Titel"];

	return (
		<Card
			className="rounded-none mb-3"
			key={documentMatch?.registered_document.id}
		>
			<CardHeader></CardHeader>
			<CardContent>
				<Table>
					<TableBody>
						<TableRow>
							<TableHead>Titel</TableHead>
							<TableCell>{title}</TableCell>
						</TableRow>
						<TableRow>
							<TableHead>Typ</TableHead>
							<TableCell>
								{documentMatch?.registered_document.source_type}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableHead>Quelle</TableHead>
							<TableCell>
								<a href={documentMatch?.registered_document.source_url}>
									{
										documentMatch?.registered_document.source_url
											.split("/")
											.slice(-1)[0]
									}
								</a>
							</TableCell>
						</TableRow>
						<TableRow className="border-none">
							<TableHead>Zusammenfassung</TableHead>
							<ExpandableTableCell
								content={
									documentMatch?.processed_document_summary_match
										.processed_document_summary.summary ?? ""
								}
							></ExpandableTableCell>
						</TableRow>
						<TableRow>
							<TableHead>Ähnlichkeit</TableHead>
							<TableCell>
								{documentMatch?.processed_document_summary_match.similarity}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableHead>Seiten</TableHead>
							<TableCell>
								{documentMatch?.processed_document_chunk_matches
									.map((c) => c.processed_document_chunk.page)
									.sort()
									.join(", ")}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
