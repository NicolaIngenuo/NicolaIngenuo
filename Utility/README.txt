=================================================
  CARTELLA UTILITY - GESTIONE TESSERE ABBONAMENTO
=================================================

Questa cartella contiene i file necessari per il funzionamento
dell'applicazione di gestione tessere abbonamento.

STRUTTURA FILE RICHIESTI:
========================

1. sfondo-fronte.png
   - Immagine di sfondo per il FRONTE della tessera
   - Dimensioni consigliate: 1000x630px o superiori
   - Formato: PNG (nome ESATTO: sfondo-fronte.png)
   - ⚠️ IMPORTANTE: Il nome deve essere esatto (con trattino)

2. sfondo-retro.png
   - Immagine di sfondo per il RETRO della tessera
   - Dimensioni consigliate: 1000x630px o superiori
   - Formato: PNG (nome ESATTO: sfondo-retro.png)
   - ⚠️ IMPORTANTE: Il nome deve essere esatto (con trattino)

3. database_abbonamenti.xlsx
   - Database Excel con tutti gli abbonamenti
   - Viene creato automaticamente se non esiste
   - Backup automatico consigliato

CARICAMENTO AUTOMATICO:
======================

⚠️ IMPORTANTE: Il caricamento automatico funziona SOLO se apri il file
da un server HTTP (es. http://localhost:8080).

Se apri il file direttamente (doppio click), dovrai usare il pulsante
"Ricarica Sfondi" o caricare manualmente i file.

Quando usi un server HTTP, il sistema cercherà automaticamente:

✓ Utility/sfondo-fronte.png
✓ Utility/sfondo-retro.png

Se i file sono presenti con i nomi ESATTI, clicca il pulsante
"Ricarica Sfondi" (icona circolare) e vedrai una notifica verde.

Se mancano o preferisci caricarli manualmente, usa i pulsanti:
- "Sfondo Fronte (Opzionale)"
- "Sfondo Retro (Opzionale)"

NOTE IMPORTANTI:
===============

- I nomi dei file devono essere ESATTI (minuscole, con trattino)
- La cartella Utility deve essere allo stesso livello del file HTML
- Le immagini vengono salvate nel database come Base64
- Backup regolare del database consigliato
- Caricamento automatico richiede server HTTP (non file://)

STRUTTURA DIRECTORY:
===================

📁 TuaCartella/
├── gestione_tessere_abbonamento.html  ← File principale
└── 📁 Utility/
    ├── sfondo-fronte.png              ← Sfondo fronte tessera
    ├── sfondo-retro.png               ← Sfondo retro tessera
    └── database_abbonamenti.xlsx      ← Database abbonamenti
