import { Algorithms, ResponseDetail } from "@/lib/common";

export const result: ResponseDetail = {
	gpt: {
		id: "chatcmpl-8JKkH9PkSCvAuUMeHnvxvCmKlfX77",
		created: 1699618669,
		model: "gpt-3.5-turbo-16k-0613",
		object: "chat.completion",
		usage: {
			prompt_tokens: 3600,
			completion_tokens: 149,
			total_tokens: 3749,
		},
		choices: [
			{
				index: 0,
				message: {
					role: "assistant",
					content:
						"Die unterschiedliche Vergütung ergibt sich aus den jeweils geltenden tariflichen Grundlagen. Die Gehälter der Ärzt:innen am Landesinstitut für gerichtliche und soziale Medizin (GerMed) basieren auf dem Tarifvertrag der Länder (TV-L) mit einer wöchentlichen Arbeitszeit von 40 Stunden. Die Ärzt:innen am Institut für Rechtsmedizin der Charité hingegen werden nach dem Tarifvertrag Ärzte Charité mit 42 Wochenstunden vergütet. Es ist zu beachten, dass eine Besoldung nur Beamten, Berufsrichtern und Soldaten zusteht.",
				},
			},
		],
	},
	requestBody: {
		query:
			"Wie begründet sich die deutlich ungleiche Besoldung von Ärtzt:innen am Landesinstitut für gerichtliche und soziale Medizin Berlin sowie am Institut für Rechtsmedizin der Charité?",
		temperature: 0.5,
		match_threshold: 0.85,
		num_probes: 7,
		match_count: 5,
		chunk_limit: 0,
		summary_limit: 0,
		document_limit: 3,
		search_algorithm: Algorithms.ChunksOnly,
		openai_model: "gpt-3.5-turbo",
		include_summary_in_response_generation: false,
	},
	completionOptions: {
		model: "gpt-3.5-turbo-16k",
		//@ts-ignore
		messages: [{}, {}],
		temperature: 0.5,
		stream: false,
		max_tokens: 2048,
	},
	sections: [
		{
			similarity: 0.899329125881195,
			id: 248,
			content:
				" Senatsverwaltung für Gesundheit, Pflege und Gleichstellung Herrn Abgeordneten Tom Schreiber (SPD) über den Präsidenten des Abgeordnetenhauses von Berlin über Senatskanzlei G Sen A n t w o r t auf die Schriftliche Anfrage Nr. 19/10011 vom 04. November 2021 über Zweierlei Maß? Ungleiche Besoldung von Ärzt:innen der Berliner Rechtsmedizininstitute ________________________________________________________________________ Im Namen des Senats von Berlin beantworte ich Ihre Schriftliche Anfrage wie folgt:   1. Wie begründet sich die deutlich ungleiche Besoldung von Ärtzt:innen am Landesinstitut für gerichtliche     und soziale Medizin Berlin sowie am Institut für Rechtsmedizin der Charité? Zu 1.: Die unterschiedliche Vergütung ergibt sich aus den jeweils geltenden tariflichen Grundlagen. Dabei beziehen sich die Gehälter der beim Landesinstitut für gerichtliche und soziale Medi- zin (GerMed) angestellten Ärzt:innen auf den Tarifvertrag der Länder (TV-L) mit einer wö- chentlichen Arbeitszeit von 40 Stunden; diejenigen der am Institut für Rechtsmedizin der Charité (IfR) angestellten Ärzt:innen am Tarifvertag Ärzte Charite mit 42 Wochenstunden. Eine Besoldung steht nur Beamten, Berufsrichtern und Soldaten zu.   2. Welche Möglichkeiten sieht der Senat, diese Ungleichheit im Hinblick auf die Besoldung zu beheben?     (Aufstellung erbeten.) Zu 2.: Der Senat ist hinsichtlich der Charité nicht Tarifpartei, sondern hat die in Art. 9 Abs. 3 GG verankerte Tarifautonomie zu wahren.   3. In welchen Bereichen sind die Aufgaben und Leistungen des Landesinstitutes für gerichtliche und soziale     Medizin Berlin und des Instituts für Rechtsmedizin der Charité deckungsgleich und in welchen Bereichen     unterscheiden sie sich? (Aufstellung erbeten.)    ",
			page: 1,
			processed_document_id: 52,
			processed_documents: [
				{
					id: 52,
					file_checksum: "c2dff8f84645a4c721f6eae1906cb741",
					file_size: 22948,
					num_pages: 3,
					processing_started_at: "2023-11-08T16:02:35.364",
					processing_finished_at: "2023-11-08T16:02:50.623",
					processing_error: "",
					registered_document_id: 49,
				},
			],
			registered_documents: [
				{
					id: 49,
					source_url:
						"https://pardok.parlament-berlin.de/starweb/adis/citat/VT/19/SchrAnfr/S19-10011.pdf",
					source_type: "Schriftliche Anfrage",
					registered_at: "2023-11-08T12:44:58.329",
					metadata: {},
				},
			],
		},
		{
			similarity: 0.871693432331085,
			id: 332,
			content:
				"2 Planungsbereich III umfasst den Bezirk: Treptow-Köpenick Um die räumliche Verteilung von Arztpraxen innerhalb Berlins zu optimieren, wurde bereits 2012 das Gemeinsame Landesgremium nach § 90a SGB V eingerichtet. Mit dem sogenannten „Letter of Intent“ (LOI) v. 09.10.2013 wurde vom gemeinsamen Landesgremium Berlin ein Konzept zur Versorgungssteuerung auf Ebene der 12 Berliner Bezirke beschlossen. Die Versorgungsgrade für den Bezirk Lichtenberg sind in der nachfolgenden Tabelle zum 01.07.2021 dargestellt: **Versorgungsgrade im Bezirk Lichtenberg zum 01.07.2021 Fachgruppe Versorgungsgrad Lichtenberg** Augenheilkunde 85,3 % Chirurgie & Orthopädie 105,3 % Frauenärzte 103,7 % Hausärzte 80,8 % Hautarzt 72,0 % HNO 87,0 % Internisten 106,1 % Kinderund Jugendärzte 84,2 % Kinderund Jugendpsychiatrie 150,1 % Nervenärzte 98,2 % Psychotherapie 105,1 % Radiologen 215,7 % Urologie 116,4 % Nur auf Basis der Vereinbarung zum Letter of Intent werden in Berlin Daten zur Versorgung auf Bezirksebene erfasst. Der Letter of Intent berücksichtigt jedoch keine Verwaltungseinheiten unterhalb der Bezirksebene, sodass Angaben zur Versorgung von Ortsteilen nicht erstellt werden können. In sechs der dreizehn aufgeführten Arztgruppen lag der Versorgungsgrad unter einem als bedarfsgerecht angesehenen Wert von 100 %. Der Senat nimmt bereits seit einiger Zeit zur Kenntnis, dass es in Stadtrandlagen immer häufiger zu Problemen bei der Stellenbesetzung ausgeschriebener Arztsitze kommt. Allerdings bewegen sich die Werte nicht im Bereich der Unterversorgung (50 % und weniger), sodass kein zwingendes Handeln der Kassenärztlichen Vereinigung Berlin vorgeschrieben ist. Der Senat begrüßt daher den Ansatz der Kassenärztlichen Vereinigung, durch gezielte finanzielle Anreize Niederlassungen zu fördern und eventuell Eigeneinrichtungen betreiben zu wollen.   2. Wie wirkt der Berliner Senat auf die Kassenärztliche Vereinigung hin, damit sich mehr Fach- und Hausärzte in Hohenschönhausen ansiedeln können?    ",
			page: 2,
			processed_document_id: 87,
			processed_documents: [
				{
					id: 87,
					file_checksum: "75fd087fd4a9afe7d636121aa591110e",
					file_size: 137347,
					num_pages: 5,
					processing_started_at: "2023-11-08T16:03:40.183",
					processing_finished_at: "2023-11-08T16:03:48.517",
					processing_error: "",
					registered_document_id: 77,
				},
			],
			registered_documents: [
				{
					id: 77,
					source_url:
						"https://pardok.parlament-berlin.de/starweb/adis/citat/VT/19/SchrAnfr/S19-10035.pdf",
					source_type: "Schriftliche Anfrage",
					registered_at: "2023-11-08T12:44:58.329",
					metadata: {},
				},
			],
		},
		{
			similarity: 0.862201929092407,
			id: 353,
			content:
				" 4   5. Wie stellt sich die Zahl der Hausärzte/grundversorgenden Fachärzte im Verhältnis zur Einwohnerzahl im Ortsteil Altglienicke dar?   6. Wie stellt sich die Zahl der Hausärzte/grundversorgenden Fachärzte im Verhältnis zur Einwohnerzahl im Ortsteil Adlershof dar? Zu 5. und 6.: Die bundesweit gültige Bedarfsplanungsrichtlinie legt Berlin als einen einheitlichen Pla- nungsbereich fest und berücksichtigt nicht die bezirkliche Ebene bzw. kleinere Verwal- tungseinheiten. Während die Bedarfsplanungsrichtlinie Berlin als einen Planungsbereich aufführt, soll zum Zwecke einer homogenen und stabilen Versorgung von dieser Raumgliederung für die Arzt- gruppe der Hausärzte gemäß § 11 Abs. 3 Satz 3 Bedarfsplanungs-Richtlinie abgewichen werden. Der nunmehr im Oktober 2020 in Kraft gesetzte Bedarfsplan sieht vor, für die Arztgruppe der Hausärzte drei Planungsbereiche zu etablieren. Zu diesem Zwecke wurden zunächst die Versorgungsgrade auf Ebene der Berliner Bezirke dargestellt. Unter weiterer Berück- sichtigung der Parameter Altersstruktur, Morbidität und erwarteter Bevölkerungszuwachs gemäß Prognose der Senatsverwaltung für Stadtentwicklung auf Bezirksebene werden künftig drei Planungsbereiche im Zulassungsbezirk Berlin vorgesehen, die sich an den Be- zirksgrenzen orientieren: Planungsbereich I umfasst die Bezirke: Spandau, Steglitz-Zehlendorf, Charlottenburg-Wilmersdorf, Reinickendorf, Pankow, Mitte, Friedrichshain-Kreuzberg, Tempelhof-Schöneberg und Neukölln Planungsbereich II umfasst die Bezirke: Lichtenberg, Marzahn-Hellersdorf Planungsbereich III umfasst den Bezirk: Treptow-Köpenick Im Planungsbereich III konnten somit insgesamt 57 hausärztliche Arztsitze neu ausge- schrieben werden. Um die räumliche Verteilung von Arztpraxen innerhalb Berlins zu optimieren, wurde zudem bereits 2012 das Gemeinsame Landesgremium nach § 90a SGB V eingerichtet. Mit dem sogenannten „Letter of Intent“ (LOI) v. 09.10.2013 wurde vom gemeinsamen Landesgre- mium Berlin ein Konzept zur Versorgungssteuerung auf Ebene der 12 Berliner Bezirke be- schlossen. Nur auf Basis dieser Vereinbarung werden in Berlin Daten zur Versorgung auf Bezirksebene erfasst. Der Letter of Intent berücksichtigt jedoch keine Verwaltungseinheiten unterhalb der Bezirks- ebene, sodass Angaben zur Versorgung von Ortsteilen nicht erstellt werden können.   7. Gibt es Erkenntnisse dazu, dass einzelne Ärzte in den genannten Ortsteilen aufgrund zu hoher Belastung inzwischen keine neuen Patienten mehr aufnehmen und wenn ja, welcher Art?    ",
			page: 4,
			processed_document_id: 90,
			processed_documents: [
				{
					id: 90,
					file_checksum: "36ffe77d20af79da2974e87d0a2312ab",
					file_size: 143269,
					num_pages: 6,
					processing_started_at: "2023-11-08T16:03:40.491",
					processing_finished_at: "2023-11-08T16:03:50.194",
					processing_error: "",
					registered_document_id: 76,
				},
			],
			registered_documents: [
				{
					id: 76,
					source_url:
						"https://pardok.parlament-berlin.de/starweb/adis/citat/VT/19/SchrAnfr/S19-10028.pdf",
					source_type: "Schriftliche Anfrage",
					registered_at: "2023-11-08T12:44:58.329",
					metadata: {},
				},
			],
		},
		{
			similarity: 0.85915070772171,
			id: 5254,
			content:
				" 4   7. Wie rechtfertigt der Berliner Senat die Tatsache, dass Erzieherinnen und Erzieher freier und gemeinnütziger Träger –bei gleicher Arbeit und gleicher Qualifikation – keine Hauptstadtzu- lage erhalten?   8. Plant der Berliner Senat eine Kompensation für die betroffenen Erzieherinnen und Erzieher der freien und gemeinnützigen Träger – falls nicht, wieso?   Zu 7. und 8.: Als Hauptstadt steht Berlin – durch die bundesweit einmalige Konzentration von Bundesbehörden – als Arbeitgeber in einem besonderen unmittelbaren Konkurrenzverhältnis zur Ministerialebene des Bundes und auch anderen öffentlichen Arbeitgebern. Sowohl bei der Bindung von Personal, als auch bei der Personalgewinnung besteht für das Land ein Wettbewerbsnachteil, der sich in noch verschärfter Form bei der Gewinnung von Fachkräften in spezialisierten Berufsgruppen zeigt.   Ziel der Hauptstadtzulage ist es, die Attraktivität für eine Tätigkeit beim Land Berlin zu steigern, um dem Personalmangel in vielen Bereichen der unmittelbaren Landesverwaltung des Landes Berlin entgegenzuwirken. Folglich sind Arbeitnehmerinnen und Arbeitnehmer, die nicht zum Berliner Landesdienst gehören, nicht Zielgruppe der Hauptstadtzulage.   Obwohl die Trägerfinanzierung im Bereich der Kindertagesbetreuung grundsätzlich einheitlich auf der Basis der RV Tag erfolgt, gibt es weder eine Tarifbindung noch konkrete Vorgaben zur Höhe des Lohns des pädagogischen Personals. Dieser stellt sich bei rund 1.200 Kitaträgern regelmäßig unterschiedlich dar und kann dabei insgesamt auch über die Vergütung im öffentlichen Dienst Berlins hinausgehen. Eine kompensationsbedürftige, grundsätzliche Schlechterstellung der Erzieherinnen und Erzieher der freien Träger ist somit nicht gegeben.   9. Ist es vorgesehen Gelder aus dem Gute-KiTa-Gesetz für personelle Verbesserungen in den Berliner Kitas zu verwenden?   Zu 9.: Das Handlungsund Finanzierungskonzept zur Umsetzung des Gute-KitaGesetzes im Land Berlin sieht mehrere Maßnahmen vor, die zu personellen Verbesserungen in den Kitas führen. Unter Kofinanzierung des Landes Berlin wurde der Leitungsschlüssel stufenweise verbessert. Bis zum 31. Juli 2019 lag dieser noch bei 1:100. Seit dem 01. August 2020 wird die Freistellung einer Fachkraft von der unmittelbaren pädagogischen Arbeit für die Leitungstätigkeit bei 85 Kindern gewährleistet.   Des Weiteren hat das Land Berlin im Rahmen der Umsetzung des Gute-KitaGesetzes einen Schwerpunkt auf das Handlungsfeld „Gewinnung und Sicherung qualifizierter Fachkräfte“ gesetzt. In diesem Zusammenhang wurde der    ",
			page: 4,
			processed_document_id: 979,
			processed_documents: [
				{
					id: 979,
					file_checksum: "a1295b49b3913795c027a34133341e4b",
					file_size: 28669,
					num_pages: 6,
					processing_started_at: "2023-11-08T16:22:26.523",
					processing_finished_at: "2023-11-08T16:22:35.791",
					processing_error: "",
					registered_document_id: 952,
				},
			],
			registered_documents: [
				{
					id: 952,
					source_url:
						"https://pardok.parlament-berlin.de/starweb/adis/citat/VT/19/SchrAnfr/S19-10980.pdf",
					source_type: "Schriftliche Anfrage",
					registered_at: "2023-11-08T12:44:58.331",
					metadata: {},
				},
			],
		},
		{
			similarity: 0.85909515619278,
			id: 249,
			content:
				"2 Zu 3.: In beiden Einrichtungen erfolgen gerichtliche Obduktionen, toxikologische Untersuchungen, Begutachtungen von Medizinschadensfällen, rechtsmedizinische Lebenduntersuchungen, rechtsmedizinische Begleitungen von Organentnahmen zu Transplantationszwecken sowie Leichenfundortbegehungen bei tödlichen Verkehrsunfällen. Dazu gehören zum Aufgabenspektrum die Erstellung rechtsmedizinscher Gutachten für Ermittlungsbehörden, Sachverständigentätigkeit vor Gericht und die Vorhaltung eines 24-stündigen rechtsmedizinischen Bereitschaftsdiensts. Im Landesinstitut wird zusätzlich ein forensisch-psychiatrischer Bereich vorgehalten zur Begutachtung von Haft-, Terminund Verhandlungsfähigkeiten sowie Schuldfähigkeit in foro und gutachterlich in schriftlicher Form. Zu den besonderen Aufgaben des Landesinstituts gehören weiterhin die zweite Leichenschau in Berliner Krematorien sowie die Untersuchung von Knochenfunden und Leichenteilen. Das Landesinstitut hat die Hoheit über das Leichenschauhaus als offizielle Verwahrstelle der in Berlin polizeilich beschlagnahmten Leichen. Zu den Aufgaben des Charité-Instituts zählen vor allem Tätigkeiten in Forschung und Lehre wie die studentische Ausbildung, die Betreuung von Promotionen, Habilitationen und Masterarbeiten sowie die Ausund Weiterbildung von Ärzt:innen im Rahmen von Fortbildungen der Berliner Ärztekammer. Das toxikologische Labor ist als Havarielabor für das LKA für forensische Alkoholbestimmung etabliert. Dazu werden Haaranalysen und ein Urinkontrollprogramm für Jugendhilfe und Führerscheinabteilung der Berliner Kraftfahrzeugbehörde durchgeführt. Die Gewaltschutzambulanz arbeitet hier seit 2014.   4. Wie steht der Senat zu einer möglichen Eingruppierung der Ärzt:innen des Landesinstitutes für gerichtliche     und soziale Medizin in den TV-Ärzte bzw. einer vergleichbaren Angleichung der Bezüge? Zu 4.: Der Senat würde eine Angleichung der Vergütung für die am GerMed angestellten Ärztinnen und Ärzte an das Tarifniveau des TV-Ärzte Charité begrüßen.   5. Welche Rolle kommen dem Landesinstitut für gerichtliche und soziale Medizin Berlin sowie dem Institut     für Rechtsmedizin der Charité in der Covid- 19 - Pandemie zu, welche Aufgaben leisten beide Institute und     welche Aufgaben haben jeweils Alleinstellungsmerkmale? (Aufstellung erbeten.) Zu 5.: In beiden Einrichtungen erfolgen sowohl Untersuchungen von an oder mit SARS-CoV- 2 - Verstorbenen, als auch von fraglichen oder gesicherten Impftodesfällen in Folge der SARS- CoV-2 Impfungen, deren Obduktion jeweils gerichtlich angeordnet ist. Berlin, den 25. November 2021 In Vertretung Martin Matz Senatsverwaltung für Gesundheit, Pflege und Gleichstellung    ",
			page: 2,
			processed_document_id: 52,
			processed_documents: [
				{
					id: 52,
					file_checksum: "c2dff8f84645a4c721f6eae1906cb741",
					file_size: 22948,
					num_pages: 3,
					processing_started_at: "2023-11-08T16:02:35.364",
					processing_finished_at: "2023-11-08T16:02:50.623",
					processing_error: "",
					registered_document_id: 49,
				},
			],
			registered_documents: [
				{
					id: 49,
					source_url:
						"https://pardok.parlament-berlin.de/starweb/adis/citat/VT/19/SchrAnfr/S19-10011.pdf",
					source_type: "Schriftliche Anfrage",
					registered_at: "2023-11-08T12:44:58.329",
					metadata: {},
				},
			],
		},
	],
};
