# Roadmap giorni 1-9 - Hypixel SkyBlock Stats Tracker

> Obiettivo: completare FASE 1 + FASE 2 + una parte selezionata di FASE 3, con tempo per README e deploy.

## Giorno 1 – Rifinitura FASE 2 + mini review + requisiti mancanti esame

- [ ] Una chiamata POST mock (implementare una chiamata POST fittizia, es. per salvare preferenze o simulare invio dati).
- [ ] Sistemare nomi file, cartelle, commenti, per aumentare leggibilità.
- [ ] Scrivere README.md completo:
  - [ ] Descrizione progetto e scopo.
  - [ ] Stack usato (React, TS, React Query, ecc.).
  - [ ] Istruzioni installazione ed esecuzione.
  - [ ] Descrizione API Hypixel usata, gestione API key, mock.
  - [ ] Elenco funzionalità completate (marcare quelle richieste dall’esame).
  - [ ] Struttura del progetto (albero cartelle sintetico).
- [ ] Segnare chiaramente cosa è “esame‑critical” dentro il README (bozza).

---

## Giorno 2 – Sistema mock e gestione API key (inizio FASE 3)

- [ ] Creare `src/services/mockData.ts`:
  - [ ] Set di dati mock per player, profili, auctions.
- [ ] Creare `src/contexts/ApiContext.tsx`:
  - [ ] Context per decidere se usare dati reali o mock.
- [ ] Collegare la logica: se manca API key → usare mock.

---

## Giorno 3 – UI per API key + prime pagine extra

- [ ] Creare `src/components/ApiKeySetup.tsx`:
  - [ ] Form/modal per inserire/cancellare API key, con breve spiegazione.
- [ ] Creare `src/pages/BazaarPage.tsx` (versione base):
  - [ ] Lista semplice di pochi items con prezzi mock (non serve tutto il mega sistema).
- [ ] Collegare `BazaarPage` al routing e a eventuale service `bazaarApi`.

---

## Giorno 4 – Ottimizzazioni performance base

- [ ] Creare `src/hooks/usePagination.ts`:
  - [ ] Gestire paginazione semplice per auctions o bazaar.
- [ ] Creare `src/hooks/useDebounce.ts`:
  - [ ] Usare in search bar di Home per evitare troppe chiamate.
- [ ] Creare `src/utils/cacheConfig.ts`:
  - [ ] Configurare `staleTime`/`cacheTime` globali di React Query in un unico punto.

---

## Giorno 5 – UI/UX migliorata

- [ ] Creare `src/components/ThemeProvider.tsx` e `src/hooks/useTheme.ts`:
  - [ ] Dark/light mode con persistenza.
- [ ] Applicare Tailwind per:
  - [ ] Layout responsive base (mobile/desktop).
  - [ ] Alcune animazioni leggere (hover, transitions).

---

## Giorno 6 – Testing minimo e pulizia

- [ ] Setup Vitest + React Testing Library (o simile).
- [ ] Creare:
  - [ ] `src/components/__tests__/PlayerCard.test.tsx` (1–2 test semplici).
  - [ ] `src/hooks/__tests__/usePlayer.test.tsx` (test mockato).
- [ ] Pulizia finale:
  - [ ] Rimuovere codice morto.
  - [ ] Sistemare TODO non critici o commentarli.

---

## Giorno 7 – README e documentazione

- [ ] Scrivere `README.md` completo:
  - [ ] Descrizione progetto e scopo.
  - [ ] Stack usato (React, TS, React Query, ecc.).
  - [ ] Istruzioni installazione ed esecuzione.
  - [ ] Descrizione API Hypixel usata, gestione API key, mock.
  - [ ] Elenco funzionalità completate (marcare quelle richieste dall’esame).
  - [ ] Struttura del progetto (albero cartelle sintetico).
- [ ] Aggiungere eventuali screenshot o GIF (opzionale).

---

## Giorno 8 – Deploy su Vercel

- [ ] Preparare `.env` (senza committare la API key).
- [ ] Configurare progetto per deploy su Vercel:
  - [ ] Controllare build script.
  - [ ] Aggiungere `vercel.json` se serve.
- [ ] Fare deploy e testare:
  - [ ] Home
  - [ ] Profile con param username
  - [ ] BazaarPage (o altra pagina extra)
  - [ ] Gestione API key e mock.

---

## Giorno 9 – Buffer finale e prova “demo esame”

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

---

## 🔄 REFACTORING - Codice Duplicato da Ottimizzare (Task Opzionale)

> ⚠️ **NOTA**: Questi refactoring NON sono necessari per l'esame, ma migliorerebbero la qualità del codice.
> Eseguire solo se c'è tempo dopo aver completato tutti i task obbligatori.

