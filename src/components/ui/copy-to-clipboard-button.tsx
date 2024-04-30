import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/ui/icons/check-icon";
import { ClipboardIcon } from "@/components/ui/icons/clipboard-icon";
import { cn } from "@/lib/utils";
import { texts } from "@/lib/texts";

export function CopyToClipboardButton({
	generatedAnswer,
}: {
	generatedAnswer: string;
}) {
	const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(generatedAnswer);
		setIsCopiedToClipboard(true);
	};

	/**
	 * reset icon after 2 seconds
	 */
	useEffect(() => {
		const timeoutId = setTimeout(() => setIsCopiedToClipboard(false), 2000);

		return () => clearTimeout(timeoutId);
	}, [isCopiedToClipboard]);

	return (
		<>
			<button
				data-testid="copy-answer-to-clipboard"
				className={`group text-parla-grey ${isCopiedToClipboard ? "hover:text-parla-black" : "hover:text-parla-blue"}`}
				onClick={copyToClipboard}
			>
				{isCopiedToClipboard ? <CheckIcon /> : <ClipboardIcon />}
				<div className="group-hover:block relative hidden ">
					<div
						className={cn(
							"absolute",
							"top-1.5",
							"left-1/2",
							"-translate-x-1/2",
							"w-[5.5rem]",
							"z-20",
							"bg-parla-grey",
							"text-white",
							"text-center",
							"rounded-xl",
							"text-sm",
							"p-2",
							// the after: classes represent the little tooltip tail
							'after:contents-[""]',
							"after:z-10",
							"after:absolute",
							"after:-top-1",
							"after:left-1/2",
							"after:-ml-1",
							"after:rotate-45",
							"after:border-4",
							"after:border-solid",
							"after:border-parla-grey",
						)}
					>
						{isCopiedToClipboard ? texts.copied : texts.copy}
					</div>
				</div>
			</button>
		</>
	);
}
