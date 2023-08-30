import React from "react";

export function Link({ url, text }: { url: string; text?: string }) {
	return (
		<a
			target="_blank"
			rel="noreferrer"
			href={url}
			className="underline text-blue-700 hover:text-blue-900"
		>
			{text ? text : url}
		</a>
	);
}
