import { ResponseDetail } from "@/lib/common";
import React, { ReactNode } from "react";
import SearchResultSection from "../SearchResultSection";

type AnswerProps = {
	answer: ResponseDetail;
};

function Answer(props: AnswerProps): ReactNode {
	const { answer } = props;
	const content = answer.gpt?.choices[0].message.content;
	const sections = answer.sections || [];
	const reportSections = answer.reportSections || [];
	return (
		<div>
			<h3 className="text-lg font-bold">Antwort</h3>
			{content && <p>{content}</p>}
			{sections.map((section) => (
				<SearchResultSection
					key={section.id}
					sectionDocument={section}
					sectionReport={undefined}
				/>
			))}
			{reportSections.map((section) => (
				<SearchResultSection
					key={section.id}
					sectionDocument={undefined}
					sectionReport={section}
				/>
			))}
		</div>
	);
}

export default Answer;
