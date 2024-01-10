import React from "react";

function TextLoadingSkeleton({ linesCount = 10, animate = true }) {
	const offsets = [30, 20, 40, 30, 50, 40, 20, 10, 30, 20];
	return (
		<div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-md">
			{[...Array(linesCount)].map((_, i) => {
				const offset = offsets[i % offsets.length];
				return (
					<span
						key={i}
						className={`${
							animate ? "animate-bounce" : ""
						} bg-slate-200 h-3 block`}
						style={{
							animationDelay: `${i * 40}ms`,
							width: `calc(100% - ${offset}px)`,
						}}
					/>
				);
			})}
		</div>
	);
}

export default TextLoadingSkeleton;
