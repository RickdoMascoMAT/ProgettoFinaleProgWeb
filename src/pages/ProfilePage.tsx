import { usePlayer } from '../hooks/usePlayer.ts';
import { PlayerCard } from '../components/PlayerCard.tsx';
import { useProfiles } from '../hooks/useProfiles';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import StatDisplay from '../components/StatDisplay.tsx';
import { useState } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoritesApi';
import { handleApiError } from '../utils/apiErrorHandler';
import { useParams, useLocation } from 'react-router-dom';
import { useUUID } from '../hooks/useUUID';

/**
 * Profile page component.
 * Displays detailed player statistics and SkyBlock profile information.
 *
 * Features:
 * - Player card with avatar, rank, and general stats
 * - SkyBlock profile details (bank balance, game mode, etc.)
 * - Add/remove player from favorites
 * - Supports navigation state to avoid redundant API calls
 *
 * @returns {JSX.Element} The player profile page UI
 */
export function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  const location = useLocation();
  const passedPlayer = location.state?.player;

  const { data: uuid, isLoading: uuidLoading, error: uuidError } = useUUID(username || '');

  const {
    data: player,
    isLoading: playerLoading,
    error: playerError,
  } = usePlayer(uuid || '', {
    enabled: !!uuid && !passedPlayer,
  });

  const {
    data: profiles,
    isLoading: profilesLoading,
    error: profilesError,
  } = useProfiles(uuid || '', {
    enabled: !!uuid,
  });

  const [isFavorite, setIsFavorite] = useState(uuid ? getFavorites().includes(uuid) : false);

  const currentPlayer = passedPlayer || player;

  if (uuidLoading || playerLoading || profilesLoading) return <LoadingSpinner />;

  if (uuidError) return <ErrorMessage message={handleApiError(uuidError)} />;
  if (playerError) return <ErrorMessage message={handleApiError(playerError)} />;
  if (profilesError) return <ErrorMessage message={handleApiError(profilesError)} />;

  const selectedProfile = profiles?.find((p) => p.selected);

  return (
    <>
      <h1>Player Statistics</h1>
      <button onClick={() => (window.location.href = '/')} className="form-button back-button">
        Back to Home
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
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      )}
      {currentPlayer ? (
        <>
          <PlayerCard player={currentPlayer} profile={selectedProfile} />

          {selectedProfile && (
            <div className="profile-stats">
              <h3>SkyBlock Statistics - {selectedProfile.cute_name}</h3>
              <div className="stats-grid">
                <StatDisplay
                  label="Profile ID"
                  value={selectedProfile.profile_id.substring(0, 8) + '...'}
                  color="#888"
                />
                <StatDisplay
                  label="Created on"
                  value={
                    selectedProfile.created_at
                      ? new Date(selectedProfile.created_at).toLocaleDateString('en-US')
                      : 'N/A'
                  }
                  color="#888"
                />
                <StatDisplay
                  label="Mode"
                  value={selectedProfile.game_mode || 'Normal'}
                  color="#55FFFF"
                />
                {selectedProfile.banking && (
                  <StatDisplay
                    label="Bank Balance"
                    value={`${(selectedProfile.banking.balance || 0).toLocaleString('en-US')} coins`}
                    color="#FFD700"
                  />
                )}
              </div>

              <div className="members-section">
                <strong>Profile members:</strong>
                <p className="members-info">
                  {Object.keys(selectedProfile.members).length} player(s)
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>No player data available.</p>
      )}
    </>
  );
}