### 1. **Hook Pattern Duplicato** - PRIORITÀ ALTA

**Problema**: `usePlayer.ts` e `useProfiles.tsx` hanno la stessa struttura base

```typescript
// Pattern ripetuto in entrambi:
return useQuery({
  queryKey: [...],
  queryFn: async () => {
    const response = await get(...);
    if (!response.success) throw new Error(...);
    return response.data;
  },
  enabled: !!uuid,
});
```

**Soluzione Proposta**:

- [ ] Creare `src/hooks/useHypixelQuery.ts` hook generico
- [ ] Parametrizzare endpoint, queryKey, e tipo di ritorno con generics
- [ ] Refactorare `usePlayer` e `useProfiles` per usare il nuovo hook
- [ ] File da modificare: `usePlayer.ts`, `useProfiles.tsx`, `useAuctions.ts` (quando creato)

---

### 2. **Gestione LocalStorage Duplicata** - PRIORITÀ MEDIA

**Problema**: LocalStorage usato in modo sparso in diversi file

```typescript
// In HomePage.tsx:
localStorage.setItem('selectedPlayerUUID', uuid);
localStorage.getItem('selectedPlayerUUID');

// In ProfilePage.tsx:
localStorage.getItem('selectedPlayerUUID');

// In FavoriteItem.tsx:
localStorage.setItem('selectedPlayerUUID', uuid);

// In favoritesApi.ts:
localStorage.getItem('favorites');
localStorage.setItem('favorites', ...);

// In useApiKey.ts:
localStorage.getItem('hypixelApiKey');
localStorage.setItem('hypixelApiKey', key);
```

**Soluzione Proposta**:

- [ ] Creare `src/utils/localStorage.ts` con funzioni tipizzate
- [ ] Definire chiavi come costanti: `STORAGE_KEYS = { UUID: '...', API_KEY: '...', FAVORITES: '...' }`
- [ ] Creare funzioni generiche: `getItem<T>()`, `setItem<T>()`, `removeItem()`
- [ ] Refactorare tutti i file che usano localStorage
- [ ] File da modificare: `HomePage.tsx`, `ProfilePage.tsx`, `FavoriteItem.tsx`, `favoritesApi.ts`, `useApiKey.ts`

---

### 3. **Pattern di Navigazione Duplicato** - PRIORITÀ BASSA

**Problema**: Navigazione gestita in modo inconsistente

```typescript
// In FavoriteItem.tsx:
window.location.href = '/profile';

// In ProfilePage.tsx:
window.location.href = '/';
```

**Soluzione Proposta**:

- [ ] Usare `useNavigate()` di React Router invece di `window.location.href`
- [ ] Creare `src/hooks/useNavigateToProfile.ts` per logica condivisa
- [ ] Refactorare FavoriteItem e ProfilePage
- [ ] File da modificare: `FavoriteItem.tsx`, `ProfilePage.tsx`

---

### 4. **Timeout Pattern per Messaggi** - PRIORITÀ BASSA

**Problema**: Pattern `useEffect` + `setTimeout` duplicato in HomePage

```typescript
// Duplicato 2 volte in HomePage.tsx:
useEffect(() => {
  if (APIMessage) {
    const timer = setTimeout(() => setAPIMessage(''), 3000);
    return () => clearTimeout(timer);
  }
}, [APIMessage]);

useEffect(() => {
  if (usernameMessage) {
    const timer = setTimeout(() => setUsernameMessage(''), 3000);
    return () => clearTimeout(timer);
  }
}, [usernameMessage]);
```

**Soluzione Proposta**:

- [ ] Creare `src/hooks/useAutoResetMessage.ts` hook personalizzato
- [ ] Hook accetta: `(message, delay) => [message, setMessage]`
- [ ] Refactorare HomePage per usare il nuovo hook
- [ ] File da modificare: `HomePage.tsx`

---

### 5. **Formattazione Date/Numeri Duplicata** - PRIORITÀ BASSA

**Problema**: Funzioni utility duplicate in `PlayerCard.tsx` e `ProfilePage.tsx`

```typescript
// In PlayerCard.tsx:
function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('it-IT');
}
function formatNumber(num: number | undefined): string {
  return num !== undefined ? num.toLocaleString('it-IT') : '0';
}

// In ProfilePage.tsx:
new Date(selectedProfile.created_at)
  .toLocaleDateString('it-IT')(selectedProfile.banking.balance || 0)
  .toLocaleString('it-IT');
```

**Soluzione Proposta**:

- [ ] Creare `src/utils/formatters.ts` con funzioni riutilizzabili
- [ ] Esportare: `formatDate()`, `formatNumber()`, `formatCurrency()`
- [ ] Refactorare PlayerCard e ProfilePage
- [ ] File da modificare: `PlayerCard.tsx`, `ProfilePage.tsx`

