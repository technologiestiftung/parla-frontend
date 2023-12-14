import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Parla",
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
			</body>
		</html>
	);
}
