import Link, { LinkProps } from "next/link";
import { DOMAttributes, FC } from "react";
import { cn } from "@/lib/utils";
import { useTexts } from "@/lib/hooks/use-texts";
import { Arrow } from "./icons/arrow";

type BackButtonPropsType =
	| {
			onClick: DOMAttributes<HTMLButtonElement>["onClick"];
	  }
	| {
			href: LinkProps["href"];
	  };

export const BackButton: FC<BackButtonPropsType> = (props) => {
	const texts = useTexts();
	const content = (
		<>
			<Arrow orientation="left" className="scale-75" />
			<span className="font-bold text-lg">{texts?.backText}</span>
		</>
	);
	const commonProps = {
		className: cn(
			`flex gap-2 p-3 items-center`,
			`transition-colors hover:text-primary`,
			`focus:outline-none focus:ring-2 focus:ring-primary`,
			`focus:ring-offset-2 focus:ring-offset-white`,
		),
		"aria-label": texts?.backText,
	};
	const isLink = "href" in props && typeof props.href !== undefined;
	const isButton = "onClick" in props && typeof props.onClick !== undefined;
	return (
		<div className="p-2 sticky bg-white top-0 z-20">
			{isLink && !isButton && (
				<Link {...commonProps} {...props} href={props.href || ""}>
					{content}
				</Link>
			)}
			{isButton && !isLink && (
				<button onClick={props.onClick} {...commonProps}>
					{content}
				</button>
			)}
		</div>
	);
};
