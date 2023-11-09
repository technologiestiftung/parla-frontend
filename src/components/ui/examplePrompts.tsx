import React, { MouseEvent, ReactNode } from "react";
import { Button } from "./button";

type ExamplePromptsProps = {
	examplePrompts: string[];
	onClick: (prompt: string) => void;
};

function ExamplePrompts(props: ExamplePromptsProps): ReactNode {
	const examples = props.examplePrompts || [];
	return examples.map((example) => (
		<Button
			key={example}
			onClick={(evt) => props.onClick(example)}
			className="inline whitespace-normal h-auto  p-2 text-sm text-zinc-600 hover:text-zinc-100 max-w-xl mx-auto text-left bg-slate-300 hover:bg-slate-500"
		>
			{example}
		</Button>
	));
}

export default ExamplePrompts;
