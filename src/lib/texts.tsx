export const texts = {
	backText: "Zurück",
	disclaimerLabel: "Hinweis",
	disclaimerAriaLabel: "Hinweis zur Verbindlichkeit der Antworten",
	noResultsTitle:
		"Es konnten keine Informationen zu dieser Frage in den vorliegenden Dokumenten gefunden werden.",
	answerIsLoading: "Antwort wird generiert...",
	answerTitle: "Zusammenfassung von Parla:",
	answerFeedback: "War diese Zusammenfassung hilfreich?",
	answerTellUsMore: "Erzählen Sie uns mehr:",
	answerTags: [
		"Antwort inhaltlich falsch oder missverständlich",
		"Es gab einen Fehler",
		"Antwort nicht ausführlich genug",
		"Dokumente unpassend",
	],
	answerThankYou: "Danke für Ihr Feedback!",
	copy: "Kopieren",
	copied: "Kopiert!",
	answerDisclaimer:
		"Bitte beachten Sie, dass die generierten Antworten zwar aus offiziellen Dokumenten erstellt wurden, aber keine verbindliche Antwort darstellen. Aktuelle KI-Sprachmodelle können zuweilen Informationen inkorrekt aufbereiten. Wir empfehlen, die verlinkten Quellenangaben zu überprüfen. Als Datengrundlage dienen ausschliesslich Schriftliche Anfragen und Hauptausschussvorgänge.",
	documentsAreLoading: "Dokumente werden durchsucht...",
	documentsTitle: "Dokumente sortiert nach Relevanz:",
	showMoreDocuments: "Weitere Dokumente anzeigen...",
	feedback: {
		short: "Feedback",
		long: "Beantworten Sie uns gerne einige Fragen.",
		question: "Wie gefällt Ihnen Parla? ",
	},
	about: {
		title: "Über Parla",
		content:
			'Dieser Prototyp durchsucht die Schriftlichen Anfragen und die Hauptausschussvorgänge ("Rote Nummern") der Wahlperiode 19 des Berliner Abgeordnetenhauses und erstellt anhand eines Large Language Models Vorlagen für die Beantwortung der gestellten Frage. Die Quellen sind auf [parlament-berlin.de/dokumente](https://www.parlament-berlin.de/dokumente) zu finden.\n\nBitte beachten Sie, dass die generierten Antworten zwar aus offiziellen Dokumenten erstellt wurden, aber keine verbindliche Antwort darstellen. Aktuelle KI-Sprachmodelle können zuweilen Informationen inkorrekt aufbereiten. Wir empfehlen, die verlinkten Quellenangaben zu überprüfen.\nViel Spaß bei der Recherche!',
	},
	faq: {
		title: "Frequently Asked Questions",
		questions: [
			{
				question: "Was ist Parla?",
				answer:
					"*Welche Nachhaltigkeitsziele verfolgt der Berliner Senat mit Blick auf die Reduzierung des CO2-Ausstoßes? Wie wirkt sich der Mangel an Lehrkräften aus? Welche Initiativen gibt es, um den kulturellen Sektor in Berlin zu unterstützen?* Auf Fragen wie diese liegen bereits konkrete Antworten vor – in Form der sogenannten Schriftlichen Anfragen, die das KI-Tool Parla durchsuchbar und damit die Verwaltung effizienter machen will.\n\nParla hat Zugriff auf mehr als 11.000 öffentlich verfügbare Dokumente, die auf dem parlamentarischen Dokumentationssystem PARDOK in der laufenden Wahlperiode publiziert wurden. In der aktuellen Version umfasst der Textkorpus neben sämtlichen Antworten auf Schriftliche Anfragen von Abgeordneten auch die wichtigen Hauptausschussvorgänge (sogenannte „Rote Nummern“). Stellt man Parla eine Frage, formuliert das System auf dieser Textgrundlage einen Antwortvorschlag und referenziert die dafür genutzten Dokumente, sodass die Nachvollziehbarkeit gewährleistet bleibt.",
			},
			{
				question: "Wie funktioniert Parla?",
				answer:
					"Parla nutzt ein Large Language Model, um die Schriftlichen Anfragen und die Hauptausschussvorgänge der Wahlperiode 19 des Berliner Abgeordnetenhauses zu durchsuchen und die Suchergebnisse in Form einer KI-generierten Antwort zusammen zu fassen. Dazu werden die über das PARDOK-System herunterladbaren PDF-Dokumente inhaltlich analysiert und in maschinenlesbaren Text umgewandelt. Dieser wird in Form von sogenannten Embeddings in einer Datenbank gespeichert. Suchanfragen werden dann mit den Embeddings der Dokumente verglichen und die besten Treffer werden in Form einer Antwort zusammengefasst. Die Antwort wird mit den Quellenangaben verlinkt, sodass die Nachvollziehbarkeit gewährleistet bleibt.",
			},
			{
				question: "Was ist ein Large Language Model?",
				answer:
					'Ein *"Large Language Model" (LLM)* ist ein hochentwickeltes KI-gestütztes System, das speziell dafür konzipiert ist, menschliche Sprache in ihrer Komplexität zu erfassen und zu simulieren. Diese Technologie basiert auf der Analyse und Verarbeitung einer immensen Menge an Textdaten, die aus einer Vielzahl von Quellen wie Büchern, Artikeln und Internetinhalten stammen. Durch maschinelles Lernen und komplexe Algorithmen entwickelt das Modell die Fähigkeit, Texte zu verstehen, zu generieren und in menschenähnlicher Weise zu interagieren. Es kann Aufgaben wie das Beantworten von Fragen, das Übersetzen von Sprachen und das Erstellen von Texten verschiedenster Art übernehmen. Trotz ihrer beeindruckenden Leistungsfähigkeit sind LLMs nicht fehlerfrei und ihre Interpretationen können gelegentlich von menschlichem Verständnis abweichen. Sie repräsentieren den aktuellen Stand der KI-Entwicklung im Bereich der natürlichen Sprachverarbeitung, aber sie bleiben ein Werkzeug, dessen Ergebnisse stets kritisch hinterfragt und kontextualisiert werden sollten.',
			},
			{
				question: "Was ist eine Schriftliche Anfrage?",
				answer:
					"Eine Schriftliche Anfrage in Berlin ist ein formales Mittel, mit dem Abgeordnete des Berliner Parlaments von der Landesregierung Informationen zu spezifischen Themen anfordern können. Diese Anfragen müssen schriftlich eingereicht werden und zielen darauf ab, detaillierte Auskünfte zu politischen, wirtschaftlichen oder sozialen Angelegenheiten zu erhalten. Die Frist für die Beantwortung dieser Anfragen beträgt etwa vier Wochen. Dieses Verfahren dient der Transparenz und ermöglicht es, Regierungshandeln kritisch zu hinterfragen und zu überwachen. Die Antworten werden öffentlich zugänglich gemacht und tragen so zur Rechenschaftspflicht und demokratischen Kontrolle bei.",
			},
			{
				question: "Was ist ein Hauptausschussvorgang?",
				answer:
					'Ein Hauptausschussvorgang, bekannt als *"Rote Nummer"*, ist ein wesentlicher Bestandteil der parlamentarischen Dokumentation im Berliner Abgeordnetenhaus. Es handelt sich um ein detailliertes Protokoll, das die Diskussionen, Entscheidungen und Abstimmungen des Hauptausschusses des Berliner Parlaments festhält. Der Hauptausschuss, eine zentrale Einrichtung in der Struktur des Berliner Abgeordnetenhauses, befasst sich mit wichtigen Themen wie dem Haushalt, Gesetzesinitiativen und anderen bedeutsamen politischen Angelegenheiten. Die Protokolle, gekennzeichnet durch ihre "Rote Nummer", bieten eine transparente und genaue Aufzeichnung der parlamentarischen Vorgänge. Sie sind öffentlich zugänglich und erlauben es Bürgern, Medien und Interessenvertretern, Einblicke in die Entscheidungsprozesse des Berliner Parlaments zu gewinnen und die Arbeit der Abgeordneten zu verfolgen. Diese Dokumente sind somit ein fundamentales Werkzeug für die Transparenz und die demokratische Kontrolle im politischen Prozess Berlins.',
			},
			{
				question:
					"Wie kann ich die Qualität und Richtigkeit der generierten Antworten bewerten?",
				answer:
					'Beim Umgang mit Antworten, die von einem *Large Language Model (LLM)* generiert wurden, ist es wichtig zu beachten, dass diese nicht immer korrekt sein müssen und keinen Anspruch auf Richtigkeit haben. Aktuelle KI-Sprachmodelle, wie ein LLM, sind zwar fortschrittlich und nutzen umfangreiche Datenmengen, doch besteht immer ein gewisses Risiko, dass die Informationen in Form einer sogenannten "Halluzination" fehlerhaft sein können. Diese "Halluzinationen" sind Fälle, in denen das Modell fälschlicherweise Informationen generiert, die nicht auf Fakten basieren. Daher sollten Nutzer die generierten Antworten stets kritisch hinterfragen und auf ihre Plausibilität prüfen. Es wird empfohlen, die Antworten durch zusätzliche Recherche und das Überprüfen der verlinkten Quellenangaben zu verifizieren. Bei wichtigen Entscheidungen oder bei der Suche nach verlässlichen Informationen ist es ratsam, auf offizielle und geprüfte Quellen zurückzugreifen.',
			},
			{
				question: "Wer hat Parla entwickelt?",
				answer:
					"Parla ist ein Prototyp des [CityLAB Berlin](https://www.citylab-berlin.org). Das CityLAB ist Berlins öffentliches Innovationslabor. An der Schnittstelle von Zivilgesellschaft, Verwaltung, Wissenschaft und Wirtschaft nutzen wir die Potenziale der Digitalisierung für eine gemeinwohlorientierte Stadtentwicklung – praxisnah und wirkungsorientiert. Das CityLAB Berlin ist ein Projekt der [Technologiestiftung Berlin](https://www.ts.berlin) und gefördert durch die Berliner Senatskanzlei.\n\nWeitere Informationen zur Entwicklung von Parla finden Sie hier:\n[Blog-Artikel zu Parla](https://citylab-berlin.org/de/blog/parla-intelligentes-wissensmanagement-fuer-verwaltungsdokumente/)\n[Technischer Überblick zu Parla](https://citylab-berlin.org/de/blog/parla-technische-entwicklung-des-neuen-ki-tools/)",
			},
			{
				question: "Kann Parla auch für andere Anwendungsfälle genutzt werden?",
				answer:
					"Parla ist ein Open Source-Projekt und kann für verschiedene Anwendungsfälle und Kontexte angepasst und weiterentwickelt werden. Die Technologie hinter Parla, ein Large Language Model, kann für die Analyse und Verarbeitung von Textdaten in unterschiedlichen Bereichen eingesetzt werden. Interessierte Organisationen oder Entwickler können [Parla auf GitHub](https://github.com/technologiestiftung/parla-frontend) einsehen und eigene Anpassungen vornehmen.\n\nDas CityLAB Berlin steht für Kooperationen und Projekte im Bereich der digitalen Innovation und Stadtentwicklung offen. Wenn Sie Interesse an einer Zusammenarbeit haben oder Parla für spezifische Anwendungsfälle nutzen möchten, kontaktieren Sie uns gerne.",
			},
			{
				question: "Datenschutz und Umgang mit Drittanbietern",
				answer:
					'Parla nutzt das kommerzielle Sprachmodell "GPT-3.5-turbo" von OpenAI. Die Server, auf denen diese Dienstleistung betrieben wird, befinden sich in den Vereinigten Staaten. Im Hinblick auf den Datenschutz, insbesondere unter Berücksichtigung der europäischen Datenschutzverordnungen, raten wir davon ab, persönliche Informationen in Suchanfragen einzugeben. Es ist wichtig, sich der geografischen Lokalisierung der Server und der damit verbundenen Datenschutzbestimmungen bewusst zu sein.',
			},
		],
	},
	footer: {
		imprintLinkText: "Impressum",
		imprintLinkUrl: "https://www.technologiestiftung-berlin.de/impressum",
		privacyLinkText: "Datenschutz",
		privacyLinkUrl:
			"https://www.technologiestiftung-berlin.de/datenschuthttps://www.technologiestiftung-berlin.de/datenschutzz",
		projectOwnerLabel: "Ein Projekt der",
		tSBLogoAltText: "Logo der Technologiesiftung Berlin",
		tSBLogoLink: "https://www.technologiestiftung-berlin.de/",
		projectExecutionerLabel: "Durchgeführt vom",
		cityLABLogoAltText: "Logo des CityLAB Berlin, Berlin's Innovationslabor",
		cityLABLogoLink: "https://citylab-berlin.org/",
		projectSponsorLabel: "Gefördert durch",
		sentatskanzleiLogoAltText: "Logo der Senatskanzlei Berlin",
		sentatskanzleiLogoLink: "https://www.berlin.de/rbmskzl/",
		disclaimerPrefix: "Hinweis:",
		disclaimerContent:
			"Dies ist ein Angebot des CityLAB Berlin und befindet sich in der Testphase.",
	},
};
