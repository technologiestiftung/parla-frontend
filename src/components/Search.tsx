import React, { useState } from "react";
import "./Search.css";

export default function Search() {

	const [result, setResult] = useState<Record<string, unknown> | null>(null);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setLoading(true);
		fetch(`/vector-search`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
			})
		})
			.then(response => response.json())
			.then(data => {
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
					<input type="text" placeholder="Search" onChange={e => setQuery(e.target.value)}/>
					<button type="submit">Search</button>
				</form>

    </div>
			</div>
			<div className="row">
        <div className="col">
					<h2>Results</h2>
						{loading && "Loading..."}
					{result && <>{ result?.json?.choices[0].message.content}</>}


        </div>
      </div>
		</main>
  );
}