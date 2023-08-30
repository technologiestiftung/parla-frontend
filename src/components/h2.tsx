"use client";
import React from "react";

export function H2({ message }: { message: string }) {
	return <h2 className="text-2xl py-2 pt-8 text-left">{message}</h2>;
}
