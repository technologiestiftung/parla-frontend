import { FeedbackType } from "@/lib/common";
import { getAllFeedbacks } from "@/lib/get-all-feedbacks";
import { useHistoryStore } from "@/lib/hooks/localStorage";
import { saveUserFeedback } from "@/lib/save-user-feedback";
import { texts } from "@/lib/texts";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CopyToClipboardButton } from "./copy-to-clipboard-button";
import { ThumbsDownIcon } from "./icons/thumbs-down";
import { ThumbsDownSolidIcon } from "./icons/thumbs-down-solid";
import { ThumbsUpIcon } from "./icons/thumbs-up";
import { ThumbsUpSolidIcon } from "./icons/thumbs-up-solid";

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
	const requestId = usePathname().split("/").slice(-1)[0];
	const [allFeedbacks, setAllFeedbacks] = useState(Array<FeedbackType>);

	const { resultHistory, setResultHistory } = useHistoryStore();

	useEffect(() => {
		const abortController = new AbortController();
		const loadData = async () => {
			setAllFeedbacks(await getAllFeedbacks(abortController.signal));
		};
		loadData();

		const userRequestHistory = resultHistory.find(
			(entry) => entry.id === requestId,
		);
		const feedbackIdHistory = userRequestHistory?.feedbackId;

		if (requestId) {
			switch (feedbackIdHistory) {
				case 1:
					setIsThumbsUpClicked(true);
					setIsThumbsDownClicked(false);
					break;
				case 2:
				case 3:
				case 4:
				case 5:
					setIsThumbsDownClicked(true);
					setIsThumbsUpClicked(false);
					break;
				default:
					setIsThumbsUpClicked(false);
					setIsThumbsDownClicked(false);
					break;
			}
		}

		return () => abortController.abort();
	}, [resultHistory, requestId]);

	const showThenHideThankYouMessage = () => {
		setIsThankYouMessageVisible(true);
		setTimeout(() => {
			setIsThankYouMessageVisible(false);
		}, 2000);
	};

	const onThumbsDownClick = () => {
		setIsThumbsUpClicked(false);
		setIsThumbsDownClicked(true);
		setAreTagsVisible(true);
	};

	const onThumbsUpClick = async () => {
		setIsThumbsDownClicked(false);
		setAreTagsVisible(false);
		setIsThumbsUpClicked(true);

		await saveUserFeedback({ userRequestId: requestId, feedbackId: 1 });
		setResultHistory(
			resultHistory.map((userRequest) => {
				if (userRequest.id === requestId) {
					const updated = { ...userRequest, feedbackId: 1 };
					return updated;
				}
				return userRequest;
			}),
		);

		showThenHideThankYouMessage();
	};

	const onTagClick = async (e: any, id: number) => {
		setSelectedTag(e.target.value);

		await saveUserFeedback({ userRequestId: requestId, feedbackId: id });

		setResultHistory(
			resultHistory.map((userRequest) => {
				if (userRequest.id === requestId) {
					return { ...userRequest, feedbackId: id };
				}
				return userRequest;
			}),
		);

		setTimeout(() => {
			setAreTagsVisible(false);
			showThenHideThankYouMessage();
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
						>
							{isThumbsUpClicked ? <ThumbsUpSolidIcon /> : <ThumbsUpIcon />}
						</button>
						<button
							onClick={onThumbsDownClick}
							className={`px-1 text-slate-500 hover:text-parla-blue 
							${isThumbsDownClicked ? "disabled:text-parla-blue" : "disabled:text-slate-500"} 
							${isThumbsDownClicked /*&& isTagDisabled*/ ? "disabled:text-slate-500" : ""} `}
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
							className={`rounded-lg border border-slate-300 p-2 cursor-pointer 
							${selectedTag === feedback.tag ? "bg-parla-blue hover:bg-parla-blue text-white" : "hover:bg-slate-50"}`}
						>
							<input
								type="radio"
								name="tag"
								onChange={(e) => onTagClick(e, feedback.id)}
								key={feedback.id}
								value={feedback.tag ?? ""}
								className="hidden peer"
							/>
							{feedback.tag && feedback.tag}
						</label>
					))}
				</div>
			</Transition>

			<Transition
				show={isThankYouMessageVisible}
				enter="transition-opacity duration-700"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-500"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				className={`flex self-center rounded-lg shadow-md p-4 mx-4 bg-white w-fit`}
			>
				{texts.answerThankYou}
			</Transition>
		</div>
	);
}
