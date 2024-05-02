import { DocumentSearchResponse } from "@/lib/common";
import { getDocumentsCount } from "@/lib/get-documents-count";
import { texts } from "@/lib/texts";
import { getCleanedMetadata } from "@/lib/utils";
import { useEffect, useState } from "react";
import SearchResultSection from "../search-result-section";
import DocumentLoadingSkeleton from "./document-loading-skeleton";

type SourcesProps = {
	searchResult: DocumentSearchResponse | null;
	searchIsLoading: boolean;
};

const formatter = new Intl.NumberFormat("de-DE");

function Sources(props: SourcesProps): JSX.Element {
	const [numVisibleMatches, setNumVisibleMatches] = useState(3);

	const [documentsCount, setDocumentsCount] = useState("");
	const { searchResult, searchIsLoading } = props;
	const matches = searchResult?.documentMatches ?? [];

	useEffect(() => {
		getDocumentsCount().then((count) =>
			setDocumentsCount(`${formatter.format(count) || ""}`),
		);
	}, []);

	return (
		<div className="max-w-3xl mx-auto pb-12">
			<h5 className="text-lg ml-4 mb-2">
				{searchIsLoading &&
					`${documentsCount} ${texts.documentsAreLoading}.`.trim()}
				{!searchIsLoading &&
					searchResult &&
					searchResult.documentMatches.length > 0 &&
					texts.documentsTitle}
			</h5>
			{searchIsLoading && <DocumentLoadingSkeleton />}
			{!searchIsLoading && matches.length > 0 && (
				<div>
					<div data-testid="document-references" className="space-y-4">
						{matches
							.sort((l, r) => {
								const lm = getCleanedMetadata(l);
								const rm = getCleanedMetadata(r);
								return lm.similarity < rm.similarity ? 1 : -1;
							})
							.slice(0, numVisibleMatches)
							.map((documentMatch) => {
								return (
									<SearchResultSection
										key={documentMatch.registered_document.id}
										documentMatch={documentMatch}
									/>
								);
							})}
					</div>
					{numVisibleMatches < matches.length && (
						<div className="flex flex-row justify-center w-full p-4">
							<button
								onClick={() =>
									setNumVisibleMatches(
										Math.min(numVisibleMatches + 5, matches.length),
									)
								}
								className="underline text-blue-500 hover:text-blue-700"
							>
								{texts.showMoreDocuments}
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Sources;
