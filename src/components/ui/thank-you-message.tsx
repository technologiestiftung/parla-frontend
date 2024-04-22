import { texts } from "@/lib/texts";
import { useEffect, useState } from "react";

const transitionDurationInMs = 500;
const transitionSafetyBufferInMs = 100;
const transitionDurationWithSafetyBufferInMs =
	transitionDurationInMs + transitionSafetyBufferInMs;

export function ThankYouMessage({
	isThankYouMessageVisible,
}: {
	isThankYouMessageVisible: boolean;
}) {
	const [opacity, setOpacity] = useState(0);
	const [isComponentInsideDOM, setIsComponentInsideDOM] = useState(false);

	useEffect(() => {
		/**
		 * if the thank-you message appears (isThankYouMessageVisible === true),
		 * first add the element to the DOM,
		 * and only after a safety buffer of 100ms
		 * make it visible via opacity-transition (from 0 to 1)
		 */
		if (isThankYouMessageVisible) {
			setIsComponentInsideDOM(true);

			const timeoutId = setTimeout(
				() => setOpacity(1),
				transitionSafetyBufferInMs,
			);

			return () => clearTimeout(timeoutId);
		}

		/**
		 * if the thank-you message disappears (isThankYouMessageVisible === false),
		 * first make it invisible via opacity-transition (from 1 to 0)
		 * and only after the transition is done (500ms + 100ms safety buffer)
		 * remove the element to the DOM
		 */
		setOpacity(0);

		const timeoutId = setTimeout(
			() => setIsComponentInsideDOM(false),
			transitionDurationWithSafetyBufferInMs,
		);

		return () => clearTimeout(timeoutId);
	}, [isThankYouMessageVisible]);

	return (
		<>
			{isComponentInsideDOM && (
				<div className={`flex w-full justify-center`}>
					<div
						className={`shadow-md rounded-lg p-4 mx-4 bg-white w-fit`}
						style={{
							/**
							 * We need to use individual inline styles here because of a safari bug:
							 * https://stackoverflow.com/questions/21767037/css-transitions-not-working-in-safari
							 */
							opacity,
							transitionProperty: "opacity",
							transitionDuration: `${transitionDurationInMs}ms`,
							transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
						}}
					>
						{texts.answerThankYou}
					</div>
				</div>
			)}
		</>
	);
}
