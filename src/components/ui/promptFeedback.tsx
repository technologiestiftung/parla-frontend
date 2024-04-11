import { texts } from "@/lib/texts";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ThumbsUpIcon } from "./icons/thumbs-up";
import { ThumbsDownIcon } from "./icons/thumbs-down";
import { ThumbsDownSolidIcon } from "./icons/thumbs-down-solid";
import { ThumbsUpSolidIcon } from "./icons/thumbs-up-solid";
import { Transition } from "@headlessui/react";

const PromptFeedback: React.FC = () => {
	const [isThumbsUpClicked, setIsThumbsUpClicked] = useState(false);
	const [isThumbsDownClicked, setIsThumbsDownClicked] = useState(false);
	const [isThankYouMessageVisible, setIsThankYouMessageVisible] =
		useState(false);

	const onThumbsDownClick = () => {
		setIsThumbsDownClicked(true);
	};

	const onThumbsUpClick = () => {
		setIsThumbsUpClicked(true);
		setTimeout(() => {
			setIsThankYouMessageVisible(true);
		}, 700);
	};

	return (
		<div className="flex justify-between w-full px-4 pt-4 flex-col gap-4">
			<div
				tabIndex={0}
				className={cn(
					`leading-6 rounded-lg text-md w-full text-slate-500 flex justify-start`,
				)}
			>
				{texts.answerFeedback}
				<div className="flex ml-2 ">
					<button
						onClick={onThumbsUpClick}
						className={`px-1 hover:text-parla-blue disabled:fill-slate-500 disabled:hover:text-slate-500`}
						disabled={isThumbsUpClicked || isThumbsDownClicked}
					>
						{isThumbsUpClicked ? <ThumbsUpSolidIcon /> : <ThumbsUpIcon />}
					</button>
					<button
						onClick={onThumbsDownClick}
						className={`px-1 hover:text-parla-blue disabled:fill-slate-500 disabled:hover:text-slate-500`}
						disabled={isThumbsDownClicked || isThumbsUpClicked}
					>
						{isThumbsDownClicked ? <ThumbsDownSolidIcon /> : <ThumbsDownIcon />}
					</button>
				</div>
			</div>
			<Transition
				show={isThankYouMessageVisible}
				enter="transition-opacity duration-500"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				className={`flex self-center rounded-lg shadow-md p-4 bg-white w-fit`}
			>
				{texts.answerThankYou}
			</Transition>
		</div>
	);
};

export default PromptFeedback;
