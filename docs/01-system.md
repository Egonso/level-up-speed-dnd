# Speed-DND-System

## Designziel

Speed DND soll sich nach D&D anfühlen, aber ohne Charakterbogen funktionieren. Spieler müssen in ihrem Zug nur drei Fragen beantworten:

1. Wo stehe ich?
2. Welche Karte spiele ich?
3. Was würfle ich?

Alle relevanten Werte stehen auf Karten: Attack Bonus, Schaden, Reichweite, Spell Save DC, Ressourcen und AP-Kosten.

## Grundsetup

- Level: 4
- Gruppe: 3 bis 6 Helden
- Tischdauer: 30 bis 45 Minuten
- Map: Startfeld, 8 bis 10 verdeckte Raumkarten, 1 Bossraum
- Startressourcen: volle HP, volle Zauberplätze, volle Klassenressourcen
- Rast: keine Long Rest während der Mission; einmal pro Mission darf der DM nach einem ungefährlichen Raum eine kurze Verschnaufpause erlauben.

## AP-System

Jeder Held startet seinen Zug mit 6 AP.

| Aktion | Kosten | Limit |
| --- | ---: | --- |
| Normale Aktion | 2 AP | beliebig, solange AP reichen |
| Bonus Action | 1 AP | maximal 1 pro Zug |
| Bewegung | 1 AP pro 3 Felder | beliebig, solange AP reichen |
| Reaktion | 0 AP | maximal 1 pro Runde |
| Freie Interaktion | 0 AP | 1 kleine Sache pro Zug |

Beispiele:

- Angriff + 6 Felder Bewegung + Bonus Action: 2 + 2 + 1 = 5 AP.
- Zauber + zweiter Zauber als Aktion + 3 Felder Bewegung: 2 + 2 + 1 = 5 AP, wenn Zauberplätze reichen.
- Sprint + Angriff + 6 Felder Bewegung: 2 + 2 + 2 = 6 AP.

## Würfelkern

- Angriff: `d20 + Attack Bonus` gegen AC.
- Save: Ziel würfelt `d20 + Save Bonus` gegen DC der Karte.
- Skill Check: `d20 + passender Bonus` gegen DC auf der Raumkarte.
- Vorteil/Nachteil: wie 5e, zwei d20 werfen, besseres/schlechteres Ergebnis zählt.
- Natürliche 20: Treffer und ein zusätzlicher Schadenswürfel.
- Natürliche 1: Fehlschlag; DM darf eine kleine Komplikation erzählen.

## Tod und Rettung

Bei 0 HP ist ein Held am Boden und kann keine Karten spielen. Am Ende seines Zuges würfelt er einen Death Save:

- `10+` = Erfolg
- `9 oder weniger` = Fehlschlag
- 3 Erfolge = stabil bei 0 HP
- 3 Fehlschläge = ausgeschaltet für diese Mission

Heilung bringt einen Helden sofort zurück in den Zug. Ein anderer Held kann mit `Stabilisieren` einen DC-10-Check versuchen.

## Kartenarten

| Kartenart | Zweck |
| --- | --- |
| Heldenkarte | AC, HP, Speed, Ressourcen, DCs, Kernrolle |
| Basisaktion | Aktionen, die alle können |
| Klassenkarte | Klassenfeatures, Angriffe, Zauber, besondere Reaktionen |
| Szenariokarte | Mission, Bossraum, Zeitdruck, Storyton |
| Raumkarte | verdeckter Map-Inhalt: Kampf, Hinweis, Falle, Loot |
| Chaoskarte | unerwartetes Ereignis, meist bei Raumwechsel oder DM-Trigger |
| Lootkarte | einmalige Items oder kleine Missionvorteile |
| Zielkarte | persönliche Klassenziele für zusätzliche Entscheidungsmomente |

## Encounter-Map

Empfohlenes Layout für 30 bis 45 Minuten:

```text
Start -> Raum A -> Raum B -> Raum C
              \\       |        /
               Raum D -> Raum E
                    \\       /
                    Raum F -> Bossraum
```

Vor Spielbeginn mischt der DM 10 Raumkarten und legt 6 bis 8 davon verdeckt auf die Map. Die Spieler dürfen die verdeckten Karten auf die verfügbaren Raumplätze verteilen. Dadurch fühlt sich jede Runde anders an, ohne dass der DM jedes Mal neu vorbereiten muss.

## Balancing-Leitlinien

- Ein normaler Raum soll 1 bis 2 Runden dauern.
- Ein Boss soll 3 bis 4 Runden tragen.
- Ein einzelner Held soll in einem schlechten Raum nicht sofort sterben.
- Chaoskarten sollen Entscheidungen ändern, nicht das Spiel allein gewinnen oder verlieren.
- Heilung ist absichtlich knapp, damit Bewegung, Hinweise und Fallen ernst genommen werden.

## DM-Prinzip

Der DM liest keine langen Box-Texte vor. Jede Raumkarte gibt nur den mechanischen Kern. Die Story wird an das aktuelle Szenario angepasst:

- Bankraub: Der gleiche Fallenraum ist ein Sicherheitsgang.
- Drachenei: Der gleiche Fallenraum ist ein Kristallschacht.
- Akademie: Der gleiche Fallenraum ist ein defektes Uhrwerk.
- Schattenpass: Der gleiche Fallenraum ist ein brüchiger Steg.

