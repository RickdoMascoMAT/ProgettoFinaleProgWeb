import { usePlayer } from '../hooks/usePlayer';
import { useNavigationState } from '../hooks/useNavigationState';

/**
 * Props for the FavoriteItem component
 * @property {string} uuid - The UUID of the favorite player
 */
interface FavoriteItemProps {
  uuid: string;
}

/**
 * Component that displays a single favorite player item.
 * Shows the player's avatar, name, and a button to navigate to their profile.
 * Handles loading and error states gracefully.
 *
 * @param {FavoriteItemProps} props - Component props
 * @returns {JSX.Element} A list item containing the favorite player info
 */
export function FavoriteItem({ uuid }: FavoriteItemProps) {
  const { data: player, isLoading, error } = usePlayer(uuid);
  const { navigateToProfile } = useNavigationState();

  if (isLoading) return <li className="favorites-item">Loading...</li>;
  if (error) return <li className="favorites-item">Loading error</li>;
  if (!player) return <li className="favorites-item">Player not found</li>;

  return (
    <li className="favorites-item">
      <img
        src={`https://minotar.net/avatar/${uuid}/32.png`}
        alt={`Face of ${player.displayname}`}
        className="favorite-face"
      />
      <span className="favorite-name">{player.displayname}</span>
      <button
        onClick={() => {
          navigateToProfile(player.displayname, { player });
        }}
        className="favorites-button"
      >
        Go to profile
      </button>
    </li>
  );
}
