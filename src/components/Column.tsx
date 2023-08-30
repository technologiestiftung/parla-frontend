"use client";
import React from "react";
export function Column({
	additionalClassNames,
	children,
}: {
	additionalClassNames?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={`"flex flex-col justify-start items-start max-w-full text-left"
	 ${additionalClassNames ? additionalClassNames : ""}`}
		>
			{" "}
			{children}
		</div>
	);
}
