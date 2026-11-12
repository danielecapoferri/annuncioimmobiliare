# Prototipo · Entry point Immobiliare.it Mutui nel dettaglio annuncio

Prototipo navigabile della pagina annuncio mobile (fino a 768 px). Sopra i 768 px mostra un messaggio con QR code per aprirlo da smartphone.

## Pubblicazione su GitHub Pages
1. Crea un nuovo repository su GitHub (anche privato va bene con un piano che supporta Pages, altrimenti pubblico).
2. Carica il contenuto di questa cartella nella radice del repository (index.html deve stare nella radice): "Add file" → "Upload files", trascina tutti i file e le cartelle `assets` e `js`, poi "Commit changes".
3. Vai su Settings → Pages → "Build and deployment": Source = "Deploy from a branch", Branch = `main` / `(root)` → Save.
4. Dopo 1–2 minuti il link è in alto nella stessa pagina (es. `https://nomeutente.github.io/nome-repo/`).

## Cosa funziona
1. Galleria: swipe e frecce in alto, 5 foto + slide Mutuo, poi loop. Tap su foto o "Vedi foto" apre la galleria.
2. Icona foto sotto la galleria: apre la galleria.
3. Tile "Mutuo": scroll al calcolatore.
4. "Mutuo · 848€ al mese" sotto il prezzo: link simulazione.
5. Banner Mutui: link simulazione.
6. Chip "Quanto mutuo posso ottenere?": apre l'Assistente AI (bottom sheet, "Sto elaborando…", risposta in streaming, card Mutui con link).
7. "Hai bisogno del mutuo?": link simulazione.
8. "Scoprilo subito" nel calcolatore: link simulazione.
Galleria a schermo intero: "Indietro" e tessera Mutuo (link). Tutti i link si aprono in una nuova scheda.
