import { Link } from "../Link";

interface TypeformLinkProps {
	question: string | undefined;
	linkText: string;
}

function TypeformLink({ question, linkText }: TypeformLinkProps): JSX.Element {
	const url = "https://citylabberlin.typeform.com/to/kCdnCgvC#product_id=parla";
	return (
		<div className="text-center text-sm">
			{question}
			<Link href={url}>{linkText}</Link>
		</div>
	);
}

export default TypeformLink;
