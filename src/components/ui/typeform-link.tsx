import { Link } from "../Link";

interface TypeformLinkProps {
	question: string | undefined;
	linkText: string;
}

export function TypeformLink({
	question,
	linkText,
}: TypeformLinkProps): JSX.Element {
	const url = "https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=parla";

	if (!question) {
		return (
			<div className="text-center text-sm">
				<Link href={url}>{linkText}</Link>
			</div>
		);
	}

	return (
		<div className="text-center text-sm flex flex-row flex-wrap gap-1 items-center justify-center">
			<div className="w-full md:w-auto">{question}</div>
			<Link className={"w-full md:w-auto"} href={url}>
				{linkText}
			</Link>
		</div>
	);
}