---

### 6. **RankColors Duplicato** - PRIORITÀ BASSA

**Problema**: `rankColors` oggetto definito sia in `types/index.ts` che in `PlayerCard.tsx`

```typescript
// In types/index.ts:
export const rankColors: Record<string, string> = { ... };

// In PlayerCard.tsx (dopo fix):
const rankColors: Record<string, string> = { ... };
```

**Soluzione Proposta**:

- [ ] Rimuovere definizione locale da `PlayerCard.tsx`
- [ ] Importare da `types/index.ts`
- [ ] Considerare spostamento in `src/constants/ranks.ts` se serve espandere
- [ ] File da modificare: `PlayerCard.tsx`

---

### 7. **URL Minotar Avatar Duplicato** - PRIORITÀ BASSA

**Problema**: URL avatar costruito in 3 punti diversi

```typescript
// In PlayerCard.tsx:
const skinUrl = `https://minotar.net/avatar/${player.uuid}/64.png`;

// In FavoriteItem.tsx:
src={`https://minotar.net/avatar/${uuid}/32.png`}
```

**Soluzione Proposta**:

- [ ] Creare `src/utils/minecraft.ts` con funzione `getMinotarAvatar(uuid, size)`
- [ ] Opzionale: aggiungere altre utility Minecraft (colorCodes, etc.)
- [ ] Refactorare PlayerCard e FavoriteItem
- [ ] File da modificare: `PlayerCard.tsx`, `FavoriteItem.tsx`

---

### 8. **Inline Styles Sparsi** - PRIORITÀ MOLTO BASSA

**Problema**: Style inline mescolati con classi CSS in HomePage e ProfilePage

```typescript
// In HomePage.tsx e ProfilePage.tsx:
style={{ textAlign: 'left', marginBottom: '20px' }}
style={{ justifyContent: 'flex-start' }}
```

**Soluzione Proposta**:

- [ ] Spostare tutti gli stili in `App.css` o file CSS dedicati
- [ ] Usare solo classi CSS per consistenza
- [ ] File da modificare: `HomePage.tsx`, `ProfilePage.tsx`, `ItemCard.tsx`

---

## 📊 Riepilogo Refactoring

| Task                   | Priorità       | Impatto | File Coinvolti | Tempo Stimato |
| ---------------------- | -------------- | ------- | -------------- | ------------- |
| Hook Pattern Duplicato | 🔴 Alta        | Grande  | 3+ files       | 30-45 min     |
| LocalStorage Duplicato | 🟡 Media       | Grande  | 5+ files       | 45-60 min     |
| Navigazione Duplicata  | 🟢 Bassa       | Medio   | 2 files        | 15-20 min     |
| Timeout Messaggi       | 🟢 Bassa       | Piccolo | 1 file         | 15-20 min     |
| Formatters Duplicati   | 🟢 Bassa       | Medio   | 2 files        | 20-30 min     |
| RankColors Duplicato   | 🟢 Bassa       | Piccolo | 1 file         | 5-10 min      |
| URL Avatar Duplicato   | 🟢 Bassa       | Piccolo | 2 files        | 10-15 min     |
| Inline Styles          | ⚪ Molto Bassa | Medio   | 3 files        | 30-40 min     |

**Tempo Totale Stimato**: 2.5 - 4 ore

---

## ✅ Quando Eseguire il Refactoring

**Consiglio**: Eseguire refactoring SOLO se:

1. ✅ Tutti i task dei giorni 1-9 sono completati
2. ✅ README e deploy sono pronti
3. ✅ Hai tempo extra prima della consegna
4. ✅ Tutti i test funzionano correttamente

**NON fare refactoring se:**

- ❌ Mancano funzionalità obbligatorie
- ❌ Ci sono bug da fixare
- ❌ Il tempo stringe per la consegna

---

## Task extra (opzionali, se completati tutti i precedenti e tempo permette)

- [ ] Librerie avanzate:
  - [ ] Grafica: Shadcn/UI per componenti UI avanzati.
  - [ ] State management: Zustand per gestione stato globale.
  - [ ] Form avanzate: Formik o React Hook Form per form complessi.
  - [ ] Validazione dati API: Zod per validazione input.
  - [ ] Gestione cache avanzata sulle chiamate API.
- [ ] Funzionalità avanzate:
  - [ ] Ottimizzazioni API: Pagination avanzata, caching migliorato.
  - [ ] Autenticazione avanzata: JWT, OAuth (se applicabile).
  - [ ] WebSocket per aggiornamenti real-time.
  - [ ] Pipeline CI/CD: GitHub Actions per deploy automatico.
  - [ ] Testing avanzato: Coverage completa, test E2E.
