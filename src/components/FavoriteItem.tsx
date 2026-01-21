import { usePlayer } from '../hooks/usePlayer';
import { useNavigationState } from '../hooks/useNavigationState';

export function FavoriteItem({ uuid }: { uuid: string }) {
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
