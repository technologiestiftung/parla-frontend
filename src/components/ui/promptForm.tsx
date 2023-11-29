import React, { FormEventHandler, ReactNode } from "react";
import { Input } from "./input";
import { Button } from "./button";
import Envelope from "./envelopeIcon";
import { cn } from "@/lib/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ReloadIcon } from "@radix-ui/react-icons";
import ErrorHint from "./error-hint";

type PromptFormProps = {
	onSubmit: (query?: string) => void;
	query?: string;
	isLoading: boolean;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	error: boolean;
};

function PromptForm(props: PromptFormProps): ReactNode {
	const { onSubmit, query, isLoading, onChange, error } = props;
	return (
		<div
			className={cn(
				"w-full sticky bottom-0",
				"p-2 lg:px-0 bg-slate-50 border-t border-slate-200 shadow-lg",
			)}
		>
			{error && (
				<div className="relative w-full max-w-xl mx-auto">
					<ErrorHint
						message={
							"Fehler beim Generieren der Antwort. Bitte versuchen Sie es noch einmal."
						}
						reloadHandler={() => {
							onSubmit(query);
						}}
					></ErrorHint>
				</div>
			)}
			<form
				onSubmit={(evt) => {
					evt.preventDefault();
					onSubmit(query);
				}}
				className="relative w-full max-w-xl mx-auto flex"
				name="promptForm"
			>
				<Input
					value={query || ""}
					name="query"
					id="query"
					className="pl-4 py-4 pr-12 resize-none"
					placeholder="Stellen Sie hier Ihre Frage"
					onChange={onChange}
					disabled={isLoading}
					onKeyDown={(event) => {
						if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							onSubmit(query);
						}
					}}
				/>
				<Button
					className="absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-900 text-white font-bold"
					type="submit"
					size="icon"
					disabled={isLoading}
				>
					{isLoading ? <Spinner /> : <Envelope />}
				</Button>
			</form>
		</div>
	);
}

function Spinner() {
	return (
		<svg
			aria-hidden="true"
			role="status"
			className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
			viewBox="0 0 100 101"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor"
			/>
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="#1C64F2"
			/>
		</svg>
	);
}

export default PromptForm;
