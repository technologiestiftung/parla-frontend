import { cn } from "@/lib/utils";
import { FC } from "react";

export const Arrow: FC<{
	className?: string;
	orientation?: "right" | "down" | "left" | "up";
}> = ({ className = "", orientation = "right" }) => {
	let ortientationClass = "rotate-0";
	if (orientation === "down") ortientationClass = "rotate-90";
	if (orientation === "left") ortientationClass = "rotate-180";
	if (orientation === "up") ortientationClass = "-rotate-90";
	return (
		<svg
			width="25"
			height="26"
			viewBox="0 0 25 26"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(className, ortientationClass)}
		>
			<g stroke="currentColor" strokeWidth="4" fill="none" fillRule="evenodd">
				<path d="M0 13h21.685M11.426 24l10.617-11L11.426 2" />
			</g>
		</svg>
	);
};
