import "./globals.css";
import type { Metadata } from "next";

const title = "Parla";
const description = "KI-Assistent für Schriftliche Anfragen und Rote Nummern";
const url = "https://parla.berlin";

export const metadata: Metadata = {
	icons: {
		icon: "/images/favicons/favicon.ico",
		shortcut: "/images/favicons/favicon-32x32.png",
		apple: "/images/favicons/apple-touch-icon.png",
		other: [
			{
				rel: "android-chrome-192x192",
				url: "/images/favicons/android-chrome-192x192.png",
			},
			{
				rel: "android-chrome-512x512",
				url: "/images/favicons/android-chrome-512x512.png",
			},
			{
				rel: "favicon-16x16",
				url: "/images/favicons/favicon-16x16.png",
			},
			{
				rel: "favicon-32x32",
				url: "/images/favicons/favicon-32x32.png",
			},
		],
	},
	title: title,
	applicationName: url,
	description: description,
	keywords: [
		"Parla",
		"Schriftliche Anfragen",
		"Rote Nummern",
		"Hauptausschussprotokolle",
		"Berlin",
		"Politik",
		"Verwaltung",
		"Berliner Senat",
		"Abgeordnetenhaus",
		"Transparenz",
		"Dokumentensuche",
		"CityLAB Berlin",
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
