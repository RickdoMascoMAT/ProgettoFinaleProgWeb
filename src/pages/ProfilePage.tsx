import {usePlayer} from "../hooks/usePlayer.ts";
import {PlayerCard} from "../components/PlayerCard.tsx";
import {useProfiles} from "../hooks/useProfiles.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import ErrorMessage from "../components/ErrorMessage.tsx";
import StatDisplay from "../components/StatDisplay.tsx";

export function ProfilePage() {
    const uuid = localStorage.getItem('selectedPlayerUUID');
    const {data: player, isLoading: playerLoading, error: playerError} = usePlayer(uuid || '');
    const {data: profiles, isLoading: profilesLoading, error: profilesError} = useProfiles(uuid || '');


    if (playerLoading || profilesLoading) return <LoadingSpinner />;
    if (playerError) return <ErrorMessage message={`Errore player: ${playerError.message}`} />;
    if (profilesError) return <ErrorMessage message={`Errore profili: ${profilesError.message}`} />;

    const selectedProfile = profiles?.find(p => p.selected);

    return (
        <>
            <h1>Statistiche Player</h1>
            {player ? (
                <>
                    <PlayerCard player={player} profile={selectedProfile} />

                    {selectedProfile && (
                        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                            <h3>Statistiche SkyBlock - {selectedProfile.cute_name}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                                <StatDisplay
                                    label="Profilo ID"
                                    value={selectedProfile.profile_id.substring(0, 8) + '...'}
                                    color="#888"
                                />
                                <StatDisplay
                                    label="Creato il"
                                    value={selectedProfile.created_at ? new Date(selectedProfile.created_at).toLocaleDateString('it-IT') : 'N/A'}
                                    color="#888"
                                />
                                <StatDisplay
                                    label="Modalita"
                                    value={selectedProfile.game_mode || 'Normal'}
                                    color="#55FFFF"
                                />
                                {selectedProfile.banking && (
                                    <StatDisplay
                                        label="Bank Balance"
                                        value={`${selectedProfile.banking.balance.toLocaleString('it-IT')} coins`}
                                        color="#FFD700"
                                    />
                                )}
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <strong>Membri profilo:</strong>
                                <p style={{ margin: '5px 0', color: '#666' }}>
                                    {Object.keys(selectedProfile.members).length} giocatore/i
                                </p>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p>Nessun dato player disponibile.</p>
            )}
        </>
    );
}