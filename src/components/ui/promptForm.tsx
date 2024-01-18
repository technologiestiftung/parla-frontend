import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "../icons/SpinnerIcon";

type PromptFormProps = {
	onSubmit: (query: string | null) => void;
	query: string | null;
	isLoading: boolean;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function PromptForm(props: PromptFormProps): JSX.Element {
	const { onSubmit, query, isLoading, onChange } = props;
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [uiInitializing, setUiInitializing] = useState(true);

	useEffect(() => {
		handleInputChange();
		setUiInitializing(false);
		window.addEventListener(
			"resize",
			() => {
				handleInputChange();
			},
			false,
		);
	}, []);

	useEffect(() => {
		handleInputChange();
	}, [query]);

	// See https://stackoverflow.com/questions/2803880/is-there-a-way-to-get-a-textarea-to-stretch-to-fit-its-content-without-using-php for reference
	const handleInputChange = () => {
		const textArea = textAreaRef.current;
		if (textArea) {
			if (!textArea.value || textArea.value === "") {
				textArea.value =
					"Stellen Sie hier Ihre Frage oder wählen Sie eines der Beispiele aus";
				textArea.style.height = ""; // Reset the height to recalculate the scroll height
				textArea.style.height = `${textArea.scrollHeight}px`; // Set the height based on scrollHeight
				textArea.value = "";
			} else {
				textArea.style.height = ""; // Reset the height to recalculate the scroll height
				textArea.style.height = `${textArea.scrollHeight}px`; // Set the height based on scrollHeight
			}
		}
	};

	return (
		<div className={`${uiInitializing ? "opacity-0" : ""}`}>
			<div className="w-full h-0 sm:h-12 mt-2 sm:mt-0 sm:h-6 bg-[#F8FAFC]"></div>
			<form
				onSubmit={(evt) => {
					evt.preventDefault();
					onSubmit(query);
				}}
				className={`relative w-full max-w-3xl mx-auto h-auto`}
				name="promptForm"
			>
				<textarea
					data-testid="prompt-textarea"
					ref={textAreaRef}
					value={query || ""}
					rows={1}
					name="query"
					id="query"
					className="w-full py-4 pl-4 pr-[45px] rounded-md shadow-md shadow-blue-200 resize-none h-auto"
					placeholder="Stellen Sie hier Ihre Frage oder wählen Sie eines der Beispiele aus"
					disabled={isLoading}
					onKeyDown={(event) => {
						if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							onSubmit(query);
						}
					}}
					onChange={(e) => {
						handleInputChange();
						onChange(e);
					}}
				/>
				<button
					className="absolute right-4 top-4 text-white"
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? (
						<Spinner />
					) : (
						<div>
							<MagnifyingGlassIcon
								className="w-6 h-6"
								color="gray"
							></MagnifyingGlassIcon>
						</div>
					)}
				</button>
			</form>
		</div>
	);
}

export default PromptForm;
