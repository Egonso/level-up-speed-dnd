# Druckproduktion

## Prototyp

Empfehlung für den ersten Event-Prototyp:

- A4 Querformat, 8 Karten pro Seite
- 300 g/m² Papier oder normaler Druck plus Laminierung
- Kartenformat: Pokergröße ungefähr 63 x 88 mm, 2 Reihen mit je 4 Karten
- Ecken nach Laminierung schneiden oder abrunden
- Sets mit Gummiband oder kleinen Deckboxen trennen

## Mindestset pro Tisch

| Stapel | Anzahl |
| --- | ---: |
| Heldenkarten | 6 |
| Basisaktionen | 32 gedruckte Kartenflächen |
| Klassenkarten | 28 |
| Szenariokarten | 4 |
| Bosskarten | 4 |
| Raumkarten | 24 |
| Chaoskarten | 24 |
| Lootkarten | 22 |
| Zielkarten | 24 |

Für einen Test reichen 1 komplettes Set plus 1 Reserveausdruck der häufigsten Basisaktionen.

## Optische Regeln

- Heldenkarten: großes Portrait, klare Werte.
- Klassenkarten: dunkle Karten, farbige Typzeile.
- Raumkarten: möglichst schnell lesbar, kaum Flavor.
- Chaoskarten: stärkerer Kontrast, sofort erkennbar.
- Lootkarten: grün/goldener Akzent.
- Zielkarten: hellerer Rahmen, da sie nicht ständig in der Hand liegen.

## Bildworkflow

Die sichtbaren Produktassets werden als generative Rasterbilder erzeugt und lokal gespeichert:

- komplette Imagegen-Karten: `assets/imagegen-cards/`
- optimierte Druckkartenbilder: `assets/print/cards/`
- Spieler-, DM- und Messe-Guides: `assets/imagegen-guides/` und `assets/imagegen-conference/`
- Battlemaps, Flowmaps und Szenario-Motive: `assets/generated/`
- optimierte Map-Druckbilder: `assets/print/maps/` und `assets/print/flow-maps/`

Für den Event-Prototyp gibt es zusätzlich exakte HTML/PDF-Druckdateien, damit Layout, Sortierung und QA reproduzierbar bleiben.

## Druckdateien

| Datei | Zweck |
| --- | --- |
| `print/speed-dnd-cards.pdf` | Kartenset-Prototyp |
| `print/maps-and-components.pdf` | Encounter-Maps, Flow-Maps und Marker |
| `print/conference-guides.pdf` | Spieler-Guides, DM-Guides und Messe-Vorbereitung |

Für Messebetrieb zuerst `conference-guides.pdf` und `maps-and-components.pdf` drucken. Das Kartenset kann danach je Tisch separat sortiert werden.
