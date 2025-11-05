# 🎫 Gestione Tessere Abbonamento

Sistema professionale per la creazione e stampa di tessere abbonamento in formato carta di credito (85.6mm x 53.98mm).

## 📋 Caratteristiche Principali

- ✅ **Applicazione Single-Page**: Tutto contenuto in un singolo file HTML
- ✅ **Database Excel**: Gestione completa con auto-incremento ID
- ✅ **Preview Live**: Visualizzazione in tempo reale delle tessere
- ✅ **PDF di Alta Qualità**: Generazione PDF pronto per la stampa professionale
- ✅ **Stampa Singola o Multipla**: Fino a 4 tessere per sessione
- ✅ **Formato Standard**: Dimensioni carta di credito (85.6mm x 53.98mm)
- ✅ **QR Code Support**: Integrazione opzionale QR code
- ✅ **Interfaccia Moderna**: Design responsive e professionale
- ✅ **Ricerca e Filtri**: Sistema di ricerca abbonamenti intuitivo

## 🚀 Come Iniziare

### Requisiti
- Browser moderno (Chrome, Firefox, Edge) con JavaScript abilitato
- Connessione internet (solo al primo avvio per caricare le librerie CDN)

### Primo Avvio

1. **Apri il file**
   - Fai doppio click su `gestione_tessere_abbonamento.html`
   - Oppure aprilo con il tuo browser preferito

2. **Crea o Carica Database**
   - Clicca su "Nuovo Database" per iniziare da zero
   - Oppure clicca su "Carica Database Esistente" per importare un database Excel

## 📝 Utilizzo

### Creazione Nuovo Abbonamento

1. **Carica Immagine di Sfondo** (opzionale)
   - Clicca su "Immagine di Sfondo (Fronte)"
   - Seleziona un'immagine JPEG o PNG
   - L'immagine verrà mostrata sul fronte della tessera

2. **Inserisci Dati Abbonato**
   - **Nome**: Nome dell'abbonato (obbligatorio)
   - **Cognome**: Cognome dell'abbonato (obbligatorio)
   - **Data Emissione**: Impostata di default sulla data odierna
   - **Data Scadenza**: Calcolata automaticamente (+365 giorni)

3. **Carica QR Code** (opzionale)
   - Clicca su "QR Code"
   - Seleziona un'immagine PNG o JPEG del QR code
   - Verrà mostrato sul retro della tessera

4. **Preview in Tempo Reale**
   - L'anteprima si aggiorna automaticamente mentre inserisci i dati
   - Visualizza sia fronte che retro della tessera

5. **Genera Abbonamento**
   - Clicca su "Genera e Salva Abbonamento"
   - Il sistema:
     - Salva l'abbonamento nel database
     - Genera automaticamente il PDF
     - Scarica il PDF sul tuo computer
     - Incrementa il numero progressivo

### Ristampa Abbonamenti

1. **Ricerca Abbonamento**
   - Usa la barra di ricerca per trovare abbonamenti per:
     - Nome
     - Cognome
     - Numero progressivo

2. **Selezione Abbonamenti**
   - Seleziona fino a 4 abbonamenti tramite checkbox
   - Il contatore mostra quanti ne hai selezionati
   - Le card selezionate vengono evidenziate

3. **Stampa**
   - Clicca su "Stampa Selezionati"
   - Il sistema genera:
     - **1 abbonamento**: PDF con 2 pagine (fronte/retro)
     - **2-4 abbonamenti**: PDF ottimizzato con layout griglia

### Gestione Database

#### Esporta Database
- Clicca su "Esporta Database"
- Salva il file Excel sul tuo computer
- **Importante**: Salva regolarmente per non perdere dati

#### Carica Database Esistente
- Clicca su "Carica Database Esistente"
- Seleziona un file `.xlsx` precedentemente esportato
- Il sistema caricherà tutti gli abbonamenti

## 📊 Struttura Database Excel

Il database viene salvato in formato Excel con le seguenti colonne:

| Colonna | Descrizione | Tipo |
|---------|-------------|------|
| ID_Progressivo | Numero univoco auto-incrementale | Numero |
| Nome | Nome dell'abbonato | Testo |
| Cognome | Cognome dell'abbonato | Testo |
| Data_Emissione | Data di emissione abbonamento | Data |
| Data_Scadenza | Data di scadenza abbonamento | Data |
| Path_QRCode | Percorso virtuale QR code | Testo |
| Path_Immagine | Riferimento immagine sfondo | Testo |
| Sfondo_Base64 | Immagine codificata in Base64 | Testo |
| QR_Base64 | QR code codificato in Base64 | Testo |

