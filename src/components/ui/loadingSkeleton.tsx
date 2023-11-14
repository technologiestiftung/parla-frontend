import React from "react";

function LoadingSkeletion() {
	return (
		<div className="mt-2 flex flex-col gap-2">
			<span
				className="animate-bounce bg-gray-200 h-3 w-[calc(100%-50px)] block"
				style={{ animationDelay: "0ms" }}
			></span>
			<span
				className="animate-bounce bg-gray-200 h-3 w-[calc(100%-10px)] block"
				style={{ animationDelay: "40ms" }}
			></span>
			<span
				className="animate-bounce bg-gray-200 h-3 w-[calc(100%-40px)] block"
				style={{ animationDelay: "80ms" }}
			></span>
			<span
				className="animate-bounce bg-gray-200 h-3 w-[calc(100%-20px)] block"
				style={{ animationDelay: "120ms" }}
			></span>
			<span
				className="animate-bounce bg-gray-200 h-3 w-[calc(100%-60px)] block"
				style={{ animationDelay: "160ms" }}
			></span>
		</div>
	);
}

export default LoadingSkeletion;