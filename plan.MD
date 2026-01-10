# Roadmap 20 giorni - Hypixel SkyBlock Stats Tracker

> Obiettivo: completare FASE 1 + FASE 2 + una parte selezionata di FASE 3, con tempo per README e deploy.

---

## Giorno 1 – Setup progetto e tipi base

- [ ] Inizializzare progetto (Vite + React + TypeScript) e installare dipendenze principali:
    - react-router-dom
    - @tanstack/react-query
    - axios
    - tailwindcss (se già pensi alla UI)
- [ ] Configurare struttura cartelle base:
    - `src/components/`
    - `src/pages/`
    - `src/services/`
    - `src/hooks/`
    - `src/types/`
- [ ] Creare `src/types/index.ts`:
    - [ ] Definire alias: `type UUID = string`, `type Timestamp = number`, `type HypixelRank = "VIP" | "MVP" | "NONE" | ...`
    - [ ] Utility: `type Optional<T> = T | null`, `type Loading<T> = { isLoading: boolean; data?: T }`
- [ ] TODO del giorno: progetto compila senza errori, struttura base pronta.

---

## Giorno 2 – Tipi API + tipi player

- [ ] Creare `src/types/api.ts`:
    - [ ] `interface HypixelApiResponse<T> { success: boolean; cause?: string; data?: T; }`
    - [ ] `PlayerApiResponse`, `ProfileApiResponse` (senza essere troppo dettagliato, basta il minimo per iniziare).
- [ ] Creare `src/types/player.ts`:
    - [ ] `interface Player { uuid: UUID; username: string; rank: HypixelRank; ... }`
    - [ ] `interface SkyblockProfile { profileId: UUID; cuteName: string; ... }`
    - [ ] `interface PlayerCardProps { player: Player; profile?: SkyblockProfile; }`
- [ ] Controllare che i tipi siano usabili nei componenti futuri.

---

## Giorno 3 – Routing base e pagine minime

- [ ] Configurare routing in `src/App.tsx`:
    - [ ] Setup `BrowserRouter`, layout semplice con navbar e `<Outlet />`.
- [ ] Creare `src/pages/HomePage.tsx`:
    - [ ] Layout con form di ricerca username e una breve descrizione dell’app.
- [ ] Creare `src/pages/ProfilePage.tsx` (versione semplice, senza param dinamico):
    - [ ] Placeholder per mostrare le statistiche del player.
- [ ] Verificare che le due pagine funzionino con il routing (requisito minino soddisfatto lato pagine).

---

## Giorno 4 – Setup React Query + client Hypixel

- [ ] Installare e configurare React Query Provider nel root (es. `main.tsx`).
- [ ] Creare `src/services/hypixelApi.ts`:
    - [ ] Configurare base URL Hypixel API.
    - [ ] Definire una funzione base per fare GET generic con `async/await`.
- [ ] Ottenere/annotare la API key Hypixel (anche se in codice userai `.env` più avanti).

---

## Giorno 5 – Hook usePlayer + prima visualizzazione

- [ ] Creare `src/hooks/usePlayer.ts`:
    - [ ] Hook che usa React Query per ottenere dati player da username o uuid.
    - [ ] Gestire stati: `isLoading`, `isError`, `data`.
- [ ] Creare `src/components/PlayerCard.tsx`:
    - [ ] Usa `PlayerCardProps` tipizzato.
    - [ ] Visualizza info base: username, rank, profilo principale.
- [ ] Collegare da `HomePage` la ricerca che porta a `ProfilePage` e mostra `PlayerCard`.
- [ ] Obiettivo: **FASE 1** praticamente completa (minimo per sufficienza).

---

## Giorno 6 – Refine FASE 1 + buffer

- [ ] Rifinire codice di FASE 1:
    - [ ] Pulizia import, naming coerente, commenti essenziali.
    - [ ] Migliorare visualizzazione base di `PlayerCard` (senza design complesso).
