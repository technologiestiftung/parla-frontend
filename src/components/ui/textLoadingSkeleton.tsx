import React from "react";

function TextLoadingSkeleton({ linesCount = 10, animate = true }) {
	return (
		<div className="flex flex-col gap-2">
			{[...Array(linesCount)].map((_, i) => {
				const widthOffset = Math.floor(Math.random() * 10) * 10;
				console.log(widthOffset);
				return (
					<span
						key={i}
						className={`${
							animate ? "animate-bounce" : ""
						} bg-slate-200 h-3 w-[calc(100%-${widthOffset}px)] block`}
						style={{ animationDelay: `${i * 40}ms` }}
					/>
				);
			})}
		</div>
	);
}

export default TextLoadingSkeleton;
