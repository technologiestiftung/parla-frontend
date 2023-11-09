import type {
	ResponseSectionDocument,
	ResponseSectionReport,
} from "@/lib/common";
import React, { useState } from "react";
import { Link } from "./Link";
import { Table } from "./table";
import { Card, CardContent, CardHeader } from "./ui/card";
import { TableBody, TableCell, TableHead, TableRow } from "./ui/table";

interface CombinedPdf {
	id: number;
	url: string;
	desk: string | undefined;
	title: string | undefined;
	published_at: string | undefined;
}

interface CombinedSection {
	id: number;
	page: number;
	content: string;
	similarity: number;
	token_count: number;
	pdfs: Array<CombinedPdf>;
	source: string;
}

interface SearchResultProps {
	sectionReport: ResponseSectionReport | undefined;
	sectionDocument: ResponseSectionDocument | undefined;
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
	sectionReport,
	sectionDocument,
}: SearchResultProps) {
	const combinedSection = {
		id: sectionReport?.id ?? sectionDocument?.id,
		source: sectionReport
			? "Hauptausschussprotokoll (Rote Nummer)"
			: "Schriftliche Anfrage",
		page: sectionReport?.page ?? sectionDocument?.page,
		content: sectionReport?.content ?? sectionDocument?.content,
		similarity: sectionReport?.similarity ?? sectionDocument?.similarity,
		token_count: sectionReport?.token_count ?? sectionDocument?.token_count,
		pdfs:
			sectionReport?.pdfs?.map((pdf) => {
				return {
					id: pdf.id,
					url: pdf.doc_ref,
				} as CombinedPdf;
			}) ??
			sectionDocument?.pdfs?.map((pdf) => {
				return {
					id: pdf.id,
					url: pdf.lokurl,
					desk: pdf.desk,
					title: pdf.titel,
					published_at: pdf.dokdat,
				} as CombinedPdf;
			}),
	} as CombinedSection;

	return (
		<Card className="mb-3" key={combinedSection.id}>
			<CardHeader></CardHeader>
			<CardContent>
				<Table>
					<TableBody>
						{combinedSection.pdfs &&
							combinedSection.pdfs.length > 0 &&
							combinedSection.pdfs.map((pdf) => {
								return (
									<React.Fragment key={pdf.id}>
										{pdf.title && (
											<TableRow>
												<TableHead>Thema</TableHead>
												<TableCell>{pdf.title}</TableCell>
											</TableRow>
										)}
										{pdf.published_at && (
											<TableRow>
												<TableHead>Veröffentlichung</TableHead>
												<TableCell>{pdf.published_at}</TableCell>
											</TableRow>
										)}
										<TableRow>
											<TableHead>Dokument</TableHead>
											<TableCell>
												{pdf.url && (
													<Link href={pdf.url}>
														{pdf.url
															?.split("/")
															.findLast((str) => str.endsWith(".pdf"))}
													</Link>
												)}
												{", "}
												{`Seite ${combinedSection.page}`}
											</TableCell>
										</TableRow>
									</React.Fragment>
								);
							})}
						<TableRow className="border-none">
							<TableHead>Kontext</TableHead>
							<ExpandableTableCell
								content={combinedSection.content ? combinedSection.content : ""}
							></ExpandableTableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
