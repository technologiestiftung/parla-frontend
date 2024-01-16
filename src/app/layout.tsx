import "./globals.css";
import type { Metadata } from "next";

const title = "Parla";
const description = "KI-Assistent für Schriftliche Anfragen und Rote Nummern";
const url = "https://parla.berlin";
const logoWidth = 1733;
const logoHeight = 634;

export const metadata: Metadata = {
	title: title,
	applicationName: title,
	description: description,
	keywords: [
		"Parla",
		"KI",
		"Berliner Senat",
		"Abgeordnetenhaus",
		"Mitbeteiligung",
		"Transparenz",
		"Dokumentensuche",
	],
	authors: { url: "https://citylab-berlin.org/", name: "CityLab Berlin" },
	openGraph: {
		title: title,
		description: description,
		url: url,
		siteName: title,
		images: [
			{
				url: "/images/parla-logo-v1.png",
				width: logoWidth,
				height: logoHeight,
				alt: "Parla Logo",
			},
		],
		locale: "de_DE",
		type: "website",
	},
	twitter: {
		title: title,
		description: description,
		card: "summary_large_image",
		images: [
			{
				url: "/images/parla-logo-v1.png",
				width: logoWidth,
				height: logoHeight,
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
