import { texts } from "@/lib/texts";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { ThumbsUpIcon } from "./icons/thumbs-up";
import { ThumbsDownIcon } from "./icons/thumbs-down";
import { ThumbsDownSolidIcon } from "./icons/thumbs-down-solid";
import { ThumbsUpSolidIcon } from "./icons/thumbs-up-solid";
import { Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { CopyToClipboardButton } from "./copy-to-clipboard-button";
import { usePathname } from "next/navigation";
import { saveUserFeedback } from "@/lib/save-user-feedback";
import { getAllFeedbacks } from "@/lib/get-all-feedbacks";
import { FeedbackType } from "@/lib/common";

export function AnswerFeedback({
	generatedAnswer,
}: {
	generatedAnswer: string;
}) {
	const [isThumbsUpClicked, setIsThumbsUpClicked] = useState(false);
	const [isThumbsDownClicked, setIsThumbsDownClicked] = useState(false);
	const [isThankYouMessageVisible, setIsThankYouMessageVisible] =
		useState(false);
	const [areTagsVisible, setAreTagsVisible] = useState(false);
	const [selectedTag, setSelectedTag] = useState(null);
	const [isTagDisabled, setIsTagDisabled] = useState(false);

	const requestId = usePathname().split("/").slice(-1)[0];

	const [allFeedbacks, setAllFeedbacks] = useState(Array<FeedbackType>);

	useEffect(() => {
		const loadData = async () => {
			setAllFeedbacks(await getAllFeedbacks());
		};
		loadData();
	}, []);

	const onThumbsDownClick = () => {
		setIsThumbsDownClicked(true);
		setAreTagsVisible(true);
	};

	const onThumbsUpClick = () => {
		saveUserFeedback({ userRequestId: requestId, feedbackId: 1 });
		setIsThumbsUpClicked(true);
		setIsThankYouMessageVisible(true);
	};

	const onTagClick = (e: any, id: number) => {
		setSelectedTag(e.target.value);
		saveUserFeedback({ userRequestId: requestId, feedbackId: id });
		setTimeout(() => {
			setAreTagsVisible(false);
			setIsThankYouMessageVisible(true);
			setIsTagDisabled(true);
		}, 1000);
	};

	return (
		<div className="flex justify-between w-full pt-4 flex-col gap-4">
			<div
				tabIndex={0}
				className={cn(
					`rounded-lg text-md w-full text-slate-500 flex justify-between px-4 `,
				)}
			>
				<div className="flex flex-row flex-wrap justify-start">
					{texts.answerFeedback}
					<div className="flex sm:mx-2 my-2 sm:my-0">
						<button
							onClick={onThumbsUpClick}
							className={`px-1 text-slate-500 hover:text-parla-blue disabled:hover:text-slate-500`}
							disabled={isThumbsUpClicked || isThumbsDownClicked}
						>
							{isThumbsUpClicked ? <ThumbsUpSolidIcon /> : <ThumbsUpIcon />}
						</button>
						<button
							onClick={onThumbsDownClick}
							className={`px-1 text-slate-500 hover:text-parla-blue 
							${isThumbsDownClicked ? "disabled:text-parla-blue" : "disabled:text-slate-500"} 
							${isThumbsDownClicked && isTagDisabled ? "disabled:text-slate-500" : ""} `}
							disabled={isThumbsDownClicked || isThumbsUpClicked}
						>
							{isThumbsDownClicked ? (
								<ThumbsDownSolidIcon />
							) : (
								<ThumbsDownIcon />
							)}
						</button>
					</div>
				</div>
				<div className="self-start pt-1 sm:pt-0">
					<CopyToClipboardButton generatedAnswer={generatedAnswer} />
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
				<div className="flex flex-wrap gap-x-6 gap-y-4 py-4 pointer-events-">
					{allFeedbacks.slice(1).map((feedback) => (
						<label
							key={feedback.id}
							className={`rounded-lg border border-slate-300 p-2 
							${selectedTag === feedback.tag ? "bg-parla-blue hover:bg-parla-blue text-white" : "hover:bg-slate-50"}`}
						>
							<input
								type="radio"
								name="tag"
								onChange={(e) => onTagClick(e, feedback.id)}
								key={feedback.id}
								value={feedback.tag ?? ""}
								className="hidden peer"
								disabled={isTagDisabled}
							/>
							{feedback.tag && feedback.tag}
						</label>
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
}
