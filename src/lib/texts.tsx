export const texts = {
	backText: "Zurück",
	about: {
		title: "Über ki.anfragen",
		content:
			'Dieser Prototyp durchsucht die Schriftlichen Anfragen und die Hauptausschussprotokolle ("Rote Nummern") der Wahlperiode 19 des Berliner Abgeordnetenhauses und erstellt anhand eines Large Language Models Vorlagen für die Beantwortung der gestellten Frage. Die Quellen sind auf parlament-berlin.de/dokumente zu finden.\n Bitte beachten Sie, dass die generierten Antworten zwar aus offiziellen Dokumenten erstellt wurden, aber keine verbindliche Antwort darstellen. Aktuelle KI-Sprachmodelle können zuweilen Informationen inkorrekt aufbereiten. Wir empfehlen, die verlinkten Quellenangaben zu überprüfen.\n Viel Spaß bei der Recherche!',
	},
	faq: {
		title: "FAQ",
		questions: [
			{
				question: "Was ist ki.anfragen?",
				answer:
					"ki.anfragen ist ein Prototyp, der die Schriftlichen Anfragen und die Hauptausschussprotokolle der Wahlperiode 19 des Berliner Abgeordnetenhauses durchsucht und anhand eines Large Language Models Vorlagen für die Beantwortung der gestellten Frage erstellt.",
			},
			{
				question: "Wie funktioniert ki.anfragen?",
				answer:
					"ki.anfragen nutzt ein Large Language Model, um die Schriftlichen Anfragen und die Hauptausschussprotokolle der Wahlperiode 19 des Berliner Abgeordnetenhauses zu durchsuchen. Die Ergebnisse werden dann anhand eines weiteren Large Language Models in eine Antwort umgewandelt.",
			},
			{
				question: "Was ist ein Large Language Model?",
				answer:
					"Ein Large Language Model ist ein KI-Modell, das auf Basis von Texten trainiert wurde und in der Lage ist, Texte zu verstehen und zu generieren. ki.anfragen nutzt zwei verschiedene Large Language Models. Das erste Large Language Model wurde auf Basis von Texten aus dem Berliner Abgeordnetenhaus trainiert. Das zweite Large Language Model wurde auf Basis von Texten aus dem Internet trainiert.",
			},
			{
				question: "Was ist eine Schriftliche Anfrage?",
				answer:
					"Eine Schriftliche Anfrage ist ein Instrument der parlamentarischen Kontrolle. Sie wird von Abgeordneten an den Senat gerichtet und muss innerhalb von vier Wochen beantwortet werden. Die Antworten werden in den Drucksachen des Abgeordnetenhauses veröffentlicht.",
			},
			{
				question: "Was ist ein Hauptausschussprotokoll?",
				answer:
					"Die Hauptausschussprotokolle sind die Protokolle der Sitzungen des Hauptausschusses des Berliner Abgeordnetenhauses. Der Hauptausschuss ist der wichtigste Ausschuss des Abgeordnetenhauses. Er ist zuständig für die Vorbereitung der Plenarsitzungen und die Kontrolle der Senatsverwaltungen.",
			},
			{
				question: "Wie kann ich die Ergebnisse bewerten?",
				answer:
					"Die Ergebnisse sind nicht verbindlich. Sie wurden zwar aus offiziellen Dokumenten erstellt, aber KI-Sprachmodelle können zuweilen Informationen inkorrekt aufbereiten. Wir empfehlen, die verlinkten Quellenangaben zu überprüfen.",
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
		cooperationLabel:
			"Unterstützt durch die Senatsverwaltung für Wissenschaft, Gesundheit und Pflege (SenWGP).",
		projectSponsorLabel: "Gefördert durch",
		sentatskanzleiLogoAltText: "Logo der Senatskanzlei Berlin",
		sentatskanzleiLogoLink: "https://www.berlin.de/rbmskzl/",
		disclaimerPrefix: "Hinweis:",
		disclaimerContent:
			"Dies ist ein Angebot des CityLAB Berlin und befindet sich in der Testphase.",
	},
};
