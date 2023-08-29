"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export function Label({ title, text }: { text: string; title: string }) {
	return (
		<label className="py-2 pt-4" htmlFor="num_probes">
			{text}
			<FontAwesomeIcon
				size="xs"
				icon={faExclamationCircle}
				className="text-gray-400 ml-2"
				title={title}
			/>
		</label>
	);
}
