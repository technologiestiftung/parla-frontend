import "./globals.css";
import type { Metadata } from "next";

const title = "Parla";
const description = "KI-Assistent für Schriftliche Anfragen und Rote Nummern";
const url = "https://parla.berlin";

export const metadata: Metadata = {
	title: title,
	applicationName: url,
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
		siteName: url,
		description: description,
		url: url,
		images: [
			{
				url: "/images/parla-logo-og-image.png",
				width: 1200,
				height: 629,
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
				url: "/images/parla-logo-twitter-image.png",
				width: 1200,
				height: 1200,
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
