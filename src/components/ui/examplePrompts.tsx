type ExamplePromptsProps = {
	examplePrompts: string[];
	onClick: (prompt: string) => void;
};

function ExamplePrompts(props: ExamplePromptsProps): JSX.Element {
	const examples = props.examplePrompts || [];
	if (examples.length === 0) {
		return <div></div>;
	}
	return (
		<div className="max-w-3xl mx-auto">
			<h4 className="font-large mb-3 pl-4">Beispiele</h4>
			<div className="space-y-2">
				{examples.map((example) => (
					<div
						key={example}
						onClick={(evt) => props.onClick(example)}
						className={[
							"bg-white shadow-md rounded-md block whitespace-normal h-auto px-4 py-3 text-base",
							"hover:text-white hover:bg-blue-900 hover:cursor-pointer",
							"relative focus-visible:z-10 focus-visible:rounded-sm",
						]
							.filter(Boolean)
							.join(" ")}
					>
						{example}
					</div>
				))}
			</div>
		</div>
	);
}

export default ExamplePrompts;
