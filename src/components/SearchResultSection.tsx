import type {
	ResponseSectionDocument,
	ResponseSectionReport,
} from "@/lib/common";
import { Link } from "./Link";
import { TD, TR, Table } from "./table";

interface CombinedPdf {
	id: number;
	url: string;
	desk: string | undefined;
	title: string | undefined;
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

export default function SearchResultSection({
	sectionReport,
	sectionDocument,
}: SearchResultProps) {
	const combinedSection = {
		id: sectionReport?.id ?? sectionDocument?.id,
		source: sectionReport ? "Hauptausschussprotokoll (Rote Nummer)" : "Schriftliche Anfrage",
		page: sectionReport?.page ?? sectionDocument?.page,
		content: sectionReport?.content ?? sectionDocument?.content,
		similarity: sectionReport?.similarity ?? sectionDocument?.similarity,
		token_count: sectionReport?.token_count ?? sectionDocument?.token_count,
		pdfs:
			sectionReport?.pdfs?.map((pdf) => {
				return { id: pdf.id, url: pdf.doc_ref } as CombinedPdf;
			}) ??
			sectionDocument?.pdfs?.map((pdf) => {
				return {
					id: pdf.id,
					url: pdf.lokurl,
					desk: pdf.desk,
					title: pdf.titel,
				} as CombinedPdf;
			}),
	} as CombinedSection;

	return (
		<div key={combinedSection.id} className="py-4 pb-8 overflow-x-auto">
			<Table>
				{combinedSection.pdfs &&
					combinedSection.pdfs.map((pdf) => (
						<>
							<tbody key={pdf.id}>
								<TR additionalClassNames="border-t border-t-blue-500 border-2">
									<TD additionalClassNames="font-bold">Quelle:</TD>
									<TD>{combinedSection.source}</TD>
								</TR>
								<TR
									withBg
									
								>
									<TD additionalClassNames="font-bold">Titel:</TD>
									<TD>{pdf.title ?? "-"}</TD>
								</TR>
								<TR>
									<TD additionalClassNames="font-bold">Seite:</TD>
									<TD>{combinedSection.page}</TD>
								</TR>
								<TR withBg>
									<TD additionalClassNames="font-bold">PDF:</TD>
									<TD>
										{pdf.url && (
											<Link href={pdf.url}>
												{pdf.url
													?.split("/")
													.findLast((str) => str.endsWith(".pdf"))}
											</Link>
										)}
									</TD>
								</TR>

								<TR>
									<TD additionalClassNames="font-bold">Beschreibung:</TD>
									<TD>{pdf.desk ?? "-"}</TD>
								</TR>
							</tbody>
						</>
					))}
				<tbody>
					<TR withBg>
						<TD additionalClassNames="font-bold">Ähnlichkeit:</TD>
						<TD>{combinedSection.similarity}</TD>
					</TR>
					<TR>
						<TD additionalClassNames="font-bold">Kontext:</TD>
						<TD>{combinedSection.content && <>{combinedSection.content}</>}</TD>
					</TR>
					<TR withBg>
						<TD additionalClassNames="font-bold">Token Anzahl:</TD>
						<TD>{combinedSection.token_count}</TD>
					</TR>
				</tbody>
			</Table>
		</div>
	);
}
