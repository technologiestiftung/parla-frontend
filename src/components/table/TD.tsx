import React from "react";

export function TD({
	children,
	additionalClassNames,
}: {
	additionalClassNames?: string;
	children?: React.ReactNode;
}) {
	return (
		<td
			className={`px-4 py-2 ${
				additionalClassNames ? additionalClassNames : ""
			}`}
		>
			{children}
		</td>
	);
}
