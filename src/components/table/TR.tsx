import React from "react";

export function TR({
	withBg = false,
	children,
	additionalClassNames,
}: {
	withBg?: boolean;
	additionalClassNames?: string;
	children?: React.ReactNode;
}) {
	return (
		<tr
			className={` align-top ${withBg ? "bg-blue-100" : ""} ${
				additionalClassNames ? additionalClassNames : ""
			}`}
		>
			{children}
		</tr>
	);
}
