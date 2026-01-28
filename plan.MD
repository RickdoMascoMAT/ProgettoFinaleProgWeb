# Piano Rimanente - Hypixel SkyBlock Stats Tracker

> Stato attuale: Tutti i requisiti dell'esame sono stati completati. Il progetto è pronto per la consegna.

---

## Requisiti Esame - COMPLETATI

### Requisiti Minimi (18 punti)

- [x] Struttura base (`components/`, `pages/`)
- [x] Routing con 2+ pagine (Home, Profile, Auctions, 404)
- [x] TypeScript base (interfacce, props tipizzate)
- [x] React Query GET con visualizzazione dati

### Requisiti Avanzati

- [x] Struttura articolata (componenti riutilizzabili, tipi separati)
- [x] Chiamate API: async/await + React Query + POST mock
- [x] Gestione errori per ogni chiamata
- [x] Routing avanzato (parametri dinamici, navigazione con dati, 404)
- [x] TypeScript avanzato (interfacce multiple, alias, generics, union/intersection)
- [x] Qualità codice (leggibilità, naming, struttura)
- [x] UI/UX (design, componenti, loading states)

### README

- [x] Descrizione e scopo
- [x] Istruzioni installazione
- [x] API utilizzate
- [x] Credenziali/mock
- [x] Struttura progetto
- [x] Funzionalità completate

---

## Task Opzionali (se hai tempo)

### 1. Deploy su Vercel/Netlify

**Tempo stimato**: 30-60 min

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel
```

- Crea account su vercel.com
- Collega il repository GitHub
- Imposta variabili d'ambiente se necessario
- Aggiungi link deploy nel README

---

### 2. Sistema Mock Completo

**Tempo stimato**: 1-2 ore

Crea `src/services/mockData.ts`:

```typescript
export const mockPlayer = {
  /* dati da data/player.json */
};
export const mockProfiles = {
  /* dati da data/profiles.json */
};
```

Modifica gli hook per usare mock se manca API key.

---

### 3. Dark/Light Mode

**Tempo stimato**: 1-2 ore

- Crea `useTheme.ts` hook con localStorage
- Usa Tailwind `dark:` classes
- Aggiungi toggle button in HomePage

---

### 4. Testing Base

**Tempo stimato**: 2-3 ore

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Crea test semplici per PlayerCard e usePlayer.

---

### 5. Bazaar Page

**Tempo stimato**: 2-3 ore

- Crea `src/pages/BazaarPage.tsx` con lista prodotti del Bazaar
- Usa endpoint `GET /skyblock/bazaar` (non richiede API key)
- Mostra prezzi buy/sell per ogni item
- Aggiungi ricerca e ordinamento per prezzo

---

### 6. Networth Calculator

**Tempo stimato**: 3-4 ore

- Calcola il valore totale dell'inventario di un player
- Usa i prezzi del Bazaar + Auction House per stimare il valore
- Mostra breakdown per categoria (armor, weapons, accessories, etc.)

---

### 7. Skills & Slayers Display

**Tempo stimato**: 2-3 ore

- Nella ProfilePage, aggiungi sezione per mostrare:
  - Livelli skills (Mining, Farming, Combat, etc.)
  - Progressi Slayer (Zombie, Spider, Wolf, etc.)
  - Dungeon stats (Catacombs level, classe preferita)

---

### 8. Auction Notifications

**Tempo stimato**: 2-3 ore

- Permetti all'utente di "watchare" un item
- Mostra notifica quando un'asta con quell'item appare sotto un certo prezzo
- Usa localStorage per salvare le watchlist

---

### 9. Player Comparison

**Tempo stimato**: 3-4 ore

- Permetti di confrontare 2 player side-by-side
- Mostra differenze in skills, networth, collections
- URL tipo `/compare/:player1/:player2`

---

### 10. Collections Progress

**Tempo stimato**: 2-3 ore

- Mostra le collections del player con progress bar
- Indica quali sono complete e quali mancano
- Ordina per % completamento

---

### 11. Responsive Design Migliorato

**Tempo stimato**: 1-2 ore

- Ottimizza tutte le pagine per mobile
- Usa Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- Testa su diversi screen sizes

---

### 12. Animations & Transitions

**Tempo stimato**: 1-2 ore

- Aggiungi animazioni di caricamento più fluide
- Transizioni tra pagine con Framer Motion
- Hover effects sui componenti

---

## Suggerimenti per la Presentazione

Quando presenti il progetto, evidenzia:

1. **Struttura**: Mostra la cartella `src/` organizzata
2. **TypeScript**: Apri `types/advanced.ts` per mostrare generics e union
3. **React Query**: Mostra `usePlayer.ts` e come gestisce loading/error
4. **POST Mock**: Mostra `saveUserPreferences` in `favoritesApi.ts`
5. **Routing**: Naviga da Home → Profile mostrando il parametro `:username`
6. **404**: Vai su un URL inesistente per mostrare NotFoundPage

---

## Checklist Finale Prima della Consegna

- [ ] Build passa senza errori (`npm run build`)
- [ ] Tutte le pagine funzionano (Home, Profile, Auctions, 404)
- [ ] README completo con tutte le sezioni richieste
- [ ] Repository GitHub pubblico o accessibile
- [ ] (Opzionale) Link al deploy funzionante
