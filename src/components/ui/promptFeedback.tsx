import { texts } from "@/lib/texts";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ThumbsUpIcon } from "./icons/thumbs-up";
import { ThumbsDownIcon } from "./icons/thumbs-down";
import { ThumbsDownSolidIcon } from "./icons/thumbs-down-solid";
import { ThumbsUpSolidIcon } from "./icons/thumbs-up-solid";
import { Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";

const PromptFeedback: React.FC = () => {
	const [isThumbsUpClicked, setIsThumbsUpClicked] = useState(false);
	const [isThumbsDownClicked, setIsThumbsDownClicked] = useState(false);
	const [isThankYouMessageVisible, setIsThankYouMessageVisible] =
		useState(false);
	const [areTagsVisible, setAreTagsVisible] = useState(false);
	let [selectedTag, setSelectedTag] = useState(null as number | null);

	const onThumbsDownClick = () => {
		setIsThumbsDownClicked(true);
		setAreTagsVisible(true);
	};

	const onThumbsUpClick = () => {
		setIsThumbsUpClicked(true);
		setIsThankYouMessageVisible(true);
	};

	const onTagClick = (idx: number) => {
		setSelectedTag(idx);
		setTimeout(() => {
			setAreTagsVisible(false);
			setIsThankYouMessageVisible(true);
		}, 1000);
	};

	return (
		<div className="flex justify-between w-full pt-4 flex-col gap-4">
			<div
				tabIndex={0}
				className={cn(
					`leading-6 mx-4 rounded-lg text-md w-full text-slate-500 flex justify-start`,
				)}
			>
				<div className="flex flex-row">{texts.answerFeedback} </div>
				<div className="flex ml-2">
					<button
						onClick={onThumbsUpClick}
						className={`px-1 text-slate-500 hover:text-parla-blue disabled:hover:text-slate-500`}
						disabled={isThumbsUpClicked || isThumbsDownClicked}
					>
						{isThumbsUpClicked ? <ThumbsUpSolidIcon /> : <ThumbsUpIcon />}
					</button>
					<button
						onClick={onThumbsDownClick}
						className={`px-1 text-slate-500 hover:text-parla-blue ${isThumbsDownClicked ? "disabled:text-parla-blue" : "disabled:text-slate-500"}  `}
						disabled={isThumbsDownClicked || isThumbsUpClicked}
					>
						{isThumbsDownClicked ? <ThumbsDownSolidIcon /> : <ThumbsDownIcon />}
					</button>
				</div>
			</div>

			<Transition
				show={areTagsVisible}
				enter="transition-opacity duration-500"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				className={`flex flex-col self-center rounded-lg shadow-md p-4 bg-white w-full`}
			>
				<span className="flex flex-row justify-between">
					{texts.answerTellUsMore}{" "}
					<button onClick={() => setAreTagsVisible(false)}>
						<XIcon className="text-slate-500 hover:text-slate-700 w-5" />
					</button>
				</span>
				<div className="flex flex-wrap gap-x-6 gap-y-4 py-4">
					{texts?.answerTags.map((tag, idx) => (
						<button
							onClick={() => onTagClick(idx)}
							key={idx}
							className={`rounded-lg border border-slate-300 p-2 hover:bg-slate-50
                            ${selectedTag === idx ? "bg-parla-blue hover:bg-parla-blue text-white" : ""}`}
							disabled={!areTagsVisible}
						>
							{tag}
						</button>
					))}
				</div>
			</Transition>

			<Transition
				show={isThankYouMessageVisible}
				enter="transition-opacity duration-500"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				className={`flex self-center rounded-lg shadow-md p-4 mx-4 bg-white w-fit`}
			>
				{texts.answerThankYou}
			</Transition>
		</div>
	);
};

export default PromptFeedback;
