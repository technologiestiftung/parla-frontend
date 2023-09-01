import React from "react";

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
	href: string;
	children: React.ReactNode;
}

export function Link({ children, ...rest }: LinkProps) {
	return (
		<a
			target="_blank"
			rel="noreferrer"
			className="underline text-blue-700 hover:text-blue-900"
			{...rest}
		>
			{children}
		</a>
	);
}
