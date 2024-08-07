"use client";
import { BackButton } from "@/components/ui/back-button";
import { Footer } from "@/components/ui/footer";
import { LegalFooter } from "@/components/ui/legal-footer";
import { useTexts } from "@/lib/hooks/use-texts";
import { cn } from "@/lib/utils";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
// Using default export to satisfy Next.js to use this component to render the page
export default function Faq() {
	return (
		<Suspense>
			<Info />
		</Suspense>
	);
}

const Info = () => {
	const texts = useTexts();
	const searchParams = useSearchParams();
	const isExpanded = searchParams.get("expand") === "all";

	return (
		<>
			<div className="min-h-screen mx-auto max-w-3xl">
				<BackButton href="/" />
				<div className={cn("p-5 md:p-8 flex flex-col gap-8 md:pt-[5vmin]")}>
					<h1 className={cn("text-2xl font-bold")}>
						{texts?.about.title || ""}
					</h1>
					<ReactMarkdown>{texts?.about.content || ""}</ReactMarkdown>
					<div>
						<h2 className="text-xl font-bold">{texts?.faq.title || ""}</h2>
						<ul
							className={cn(
								`prose prose-p:text-black prose-li:pl-0 prose-li:mt-4 prose-headings:font-bold`,
								`prose-p:mt-2 prose-p:mb-8 w-[calc(100%+1.5rem)] -ml-3`,
							)}
							aria-label="FAQ Questions"
						>
							{(texts?.faq.questions || []).map(({ question, answer }, idx) => {
								return (
									<Disclosure
										as="li"
										key={question}
										aria-label="FAQ Question"
										className="w-full"
										defaultOpen={isExpanded}
									>
										{({ open }) => (
											<>
												<Disclosure.Button
													aria-label="Toggle FAQ Answer"
													className={cn(
														`text-black text-left font-bold text-lg cursor-pointer`,
														`hover:bg-blue-900 hover:text-white group`,
														`focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-white`,
														`w-full px-3 py-2 rounded transition-colors grid grid-cols-[1fr,auto] items-center`,
														`gap-4 flex justify-between`,
													)}
												>
													{question}
													<div className="text-blue-700 group-hover:text-white transition-colors">
														{open ? (
															<ChevronDownIcon className="w-8 h-8"></ChevronDownIcon>
														) : (
															<ChevronRightIcon className="w-8 h-8"></ChevronRightIcon>
														)}
													</div>
												</Disclosure.Button>
												<Disclosure.Panel
													aria-label="FAQ Answer"
													className={cn(
														!open && "hidden",
														`px-4 mt-0 text-base`,
														`prose prose-p:text-black prose-li:pl-0 prose-li:mt-4 prose-headings:font-bold`,
														`prose-p:mt-2 prose-p:mb-8`,
													)}
												>
													<ReactMarkdown>{answer}</ReactMarkdown>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
			<Footer />
			<LegalFooter />
		</>
	);
};
