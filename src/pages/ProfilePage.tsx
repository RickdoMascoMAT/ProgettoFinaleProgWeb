import { usePlayer } from '../hooks/usePlayer.ts';
import { PlayerCard } from '../components/PlayerCard.tsx';
import { useProfiles } from '../hooks/useProfiles';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import StatDisplay from '../components/StatDisplay.tsx';
import { useState } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoritesApi';
import { handleApiError } from '../utils/apiErrorHandler';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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

  const getInitialFavoriteState = () => (uuid ? getFavorites().includes(uuid) : false);
  const [isFavorite, setIsFavorite] = useState(getInitialFavoriteState);

  const currentPlayer = passedPlayer || player;

  if (uuidLoading || playerLoading || profilesLoading) return <LoadingSpinner />;

  if (uuidError) return <ErrorMessage message={handleApiError(uuidError)} />;
  if (playerError) return <ErrorMessage message={handleApiError(playerError)} />;
  if (profilesError) return <ErrorMessage message={handleApiError(profilesError)} />;

  const selectedProfile = profiles?.find((p) => p.selected);

  const backIconUrl = `${import.meta.env.BASE_URL}reshot-icon-chevron-arrow-left-circle-XY6MSRE5DN.svg`;

  return (
    <>
      <img
        src={backIconUrl}
        alt="Back to Home"
        onClick={() => navigate('/')}
        className="back-to-home-button"
      />
      <h1>Player Statistics</h1>
      {currentPlayer ? (
        <>
          <PlayerCard
            player={currentPlayer}
            profile={selectedProfile}
            onToggleFavorite={() => {
              if (uuid) {
                if (isFavorite) {
                  removeFavorite(uuid);
                  setIsFavorite(false);
                } else {
                  addFavorite(uuid);
                  setIsFavorite(true);
                }
              }
            }}
            isFavorite={isFavorite}
          />

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
                      ? new Date(selectedProfile.created_at).toLocaleDateString('it-IT')
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
                    value={`${(selectedProfile.banking.balance || 0).toLocaleString('it-IT')} coins`}
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
