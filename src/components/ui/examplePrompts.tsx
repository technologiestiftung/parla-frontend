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
		<div className="max-w-3xl mx-auto pb-12">
			<h5 className="text-lg ml-4 mb-2">Beispiele</h5>
			<div className="space-y-2">
				{examples.map((example, idx) => (
					<div
						data-testid={`example-prompt-${idx}`}
						key={example}
						onClick={(evt) => props.onClick(example)}
						className={[
							"bg-white shadow-md rounded-md block whitespace-normal h-auto px-4 py-3 text-base",
							"sm:hover:text-white sm:hover:bg-blue-900 sm:hover:cursor-pointer",
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
