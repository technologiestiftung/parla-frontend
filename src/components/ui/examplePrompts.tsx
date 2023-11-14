import React, { MouseEvent, ReactNode } from "react";
import { Button } from "./button";

type ExamplePromptsProps = {
	examplePrompts: string[];
	onClick: (prompt: string) => void;
};

function ExamplePrompts(props: ExamplePromptsProps): ReactNode {
	const examples = props.examplePrompts || [];
	return (
		<div className="max-w-xl mx-auto pt-3">
			<h4 className="font-bold mb-3">Beispiele</h4>
			<div className="flex flex-col gap-px bg-slate-200 border border-slate-200 relative rounded w-[calc(100%+2rem)] -ml-4">
				{examples.map((example) => (
					<Button
						key={example}
						onClick={(evt) => props.onClick(example)}
						className={[
							"block whitespace-normal h-auto px-4 py-3 text-base rounded-none",
							"text-blue-700 hover:text-white text-left bg-white hover:bg-blue-900",
							"hover:rounded relative focus-visible:z-10 focus-visible:rounded-sm",
							"first-of-type:rounded-t last-of-type:rounded-b",
						]
							.filter(Boolean)
							.join(" ")}
					>
						{example}
					</Button>
				))}
			</div>
		</div>
	);
}

export default ExamplePrompts;
