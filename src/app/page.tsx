import { Column } from "@/components/Column";
import { Row } from "@/components/Row";
import Search from "../components/Search";

export default function Home() {
	return (
		<div className=" sm:w-full md:w-1/2">
			<Row additionalClassNames="text-left">
				<Column additionalClassNames="text-left">
					<h1 className="text-4xl py-5 font-extrabold">{">ki.anfragen"}</h1>
					<p>
						Ein KI gestütztes Suchemaschine für Schriftliche Anfragen aus der
						Wahlperiode 19 des Berliner Abgeordnetenhauses. Die original Quellen
						sind auf{" "}
						<a
							target="_blank"
							href="https://www.parlament-berlin.de/dokumente/open-data"
						>
							parlament-berlin.de/dokumente/open-data
						</a>{" "}
						zu finden
					</p>
				</Column>
			</Row>
			<Search />
		</div>
	);
}