- [ ] Verificare che:
    - [ ] Routing base funzioni.
    - [ ] Una chiamata GET con React Query funzioni (requisito d’esame).
- [ ] Tenere questo giorno come **buffer** se sei rimasto indietro.

---

## Giorno 7 – Componenti riutilizzabili core

- [ ] Creare `src/components/StatDisplay.tsx`:
    - [ ] Componente generico per label + valore + icona/colore.
- [ ] Creare `src/components/ItemCard.tsx`:
    - [ ] Card per item (placeholder, poi lo userai con bazaar/auctions).
- [ ] Creare `src/components/LoadingSpinner.tsx` e `src/components/ErrorMessage.tsx`:
    - [ ] Per uniformare stati di loading ed errore in tutta l’app.
- [ ] Iniziare a usare questi componenti in `PlayerCard` / `ProfilePage`.

---

## Giorno 8 – Tipi separati per domain

- [ ] Creare `src/types/auctions.ts`:
    - [ ] `AuctionItem`, `AuctionBid`, ecc. (solo i campi che userai).
- [ ] Creare `src/types/items.ts` e `src/types/bazaar.ts`:
    - [ ] Tipi base per items e prezzi bazaar.
- [ ] Creare (se serve) `src/types/advanced.ts`:
    - [ ] Union/intersection types e qualche utility migliore per Hypixel (es. `type SkyblockProfileType = "ironman" | "stranded" | ...`).

---

## Giorno 9 – Service auctions con async/await + POST mock

- [ ] Creare `src/services/auctionApi.ts`:
    - [ ] Funzione che usa `async/await` per ottenere auctions (senza React Query).
- [ ] Creare `src/services/favoritesApi.ts`:
    - [ ] Implementare chiamata POST mock usando `localStorage` per salvare player preferiti.
- [ ] Creare `src/utils/apiErrorHandler.ts`:
    - [ ] Funzione centralizzata per gestire errori API e messaggi user-friendly.

---

## Giorno 10 – Hook useAuctions + routing avanzato

- [ ] Creare `src/hooks/useAuctions.ts`:
    - [ ] Hook che usa React Query per auctions (può usare `auctionApi.ts` oppure chiamare direttamente).
- [ ] Refactor `ProfilePage`:
    - [ ] Usare parametro dinamico `:uuid` nell’URL.
- [ ] Creare `src/pages/NotFoundPage.tsx`:
    - [ ] Pagina 404 con link per tornare a Home.
- [ ] Creare `src/hooks/useNavigationState.ts`:
    - [ ] Permettere passaggio dati player da Home a Profile senza solo l’URL.

---

## Giorno 11 – Hook generico + TypeScript avanzato

- [ ] Creare `src/hooks/useApiData.ts`:
    - [ ] Hook generico con `useApiData<T>` che wrappa React Query (o parte della logica).
- [ ] Migliorare `src/types/advanced.ts`:
    - [ ] Usare union, intersection e alias dove ha senso.
- [ ] Creare `src/utils/typeGuards.ts`:
    - [ ] Aggiungere 1–2 type guard semplici per response API (es. controllo campi essenziali).

---

## Giorno 12 – Rifinitura FASE 2 + mini review

- [ ] Controllare che i requisiti avanzati d’esame siano coperti:
    - [ ] Almeno due chiamate API (una con async/await, una con React Query).
    - [ ] Una chiamata POST mock.
    - [ ] Routing avanzato con param dinamico e 404.
    - [ ] TypeScript avanzato (alias, generics, union/intersection).
- [ ] Sistemare nomi file, cartelle, commenti, per aumentare leggibilità.
- [ ] Segnare chiaramente cosa è “esame‑critical” dentro il README (bozza).

---

## Giorno 13 – Sistema mock e gestione API key (inizio FASE 3)

- [ ] Creare `src/services/mockData.ts`:
    - [ ] Set di dati mock per player, profili, auctions.
