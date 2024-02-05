import { HamburgerMenuIcon, InfoCircledIcon } from "@radix-ui/react-icons";

export default function MobileHeader({
	setSidebarisOpen,
	openSplashScreen,
}: {
	setSidebarisOpen: (isOpen: boolean) => void;
	openSplashScreen: () => void;
}) {
	return (
		<div className="md:hidden p-3">
			<div className="flex flex-row justify-between items-center">
				<button
					onClick={() => {
						setSidebarisOpen(true);
					}}
				>
					<HamburgerMenuIcon className="w-[20px] h-[20px]"></HamburgerMenuIcon>
				</button>
				<a href="/" className="w-full flex justify-center">
					<img
						alt="Parla Logo"
						src="/images/parla-logo-v1.svg"
						className="w-[30%] sm:w-[20%] md:w[15%] py-3"
					/>
				</a>
				<button onClick={openSplashScreen}>
					<InfoCircledIcon className="w-6 h-6 "></InfoCircledIcon>
				</button>
			</div>
		</div>
	);
}
