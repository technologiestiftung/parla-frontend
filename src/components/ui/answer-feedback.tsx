import { CopyToClipboardButton } from "@/components/ui/copy-to-clipboard-button";

export function AnswerFeedback({ generatedAnswer }: { generatedAnswer: string }) {

	return <div className="flex justify-between w-full px-4 pt-2">
		<p>Placeholder</p>
		<CopyToClipboardButton generatedAnswer={generatedAnswer} />
	</div>
}