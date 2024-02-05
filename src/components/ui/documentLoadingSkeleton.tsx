import React from "react";
import { AcrobatIcon } from "./acrobat-icon";
import TextLoadingSkeleton from "./textLoadingSkeleton";

function DocumentLoadingSkeletonItem({
	delay,
	tagsCount,
}: {
	delay: string;
	tagsCount: number;
}) {
	return (
		<div
			className="bg-white p-4 rounded-lg shadow-md animate-pulse"
			aria-hidden="true"
			style={{ animationDelay: delay }}
		>
			<div className="flex gap-2 justify-between items-center relative">
				<span className="flex gap-x-2 flex-wrap items-center text-sm sm:text-base">
					<span className="h-4 w-24 rounded bg-slate-200" />
					<span className="text-slate-200 hidden sm:inline" aria-hidden="true">
						∙
					</span>
					<span className="no-underline flex gap-1 items-center flex-wrap">
						<span className="h-4 w-24 rounded bg-slate-200" />
					</span>
				</span>
				<span className="h-3 w-24 rounded bg-slate-200 inline-block" />
			</div>

			<span className="w-3/4 inline-block h-5 rounded bg-slate-200 mt-2 sm:mt-1 mb-3" />

			<TextLoadingSkeleton linesCount={4} animate={false} />

			<div className="flex gap-x-2 gap-y-1 flex-wrap mt-3">
				{Array(tagsCount)
					.fill(0)
					.map((_, idx) => (
						<span
							className="px-2 py-0.5 bg-slate-200 w-10 h-5 rounded-full"
							key={idx}
						/>
					))}
			</div>
		</div>
	);
}

function DocumentLoadingSkeleton() {
	const tagsCounts = [3, 2, 5];
	return (
		<div data-testid="documents-loading-skeleton" className="w-100 space-y-4">
			{Array(3)
				.fill(0)
				.map((_item, idx) => (
					<DocumentLoadingSkeletonItem
						key={idx}
						delay={`${(idx + 1) * 200}ms`}
						tagsCount={tagsCounts[idx]}
					/>
				))}
		</div>
	);
}

export default DocumentLoadingSkeleton;
