export function HomePage() {
    return (
        <>
            <h1>Hypixel SkyBlock Stats Tracker</h1>
            <p>App per tracciare statistiche dei giocatori su Hypixel SkyBlock.</p>
            <p>Inserisci API-key</p>
            <input type="text" placeholder="Inserisci la tua API-key" />
            <hr/>
            <form>
                <input type="text" placeholder="Inserisci username" />
                <button type="submit">Cerca</button>
            </form>
        </>
    );
}