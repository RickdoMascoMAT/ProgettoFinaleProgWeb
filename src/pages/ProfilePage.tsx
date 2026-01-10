import {usePlayer} from "../hooks/usePlayer.ts";

export function ProfilePage() {
    const uuid = localStorage.getItem('selectedPlayerUUID');
    console.log('UUID recuperato:', uuid); // Aggiungi questo per debug
    const {data: player, isLoading, error} = usePlayer(uuid || '');

    if (isLoading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error.message}</p>;

    return (
        <>
            <h1>Statistiche Player</h1>
            {player ? (
                <div>
                    <p>Username: {player.displayname}</p>
                    <p>UUID: {uuid}</p>
                </div>
            ) : (
                <p>Nessun dato player disponibile.</p>
            )
            }
            <p>Qui verranno mostrate le statistiche del giocatore selezionato.</p>
        </>
    );
}