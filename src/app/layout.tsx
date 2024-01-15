import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	openGraph: {
		title: "Parla",
		description: "KI-Assistent für Schriftliche Anfragen und Rote Nummern",
		url: "https://parla.berlin",
		siteName: "Parla",
		images: [
			{
				url: "/images/logo.png",
				width: 800,
				height: 600,
			},
			{
				url: "/images/logo.png",
				width: 1800,
				height: 1600,
				alt: "Parla Logo",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		title: "Parla",
		description: "KI-Assistent für Schriftliche Anfragen und Rote Nummern",
		images: [
			{
				url: "/images/logo.png",
				width: 800,
				height: 600,
			},
			{
				url: "/images/logo.png",
				width: 1800,
				height: 1600,
				alt: "Parla Logo",
			},
		],
	},
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
