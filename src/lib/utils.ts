import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResponseDocumentMatch } from "./common";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

function parseDate(input: string) {
	var parts = input.match(/(\d+)/g);
	if (parts === null) {
		return "";
	}
	return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
}

export function getCleanedMetadata(
	documentMatch: ResponseDocumentMatch | undefined,
) {
	const regDoc = documentMatch?.registered_document;
	const proDoc = documentMatch?.processed_document_summary_match;
	const metadata =
		typeof regDoc?.metadata === "object" && regDoc.metadata !== null
			? regDoc.metadata
			: {};
	const type = regDoc?.source_type;
	const schriftlicheAnfrageTitle =
		"Titel" in metadata && Array.isArray(metadata.Titel)
			? `${metadata.Titel[0]}`
			: undefined;
	const hauptAusschussProtokollTitle =
		"title" in metadata && typeof metadata.title === "string"
			? `${metadata.title}`
			: undefined;
	const title =
		type === "Hauptausschussprotokoll"
			? hauptAusschussProtokollTitle
			: schriftlicheAnfrageTitle;
	const tags = Array.from(
		new Set(proDoc?.processed_document_summary?.tags ?? []).values(),
	);

	const pdfUrl = regDoc?.source_url;
	const documentName =
		type === "Webseite"
			? "title" in metadata &&
				typeof metadata.title === "string" &&
				metadata.title
			: pdfUrl?.split("/").slice(-1)[0];
	const pages = documentMatch?.processed_document_chunk_matches
		.map((c) => c.processed_document_chunk.page + 1) // page is 0-based
		.sort();
	const similarity = documentMatch?.similarity ?? 0;

	const documentDate =
		"DokDat" in metadata && Array.isArray(metadata.DokDat)
			? metadata.DokDat[0]
			: "";

	const dateFromTitle =
		type === "Hauptausschussprotokoll"
			? title?.match(/\d{2}\.\d{2}\.\d{4}/)?.[0]
			: "";

	const formattedDate = parseDate(
		String(documentDate ? documentDate : dateFromTitle),
	).toLocaleString("de-DE", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return {
		title: title?.replace(/<\/?[^>]+(>|$)/g, " ∙ "),
		pdfUrl,
		documentName,
		pages,
		similarity,
		type,
		tags,
		formattedDate,
	};
}

export function selectRandomItems<T>(arr: T[], numItems: number): T[] {
	if (numItems >= arr.length) {
		return arr;
	}
	const result: T[] = [];
	const arrCopy = arr.slice();
	for (let i = 0; i < numItems; i++) {
		const randomIndex = Math.floor(Math.random() * arrCopy.length);
		const selectedItem = arrCopy.splice(randomIndex, 1)[0];
		result.push(selectedItem);
	}
	return result;
}
