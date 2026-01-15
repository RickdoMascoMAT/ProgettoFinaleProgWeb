import { usePlayer } from '../hooks/usePlayer.ts';
import { PlayerCard } from '../components/PlayerCard.tsx';
import { useProfiles } from '../hooks/useProfiles.tsx';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import StatDisplay from '../components/StatDisplay.tsx';
import { useState } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoritesApi';
import { handleApiError } from '../utils/apiErrorHandler';

export function ProfilePage() {
  const uuid = localStorage.getItem('selectedPlayerUUID');
  const { data: player, isLoading: playerLoading, error: playerError } = usePlayer(uuid || '');
  const {
    data: profiles,
    isLoading: profilesLoading,
    error: profilesError,
  } = useProfiles(uuid || '');
  const [isFavorite, setIsFavorite] = useState(uuid ? getFavorites().includes(uuid) : false);

  if (playerLoading || profilesLoading) return <LoadingSpinner />;
  if (playerError) return <ErrorMessage message={handleApiError(playerError)} />;
  if (profilesError) return <ErrorMessage message={handleApiError(profilesError)} />;

  const selectedProfile = profiles?.find((p) => p.selected);

  return (
    <>
      <h1>Statistiche Player</h1>
      <button onClick={() => (window.location.href = '/')} className="form-button back-button">
        Torna alla Home
      </button>
      {uuid && (
        <button
          onClick={() => {
            if (isFavorite) {
              removeFavorite(uuid);
              setIsFavorite(false);
            } else {
              addFavorite(uuid);
              setIsFavorite(true);
            }
          }}
          className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
        >
          {isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
        </button>
      )}
      {player ? (
        <>
          <PlayerCard player={player} profile={selectedProfile} />

          {selectedProfile && (
            <div className="profile-stats">
              <h3>Statistiche SkyBlock - {selectedProfile.cute_name}</h3>
              <div className="stats-grid">
                <StatDisplay
                  label="Profilo ID"
                  value={selectedProfile.profile_id.substring(0, 8) + '...'}
                  color="#888"
                />
                <StatDisplay
                  label="Creato il"
                  value={
                    selectedProfile.created_at
                      ? new Date(selectedProfile.created_at).toLocaleDateString('it-IT')
                      : 'N/A'
                  }
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
                    value={`${(selectedProfile.banking.balance || 0).toLocaleString('it-IT')} coins`}
                    color="#FFD700"
                  />
                )}
              </div>

              <div className="members-section">
                <strong>Membri profilo:</strong>
                <p className="members-info">
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
