import { DocumentSearchResponse } from "@/lib/common";
import React, { ReactNode, useEffect, useState } from "react";
import SearchResultSection from "../SearchResultSection";
import AnswerLoadingSkeleton from "./textLoadingSkeleton";
import DocumentLoadingSkeleton from "./documentLoadingSkeleton";
import ReactMarkdown from "react-markdown";
import { cn, getCleanedMetadata } from "@/lib/utils";
import { getDocumentsCount } from "@/lib/get-documents-count";
import { texts } from "@/lib/texts";

type SourcesProps = {
	searchResult: DocumentSearchResponse | null;
	searchIsLoading: boolean;
};

const formatter = new Intl.NumberFormat("de-DE");

function Sources(props: SourcesProps): ReactNode {
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
		<div className="max-w-2xl mx-auto space-y-4">
			<h5 className="text-lg mt-4 ml-4">
				{searchIsLoading &&
					`${documentsCount} ${texts.documentsAreLoading}.`.trim()}
				{!searchIsLoading && searchResult && texts.documentsTitle}
			</h5>
			{searchIsLoading && <DocumentLoadingSkeleton />}
			{!searchIsLoading && matches.length > 0 && (
				<div className="space-y-3">
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
