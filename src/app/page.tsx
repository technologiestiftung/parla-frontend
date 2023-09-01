import { Column } from "@/components/Column";
import { Row } from "@/components/Row";
import Search from "../components/Search";

export default function Home() {
	return (
		<div className="sm:w-full md:w-1/2 flex flex-col gap-0">
			<Row>
				<Column>
					<h1 className="text-4xl py-5 font-extrabold ">
						{"KI Assistent für Schriftliche Anfragen"}
					</h1>
					<p>
						Dieser Prototyp durchsucht die Schriftlichen Anfragen der
						Wahlperiode 19 des Berliner Abgeordnetenhauses und versucht mittels
						KI, Antwortvorlagen für die Beantwortung der gestellten Frage zu
						generieren. Die Quellen sind auf{" "}
						<a
							className="underline text-blue-700 hover:text-blue-900"
							target="_blank"
							href="https://www.parlament-berlin.de/dokumente/open-data"
						>
							parlament-berlin.de/dokumente/open-data
						</a>{" "}
						zu finden.
					</p>
				</Column>
			</Row>
			<Search />
		</div>
	);
}
