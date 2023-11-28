import { cn } from "@/lib/utils";
import { FC } from "react";

export const Chevron: FC<{
	className?: string;
	orientation?: "right" | "down" | "left" | "up";
}> = ({ className = "", orientation = "right" }) => {
	let ortientationClass = "-rotate-90";
	if (orientation === "down") ortientationClass = "rotate-0";
	if (orientation === "left") ortientationClass = "rotate-90";
	if (orientation === "up") ortientationClass = "-rotate-180";
	return (
		<svg
			width="25"
			height="26"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(className, ortientationClass)}
		>
			<g fill="none" fillRule="evenodd">
				<path
					stroke="currentColor"
					strokeWidth="3"
					d="m24.021 6.405-11 10.616-11-10.616"
				/>
			</g>
		</svg>
	);
};
