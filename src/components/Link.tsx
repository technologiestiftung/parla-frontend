import { cn } from "@/lib/utils";
import React from "react";

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
	href: string;
	children: React.ReactNode;
}

export function Link({ children, className, ...rest }: LinkProps) {
	return (
		<a
			target="_blank"
			rel="noreferrer"
			className={cn(
				"underline text-blue-700 hover:text-blue-900",
				"focus-visible:outline-none focus-visible:rounded-sm",
				"focus-visible:ring-2 focus-visible:ring-blue-500",
				"focus-visible:ring-offset-4 focus-visible:ring-offset-white",
				className,
			)}
			{...rest}
		>
			{children}
		</a>
	);
}
