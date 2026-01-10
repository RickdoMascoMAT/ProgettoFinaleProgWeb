import {usePlayer} from "../hooks/usePlayer.ts";
import {PlayerCard} from "../components/PlayerCard.tsx";
import {useProfiles} from "../hooks/useProfiles.tsx";

export function ProfilePage() {
    const uuid = localStorage.getItem('selectedPlayerUUID');
    const {data: player, isLoading: playerLoading, error: playerError} = usePlayer(uuid || '');
    const {data: profiles, isLoading: profilesLoading, error: profilesError} = useProfiles(uuid || '');


    if (playerLoading || profilesLoading) return <p>Caricamento...</p>;
    if (playerError) return <p>Errore player: {playerError.message}</p>;
    if (profilesError) return <p>Errore profili: {profilesError.message}</p>;

    const selectedProfile = profiles?.find(p => p.selected);

    return (
        <>
            <h1>Statistiche Player</h1>
            {player ? (
                <PlayerCard player={player} profile={selectedProfile} />
            ) : (
                <p>Nessun dato player disponibile.</p>
            )
            }
            <p>Qui verranno mostrate le statistiche del giocatore selezionato.</p>
        </>
    );
}