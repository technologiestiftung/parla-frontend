import { cn } from "@/lib/utils";
import NextLink from "next/link";
import React from "react";

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
	href: string;
	children: React.ReactNode;
}

export function Link({ children, className, ...rest }: LinkProps) {
	const isExternal = rest.href.startsWith("http");
	const classes = cn(
		"underline text-blue-700 hover:text-blue-900",
		"focus-visible:outline-none focus-visible:rounded-sm",
		"focus-visible:ring-2 focus-visible:ring-blue-700",
		"focus-visible:ring-offset-4 focus-visible:ring-offset-white",
		className,
	);
	if (isExternal) {
		return (
			<a target="_blank" rel="noreferrer" className={classes} {...rest}>
				{children}
			</a>
		);
	}
	return (
		<NextLink {...rest} className={classes}>
			{children}
		</NextLink>
	);
}