## 🖨️ Stampa Tessere

### Formato PDF

#### Stampa Singola
- **Pagina 1**: Fronte della tessera
- **Pagina 2**: Retro della tessera
- Orientamento: Landscape
- Dimensioni: 85.6mm x 53.98mm centrate su foglio A4
- Include linee di taglio agli angoli

#### Stampa Multipla (2-4 tessere)
- Layout ottimizzato su foglio A4 portrait
- Ogni pagina contiene fronti o retro alternati
- Linee di taglio per separare le tessere
- Risparmio carta grazie al layout griglia

### Consigli per la Stampa

1. **Impostazioni Stampante**
   - Qualità: Alta/Best
   - Tipo Carta: Cartoncino (200-300 g/m²)
   - Scala: 100% (non adattare alla pagina)

2. **Carta Consigliata**
   - Cartoncino bianco 250 g/m²
   - Carta plastificata per maggiore durata
   - Carta fotografica per migliore resa colori

3. **Post-Stampa**
   - Taglia lungo le linee di riferimento
   - Arrotonda gli angoli con taglierina apposita
   - Opzionale: plastifica per protezione

## 🎨 Personalizzazione Tessere

### Fronte della Tessera
- **Immagine di Sfondo**: Personalizza con il tuo logo o design
- **Numero Progressivo**: Appare automaticamente in basso a destra
- **Stile**: Numero bianco con ombra per leggibilità

### Retro della Tessera
- **Header**: "ABBONAMENTO" con stile professionale
- **Dati**: Nome, Cognome, Data Scadenza
- **QR Code**: Opzionale, centrato in basso
- **Sfondo**: Gradiente grigio elegante

### Suggerimenti Design
- Usa immagini ad alta risoluzione (min 1000x630px)
- Mantieni elementi importanti lontani dai bordi
- Testa colori su stampa prima della produzione

## 🔒 Privacy e Sicurezza

- ✅ **Dati Locali**: Tutti i dati rimangono sul tuo computer
- ✅ **Nessun Server**: L'applicazione funziona completamente offline (dopo il primo caricamento)
- ✅ **Privacy Totale**: Nessun dato viene inviato a server esterni
- ✅ **Backup Consigliato**: Esporta regolarmente il database

## 🛠️ Risoluzione Problemi

### Il database non si carica
- Verifica che il file sia in formato `.xlsx`
- Controlla che il file non sia corrotto
- Prova a creare un nuovo database

### L'immagine non appare nella preview
- Verifica il formato (solo JPEG/PNG supportati)
- Controlla la dimensione del file (max 10MB consigliato)
- Ricarica la pagina e riprova

### Il PDF non si scarica
- Verifica che il browser permetta i download
- Controlla le impostazioni popup
- Prova con un browser diverso

### La stampa non ha la dimensione corretta
- Imposta scala 100% nelle impostazioni di stampa
- Non usare "Adatta alla pagina"
- Verifica le impostazioni margini

## 📦 Librerie Utilizzate

- **SheetJS (xlsx)**: Gestione file Excel
- **jsPDF**: Generazione PDF
- **html2canvas**: Conversione HTML in immagini
- **QRCode.js**: Gestione QR code

## 🔄 Aggiornamenti e Backup

### Backup Consigliato
1. Esporta il database settimanalmente
2. Salva i file Excel in una cartella sicura
3. Considera backup cloud per maggiore sicurezza

### Aggiornamento Dati
- Per modificare un abbonamento: crea una nuova tessera con dati aggiornati
- Esporta il database prima di qualsiasi modifica importante

## 💡 Suggerimenti Avanzati

### Ottimizzazione Workflow
1. Prepara tutte le immagini di sfondo in una cartella
2. Genera QR code in batch se necessario
3. Crea abbonamenti in blocco e stampa insieme
4. Esporta database dopo ogni sessione di lavoro

### Utilizzo Professionale
- Usa template grafici coerenti
- Mantieni database organizzato
- Testa stampe su carta normale prima della produzione
- Crea procedure standard per l'emissione tessere

## 📞 Supporto

Per problemi o domande:
- Verifica questa documentazione
- Controlla la console del browser per errori (F12)
- Assicurati di usare un browser aggiornato

## 📄 Licenza

Applicazione fornita "as-is" per uso personale e professionale.

---

**Versione**: 1.0
**Ultimo Aggiornamento**: 2025
**Compatibilità**: Chrome, Firefox, Edge (ultime versioni)
