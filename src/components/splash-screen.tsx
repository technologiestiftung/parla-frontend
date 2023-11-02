/* eslint-disable @next/next/no-img-element */
"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/os3Im0Kjb6V
 */
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Link } from "./Link";

export function SplashScreen({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<Dialog open={open}>
			<DialogContent
				onClick={() => {
					setOpen(false);
				}}
				className=" bg-white dark:bg-gray-800 rounded-none shadow-lg  max-w-xl mx-auto my-8 px-6 py-4 z-50"
			>
				<DialogHeader className="flex justify-center mb-4">
					<DialogTitle className="text-blue-400">
						KI Assistent für Schriftliche Anfragen
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-3 text-sm">
					<p>
						Dieser Prototyp durchsucht die Schriftlichen Anfragen der
						Wahlperiode 19 des Berliner Abgeordnetenhauses und erstellt anhand
						eines Large Language Models Vorlagen für die Beantwortung der
						gestellten Frage. Die Quellen sind auf
						parlament-berlin.de/dokumente/open-data zu finden.
					</p>
					<p>
						Bitte beachten Sie, dass die generierten Antworten zwar aus
						offiziellen Dokumenten erstellt wurden, aber keine verbindliche
						Antwort darstellen.
					</p>
					<p>Viel Spaß!</p>
				</div>
				<div className="flex justify-around mt-4">
					<img
						className="w-1/3 h-7"
						alt="logo citylab berlin"
						src="https://logos.citylab-berlin.org/logo-citylab-berlin-outline.svg"
					/>
					<img
						className="w-1/3 h-7"
						alt="logo der technologiestiftung berlin"
						src="https://logos.citylab-berlin.org/logo-tsb-outline.svg"
					/>
					<img
						className="w-1/3 h-7"
						alt="logo des regierenden bürgermeisters von berlin und der Senatskanzlei"
						src="https://logos.citylab-berlin.org/logo-senatskanzlei-buergermeister-horizontal.svg"
					/>
				</div>
				<div className="flex justify-around mt-4">
					<Link
						className="text-blue-500 underline text-xs"
						href="https://citylab-berlin.org/de/start/"
					>
						Kontakt
					</Link>
					<Link
						className="text-blue-500 underline text-xs"
						href="https://github.com/technologiestiftung/ki-anfragen-frontend"
					>
						Quellcode
					</Link>
					<Link
						className="text-blue-500 underline text-xs"
						href="https://citylab-berlin.org/de/data-privacy/"
					>
						Datenschutz
					</Link>
					<Link
						className="text-blue-500 underline text-xs"
						href="https://citylab-berlin.org/de/imprint/"
					>
						Impressum
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
}
