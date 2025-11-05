=================================================
  CARTELLA UTILITY - GESTIONE TESSERE ABBONAMENTO
=================================================

Questa cartella contiene i file necessari per il funzionamento
dell'applicazione di gestione tessere abbonamento.

STRUTTURA FILE RICHIESTI:
========================

1. sfondo_fronte.jpg (o .png)
   - Immagine di sfondo per il FRONTE della tessera
   - Dimensioni consigliate: 1000x630px o superiori
   - Formato: JPEG o PNG

2. sfondo_retro.jpg (o .png)
   - Immagine di sfondo per il RETRO della tessera
   - Dimensioni consigliate: 1000x630px o superiori
   - Formato: JPEG o PNG

3. database_abbonamenti.xlsx
   - Database Excel con tutti gli abbonamenti
   - Viene creato automaticamente se non esiste
   - Backup automatico consigliato

CARICAMENTO AUTOMATICO:
======================

All'apertura dell'applicazione, il sistema cercherà
automaticamente questi file nella cartella Utility:

✓ Utility/sfondo_fronte.jpg (o .png)
✓ Utility/sfondo_retro.jpg (o .png)
✓ Utility/database_abbonamenti.xlsx

Se i file sono presenti, verranno caricati automaticamente.
Se mancano, potrai caricarli manualmente tramite l'interfaccia.

NOTE IMPORTANTI:
===============

- I nomi dei file devono essere ESATTI (minuscole)
- La cartella Utility deve essere allo stesso livello del file HTML
- Le immagini vengono salvate nel database come Base64
- Backup regolare del database consigliato

STRUTTURA DIRECTORY:
===================

📁 TuaCartella/
├── gestione_tessere_abbonamento.html  ← File principale
└── 📁 Utility/
    ├── sfondo_fronte.jpg              ← Sfondo fronte tessera
    ├── sfondo_retro.jpg               ← Sfondo retro tessera
    └── database_abbonamenti.xlsx      ← Database abbonamenti
