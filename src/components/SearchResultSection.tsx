import type { ResponseSectionDocument } from "@/lib/common";
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
	sectionDocument,
}: SearchResultProps) {
	const combinedSection = {
		id: sectionDocument?.id,
		source: sectionDocument?.registered_documents?.[0]?.source_type,
		page: sectionDocument?.page,
		content: sectionDocument?.content,
		similarity: sectionDocument?.similarity,
		registered_documents: sectionDocument?.registered_documents?.map(
			(reg_doc) => {
				return {
					id: reg_doc.id,
					url: reg_doc.source_url,

					title: reg_doc.source_type.toLowerCase().includes("schriftliche")
						? //@ts-ignore
						  reg_doc.metadata["Titel"]
						: //@ts-ignore
						  reg_doc.metadata["title"],
					published_at: reg_doc.registered_at,
				} as Pdf;
			},
		),
	} as CombinedSection;
	return (
		<Card className="rounded-none mb-3" key={combinedSection.id}>
			<CardHeader></CardHeader>
			<CardContent>
				<Table>
					<TableBody>
						{combinedSection.registered_documents &&
							combinedSection.registered_documents.length > 0 &&
							combinedSection.registered_documents.map((reg_doc) => {
								return (
									<React.Fragment key={reg_doc.id}>
										{reg_doc.title && (
											<TableRow>
												<TableHead>Thema</TableHead>
												<TableCell>{reg_doc.title}</TableCell>
											</TableRow>
										)}
										{reg_doc.published_at && (
											<TableRow>
												<TableHead>Registriert</TableHead>
												<TableCell>{reg_doc.published_at}</TableCell>
											</TableRow>
										)}
										<TableRow>
											<TableHead>Dokument</TableHead>
											<TableCell>
												{reg_doc.url && (
													<Link href={reg_doc.url}>
														{reg_doc.url
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
