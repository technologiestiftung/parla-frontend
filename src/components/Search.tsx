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

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setLoading(true);
		if (query.length === 0) {
			setLoading(false);
			setErrors(new Error("no query provided"));
			return;
		}
		fetch(`/vector-search`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setResult(data);
				console.log(data);
				setLoading(false);
			});
		return false;
	}

	return (
		<main>
			<div className="row">
				<div className="col">
					<h1>Search</h1>
					<form onSubmit={handleSubmit}>
						<input
							ref={inputRef}
							type="text"
							placeholder="Search"
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button type="submit">Search</button>
					</form>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<h2>Results</h2>
					{loading && "Loading..."}
					{result && <>{result?.json?.choices[0].message.content}</>}
					{errors && <>{errors.message}</>}
				</div>
			</div>
		</main>
	);
}
