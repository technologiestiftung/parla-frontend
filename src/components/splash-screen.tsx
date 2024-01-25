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
	DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "./Link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { texts } from "@/lib/texts";
import TypeformLink from "./ui/TypeformLink";

export function SplashScreen({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="bg-white dark:bg-gray-800 shadow-lg  max-w-xl mx-auto px-6 md:px-8 py-4 md:py-6 z-50 max-h-full overflow-y-auto rounded-md">
				<DialogHeader className="flex">
					<a href="/">
						<img
							alt="Parla Logo"
							src="/images/parla-logo-v1.svg"
							className="w-[35%] md:w-[30%] py-3"
						/>
					</a>
					<DialogTitle className="mr-7 py-3 text-left">
						<span className="font-normal text-2xl">
							KI-Assistent für Schriftliche Anfragen{" "}
							<br className="hidden md:inline" />
							und Rote Nummern
						</span>
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-3 text-base">
					<p>
						Dieser Prototyp durchsucht die Schriftlichen Anfragen und die
						Hauptausschussvorgänge (&quot;Rote Nummern&quot;) der Wahlperiode 19
						des Berliner Abgeordnetenhauses und erstellt anhand eines Large
						Language Models Vorlagen für die Beantwortung der gestellten Frage.
						Die Quellen sind auf{" "}
						<Link href="https://www.parlament-berlin.de/dokumente">
							parlament-berlin.de/dokumente
						</Link>{" "}
						zu finden.
					</p>
					<p>
						Bitte beachten Sie, dass die generierten Antworten zwar aus
						offiziellen Dokumenten erstellt wurden, aber keine verbindliche
						Antwort darstellen. Aktuelle KI-Sprachmodelle können zuweilen
						Informationen inkorrekt aufbereiten. Wir empfehlen, die verlinkten
						Quellenangaben zu überprüfen.
					</p>
					<p>Viel Spaß bei der Recherche!</p>
				</div>
				<div className="flex justify-start mt-4 gap-x-8 gap-y-4 flex-wrap">
					<a
						href="https://citylab-berlin.org/de/start/"
						target="_blank"
						rel="noreferrer"
						className={cn(
							`opacity-100 transition-opacity hover:opacity-50`,
							`focus:outline-none focus-visible:ring-2 focus-visible:rounded`,
							`focus-visible:ring-blue-900 focus-visible:ring-offset-8`,
							`focus-visible:ring-offset-white`,
						)}
					>
						<Image
							alt="Logo CityLAB Berlin"
							src="https://logos.citylab-berlin.org/logo-citylab-berlin-outline.svg"
							width={131}
							height={28}
						/>
					</a>
					<a
						href="https://technologiestiftung-berlin.de/"
						target="_blank"
						rel="noreferrer"
						className={cn(
							`opacity-100 transition-opacity hover:opacity-50`,
							`focus:outline-none focus-visible:ring-2 focus-visible:rounded`,
							`focus-visible:ring-blue-900 focus-visible:ring-offset-8`,
							`focus-visible:ring-offset-white`,
						)}
					>
						<Image
							alt="Logo der Technologiestiftung Berlin"
							src="https://logos.citylab-berlin.org/logo-tsb-outline.svg"
							width={92}
							height={28}
						/>
					</a>
					<a
						href="https://www.berlin.de/senatskanzlei/"
						target="_blank"
						rel="noreferrer"
						className={cn(
							`opacity-100 transition-opacity hover:opacity-50`,
							`focus:outline-none focus-visible:ring-2 focus-visible:rounded`,
							`focus-visible:ring-blue-900 focus-visible:ring-offset-8`,
							`focus-visible:ring-offset-white`,
						)}
					>
						<Image
							alt="Logo des Regierenden Bürgermeisters von Berlin und der Senatskanzlei"
							src="https://logos.citylab-berlin.org/logo-senatskanzlei-buergermeister-horizontal.svg"
							width={168}
							height={28}
						/>
					</a>
				</div>
				<div className="flex justify-start gap-x-6 gap-y-3 mt-4 flex-wrap">
					<TypeformLink
						question={undefined}
						linkText={texts.feedback.short}
					></TypeformLink>
					<Link className="text-sm" href="/faq">
						FAQ
					</Link>
					<Link className="text-sm" href="https://citylab-berlin.org/de/start/">
						Kontakt
					</Link>
					<Link
						className="text-sm"
						href="https://github.com/technologiestiftung/parla-frontend"
					>
						Quellcode
					</Link>
					<Link
						className="text-sm"
						href="https://citylab-berlin.org/de/data-privacy/"
					>
						Datenschutz
					</Link>
					<Link
						className="text-sm"
						href="https://citylab-berlin.org/de/imprint/"
					>
						Impressum
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
}
