import { Link } from "@/components/Link";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ki.anfragen",
	description: "Pardok durchsuchbar",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="de">
			<body className="">
				<main className="">{children}</main>
				{/* <footer className="w-full text-center italic text-sm text-gray-400 mt-auto bg-gray-200"> */}
				{/* <p className="pt-3 font-extrabold">{">ki.anfragen"}</p> */}
				{/* <p> */}
				{/* Ein Projekt des{" "} */}
				{/* <Link href="https://www.citylab-berlin.org/"> */}
				{/* {"CityLAB Berlin"} */}
				{/* </Link> */}
				{/* </p> */}
				{/* </footer> */}
			</body>
		</html>
	);
}
