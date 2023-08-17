"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Search.css";
export default function Search() {
	const [result, setResult] = useState<Record<string, unknown> | null>(null);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Error | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// clear the search result on load
	useEffect(() => {
		setResult(null);
		setQuery("");
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	}, []);

	async function vectorSearch(query: string): Promise<void> {
		const response = await fetch(`/api/vector-search`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
			}),
		});
		if (!response.ok) {
			setLoading(false);
			setErrors(new Error("failed to fetch dat avia /api/vector-search"));
			return;
		}
		const json = await response.json();
		setResult(json);
		console.log(json);
		setLoading(false);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrors(null);
		setLoading(true);
		if (query.length === 0) {
			setLoading(false);
			setErrors(new Error("no query provided"));
			return;
		}
		vectorSearch(query).catch((error) => {
			setLoading(false);
			setErrors(error);
			console.error(error);
		});

		return false;
	}

	return (
		<main>
			<div className="row">
				<div className="col">
					{/* <h1 className="text-4xl text-left py-5">Search</h1> */}
					<form onSubmit={handleSubmit}>
						<input
							className="border border-gray-400 rounded-l px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
							ref={inputRef}
							type="text"
							placeholder="Search"
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r"
							type="submit"
						>
							Search
						</button>
					</form>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<h2 className="text-2xl py-2">Results</h2>
					{loading && "Loading..."}
					{/* @ts-ignore */}
					{result && <p>{result?.json?.choices[0].message.content}</p>}
					{errors && <>{errors.message}</>}
				</div>
			</div>
		</main>
	);
}
