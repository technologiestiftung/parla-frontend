import { DocumentSearchResponse } from "@/lib/common";
import { getDocumentsCount } from "@/lib/get-documents-count";
import { texts } from "@/lib/texts";
import { getCleanedMetadata } from "@/lib/utils";
import { useEffect, useState } from "react";
import SearchResultSection from "../SearchResultSection";
import DocumentLoadingSkeleton from "./documentLoadingSkeleton";

type SourcesProps = {
	searchResult: DocumentSearchResponse | null;
	searchIsLoading: boolean;
};

const formatter = new Intl.NumberFormat("de-DE");

function Sources(props: SourcesProps): JSX.Element {
	const [documentsCount, setDocumentsCount] = useState("");
	const { searchResult, searchIsLoading } = props;
	const matches = searchResult?.documentMatches ?? [];

	useEffect(() => {
		getDocumentsCount().then((count) =>
			setDocumentsCount(`${formatter.format(count) || ""}`),
		);
	}, []);

	if (!searchIsLoading && searchResult && matches.length === 0) {
		return (
			<>
				<h4 className="text-lg font-bold mb-2">{texts.noResultsTitle}</h4>
			</>
		);
	}

	return (
		<div className="max-w-3xl mx-auto pb-12">
			<h5 className="text-lg ml-4 mb-2">
				{searchIsLoading &&
					`${documentsCount} ${texts.documentsAreLoading}.`.trim()}
				{!searchIsLoading && searchResult && texts.documentsTitle}
			</h5>
			{searchIsLoading && <DocumentLoadingSkeleton />}
			{!searchIsLoading && matches.length > 0 && (
				<div className="space-y-4">
					{matches
						.sort((l, r) => {
							const lm = getCleanedMetadata(l);
							const rm = getCleanedMetadata(r);
							return lm.similarity < rm.similarity ? 1 : -1;
						})
						.map((documentMatch) => {
							return (
								<SearchResultSection
									key={documentMatch.registered_document.id}
									documentMatch={documentMatch}
								/>
							);
						})}
				</div>
			)}
		</div>
	);
}

export default Sources;