- [ ] Creare `src/hooks/useApiKey.ts`:
    - [ ] Hook per leggere/salvare API key da `localStorage`.
- [ ] Creare `src/contexts/ApiContext.tsx`:
    - [ ] Context per decidere se usare dati reali o mock.
- [ ] Collegare la logica: se manca API key → usare mock.

---

## Giorno 14 – UI per API key + prime pagine extra

- [ ] Creare `src/components/ApiKeySetup.tsx`:
    - [ ] Form/modal per inserire/cancellare API key, con breve spiegazione.
- [ ] Creare `src/pages/BazaarPage.tsx` (versione base):
    - [ ] Lista semplice di pochi items con prezzi mock (non serve tutto il mega sistema).
- [ ] Collegare `BazaarPage` al routing e a eventuale service `bazaarApi`.

---

## Giorno 15 – Ottimizzazioni performance base

- [ ] Creare `src/hooks/usePagination.ts`:
    - [ ] Gestire paginazione semplice per auctions o bazaar.
- [ ] Creare `src/hooks/useDebounce.ts`:
    - [ ] Usare in search bar di Home per evitare troppe chiamate.
- [ ] Creare `src/utils/cacheConfig.ts`:
    - [ ] Configurare `staleTime`/`cacheTime` globali di React Query in un unico punto.

---

## Giorno 16 – UI/UX: tema, skeleton e responsive

- [ ] Creare `src/components/ThemeProvider.tsx` e `src/hooks/useTheme.ts`:
    - [ ] Dark/light mode con persistenza.
- [ ] Creare `src/components/LoadingSkeleton.tsx`:
    - [ ] Skeleton per PlayerCard / liste auctions.
- [ ] Applicare Tailwind per:
    - [ ] Layout responsive base (mobile/desktop).
    - [ ] Alcune animazioni leggere (hover, transitions).

---

## Giorno 17 – Testing minimo e pulizia

- [ ] Setup Vitest + React Testing Library (o simile).
- [ ] Creare:
    - [ ] `src/components/__tests__/PlayerCard.test.tsx` (1–2 test semplici).
    - [ ] `src/hooks/__tests__/usePlayer.test.tsx` (test mockato).
- [ ] Pulizia finale:
    - [ ] Rimuovere codice morto.
    - [ ] Sistemare TODO non critici o commentarli.

---

## Giorno 18 – README e documentazione

- [ ] Scrivere `README.md` completo:
    - [ ] Descrizione progetto e scopo.
    - [ ] Stack usato (React, TS, React Query, ecc.).
    - [ ] Istruzioni installazione ed esecuzione.
    - [ ] Descrizione API Hypixel usata, gestione API key, mock.
    - [ ] Elenco funzionalità completate (marcare quelle richieste dall’esame).
    - [ ] Struttura del progetto (albero cartelle sintetico).
- [ ] Aggiungere eventuali screenshot o GIF (opzionale).

---

## Giorno 19 – Deploy su Vercel

- [ ] Preparare `.env` (senza committare la API key).
- [ ] Configurare progetto per deploy su Vercel:
    - [ ] Controllare build script.
    - [ ] Aggiungere `vercel.json` se serve.
- [ ] Fare deploy e testare:
    - [ ] Home
    - [ ] Profile con param uuid
    - [ ] BazaarPage (o altra pagina extra)
    - [ ] Gestione API key e mock.

---

## Giorno 20 – Buffer finale e prova “demo esame”

- [ ] Usare il giorno come buffer per:
    - [ ] Fix bug dell’ultimo minuto.
    - [ ] Migliorare qualche parte di UI se c’è tempo.
- [ ] Simulare la presentazione all’esame:
    - [ ] Spiegare in 5–10 minuti:
        - Struttura progetto.
        - Chiamate API (GET + POST mock + async/await + React Query).
        - Routing avanzato.
        - TypeScript avanzato (alias, generics, union).
        - Mock system e gestione API key.
- [ ] Controllare che il README abbia il link al deploy e al repository.

