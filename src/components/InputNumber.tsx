"use client";
import React from "react";
import type { FormValues } from "./Search";

export function InputNumber({
	value,
	step,
	name,
	id,
	min,
	max,
	handleInputChange,
}: {
	value: number;

	min: string;
	max: string;
	step?: string;
	id: string;
	name: string;

	handleInputChange: (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => void;
}) {
	return (
		<input
			className="border border-gray-400 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			type="number"
			id={id}
			name={name}
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={handleInputChange}
		></input>
	);
}
