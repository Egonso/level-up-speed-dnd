# Level-Up Speed DND

Schnelles, kartenbasiertes D&D-Eventspiel für Messen, Schulen, Elternvereine und kurze Promo-Slots.

Das Ziel: Menschen ohne D&D- oder TTRPG-Erfahrung sollen in 2 Minuten am Tisch sein, in 25 bis 45 Minuten eine komplette Mission erleben und dabei echte taktische Entscheidungen treffen. Es gibt keine Charakterbögen. Alles Wichtige steht auf Karten, Guides und Maps.

## Start Hier

Für Chui oder neue DMs:

1. Lies zuerst `BEDIENUNGSANLEITUNG.md`.
2. Drucke diese drei Dateien:
   - `print/speed-dnd-cards.pdf`
   - `print/maps-and-components.pdf`
   - `print/conference-guides.pdf`
3. Sortiere die Karten nach Decks: Helden, Basisaktionen, Klassenkarten, Szenario, Ziele, Boss, Raum, Loot, Chaos.
4. Lege eine Szenario-Flowmap in die Tischmitte.
5. Erkläre nur: `6 AP pro Zug`, `Aktion 2 AP`, `Bonus Action 1 AP`, `3 Felder Bewegung 1 AP`.
6. Starte sofort mit der Frage: `Welchen Raum betretet ihr zuerst?`

## Was Im Set Ist

- 6 Helden: Rogue, Bard, Fighter, Wizard, Druid, Barbarian.
- 158 gedruckte Kartenflächen aus 103 eindeutigen Kartendaten.
- 4 Szenarien: Mitternachtsbank, Kristallhort, Akademie-Glocke, Schattenpass.
- 5 Flowmaps: 1 neutrale Grundmap und 4 Szenario-Maps.
- 12 taktische Encounter-Maps mit sichtbarem Raster.
- 4 Blanko-Grids für spontane Räume.
- 144 Marker für AP, Zustände, Ressourcen, Gegner und Druck.
- Spieler-, DM- und Messe-Guides als druckbare Seiten.

## Wichtigste Dateien

| Datei | Zweck |
| --- | --- |
| `BEDIENUNGSANLEITUNG.md` | Sofort-Anleitung für Vorbereitung und Durchführung. |
| `print/speed-dnd-cards.pdf` | Kartendeck für den Tisch. |
| `print/maps-and-components.pdf` | Flowmaps, taktische Maps, Blanko-Grids und Marker. |
| `print/conference-guides.pdf` | Anfängerhilfen, DM-Spickzettel und Messe-Checklisten. |
| `data/cards.json` | Editierbare Karten-Datenbasis. |
| `data/maps.json` | Editierbare Map- und Marker-Datenbasis. |
| `docs/01-system.md` | AP-System, Würfelkern und Balancing. |
| `docs/02-szenarien.md` | Missionen, Ziele, Bossräume und Story-Hooks. |
| `docs/03-dm-guide.md` | DM-Ablauf und Einschulung. |
| `docs/07-konferenzbetrieb.md` | Messestand, Encounter-Maps, Reset und Anfängerführung. |

## Druckdateien Neu Bauen

Voraussetzung: Node.js und Google Chrome oder Chromium.

```bash
npm run build
npm run render:pdfs
npm run audit
```

PDFs werden aus den HTML-Dateien im Ordner `print/` gerendert. Die bereits enthaltenen PDFs sind der aktuelle Stand für das Event.

## Designstand

Die Maps und der Großteil der Karten sind als generative Rasterbilder erzeugt und im Projekt gespeichert. Für das Event ist die Priorität bewusst: visuell starke Maps, schnelle Lesbarkeit, robuste Anfängerführung. Einige Zielkarten sind deshalb klare Textkarten statt einzelner Vollbild-Artworks.
