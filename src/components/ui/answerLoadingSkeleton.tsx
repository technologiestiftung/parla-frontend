import React from "react";

function AnswerLoadingSkeletion() {
	return (
		<div className="mt-2 flex flex-col gap-3">
			<span
				className="animate-bounce bg-slate-200 h-4 w-[calc(100%-50px)] block"
				style={{ animationDelay: "0ms" }}
			></span>
			<span
				className="animate-bounce bg-slate-200 h-4 w-[calc(100%-10px)] block"
				style={{ animationDelay: "40ms" }}
			></span>
			<span
				className="animate-bounce bg-slate-200 h-4 w-[calc(100%-40px)] block"
				style={{ animationDelay: "80ms" }}
			></span>
			<span
				className="animate-bounce bg-slate-200 h-4 w-[calc(100%-20px)] block"
				style={{ animationDelay: "120ms" }}
			></span>
			<span
				className="animate-bounce bg-slate-200 h-4 w-[calc(100%-60px)] block"
				style={{ animationDelay: "160ms" }}
			></span>
			<span
				className="animate-bounce bg-slate-200 h-4 w-[calc(100%-50px)] block"
				style={{ animationDelay: "200ms" }}
			></span>
			<span
				className="animate-bounce bg-slate-200 h-4 w-[calc(100%-10px)] block"
				style={{ animationDelay: "240ms" }}
			></span>
			<span
				className="animate-bounce bg-slate-200 h-4 w-[calc(100%-40px)] block"
				style={{ animationDelay: "280ms" }}
			></span>
			<span
				className="animate-bounce bg-slate-200 h-4 w-[calc(100%-20px)] block"
				style={{ animationDelay: "320ms" }}
			></span>
			<span
				className="animate-bounce bg-slate-200 h-4 w-[calc(100%-60px)] block"
				style={{ animationDelay: "360ms" }}
			></span>
		</div>
	);
}

export default AnswerLoadingSkeletion;
