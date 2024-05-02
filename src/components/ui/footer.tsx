import { FC } from "react";
import { useTexts } from "@/lib/hooks/use-texts";
import { cn } from "@/lib/utils";
import Image from "next/image";

const cityLabLogo = "https://logos.citylab-berlin.org/logo-citylab-color.svg";
const tsbLogo = "https://logos.citylab-berlin.org/logo-tsb-outline.svg";
const senatskanzleiLogo = "/images/senatskanzlei_logo.svg";

export const Footer: FC = () => {
	const texts = useTexts();
	return (
		<>
			<footer className={cn(`border-t border-gray-20`)}>
				<section
					className={cn(
						"flex flex-wrap gap-x-6 gap-y-7 justify-between",
						"px-5 md:px-8 py-10 md:py-12",
						`md:container md:max-w-7xl md:mx-auto md:px-8`,
					)}
				>
					<div className="w-full sm:w-auto flex gap-x-3 gap-y-8 sm:gap-x-8 md:gap-x-12 justify-between">
						<div className="flex flex-col gap-y-4 w-[30%] pt-8">
							<a
								href={texts?.footer.cityLABLogoLink}
								target="_blank"
								rel="noopener noreferrer"
								className={cn(
									`transition-opacity hover:opacity-50`,
									`focus:outline-none focus:ring-2 focus:ring-primary`,
									`focus:ring-offset-2 focus:ring-offset-white`,
								)}
							>
								<Image
									src={cityLabLogo}
									alt={texts?.footer.cityLABLogoAltText || ""}
									className="w-32 md:w-44"
									width={176}
									height={36}
								/>
							</a>
						</div>
						<div className="flex flex-col gap-y-4 w-[30%]">
							<h4 className="text-xs sm:text-sm">
								{texts?.footer.projectOwnerLabel}
							</h4>
							<a
								href={texts?.footer.tSBLogoLink}
								target="_blank"
								rel="noopener noreferrer"
								className={cn(
									`transition-opacity hover:opacity-50`,
									`focus:outline-none focus:ring-2 focus:ring-primary`,
									`focus:ring-offset-2 focus:ring-offset-white`,
								)}
							>
								<Image
									alt={texts?.footer.tSBLogoAltText || ""}
									src={tsbLogo}
									height={34}
									width={144}
								/>
							</a>
						</div>
						<div className="flex flex-col gap-y-4 w-[30%]">
							<h4 className="text-xs sm:text-sm">
								{texts?.footer.projectSponsorLabel}
							</h4>
							<a
								href={texts?.footer.sentatskanzleiLogoLink}
								target="_blank"
								rel="noopener noreferrer"
								className={cn(
									`transition-opacity hover:opacity-50`,
									`focus:outline-none focus:ring-2 focus:ring-primary`,
									`focus:ring-offset-2 focus:ring-offset-white`,
								)}
							>
								<Image
									src={senatskanzleiLogo}
									alt={texts?.footer.sentatskanzleiLogoAltText || ""}
									className="w-24 md:w-28"
									width={112}
									height={74}
								/>
							</a>
						</div>
					</div>
				</section>
			</footer>
		</>
	);
};
