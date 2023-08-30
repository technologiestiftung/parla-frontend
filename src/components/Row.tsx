"use client";
import React from "react";
export function Row({
	additionalClassNames,
	children,
}: {
	additionalClassNames?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={`"flex flex-row justify-start items-start max-w-1/2 mx-4 my-4 text-left"
	 ${additionalClassNames ? additionalClassNames : ""}`}
		>
			{" "}
			{children}
		</div>
	);
}
