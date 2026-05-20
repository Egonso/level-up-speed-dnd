# Maps und Tischmaterial

Dieses Zusatzpaket ergänzt das Kartenset um Material, das am Tisch wirklich fehlt, wenn mehrere Gruppen parallel spielen.

## Enthalten

- 4 szenariospezifische Flow-Maps
- 12 taktische Raum- und Bossmaps
- Imagegen-Encounter-Maps als visuelle Battlemaps
- 4 Blanko-Grids für Improvisation
- Marker für AP, Vorteile, Zustände, Ressourcen, Druck, Instabilität, Glocke und Gegner
- Tisch-Setup-Blatt für DMs
- Spieler- und DM-Guides für Messebetrieb

## Druckdatei

Die druckbare Datei wird aus `data/maps.json` erzeugt:

```bash
node tools/build-maps.mjs
```

Ausgabe:

- `print/maps-and-components.html`
- `print/maps-and-components.pdf`
- `qa/map-counts.txt`

## Einsatz am Tisch

Empfehlung:

1. Pro Tisch genau eine Szenario-Flow-Map auslegen.
2. Verdeckte Raumkarten auf die Raumfelder legen.
3. Für normale Räume eine passende taktische Generic-Map verwenden.
4. Für das Finale die passende Bossmap verwenden.
5. Marker erst bei Bedarf ausgeben, damit der Tisch nicht überladen wird.

Die Flow-Map steuert die Sessionstruktur. Die taktische Map wird nur verwendet, wenn Positionierung relevant wird.

## Messe-Guides

Die druckbaren Messe-Guides werden separat erzeugt:

```bash
node tools/build-conference-guides.mjs
```

Ausgabe:

- `print/conference-guides.html`
- `print/conference-guides.pdf`
- `qa/conference-guides-counts.txt`

Die sichtbaren Guide-Bilder liegen in:

- `assets/imagegen-guides/`
- `assets/imagegen-conference/`

Die präzise Betriebsanleitung steht in `docs/07-konferenzbetrieb.md`.
