import type { PlayerCardProps } from '../types/player';
import StatDisplay from './StatDisplay';

/**
 * Mapping of Hypixel rank names to their display colors.
 * Used to style the player's rank with the correct color.
 */
const rankColors: Record<string, string> = {
  NONE: '#AAAAAA',
  VIP: '#00AA00',
  VIP_PLUS: '#55FFFF',
  MVP: '#55AAFF',
  MVP_PLUS: '#55AAFF',
  MVP_PLUS_PLUS: '#FFAA00',
  YOUTUBER: '#FF5555',
  OWNER: '#AA0000',
  ADMIN: '#FF5555',
  MODERATOR: '#AA00AA',
};

/**
 * Extracts the player's rank from their data.
 * @param {PlayerCardProps['player']} player - The player object
 * @returns {string} The player's rank or 'NONE' if not found
 */
function getRank(player: PlayerCardProps['player']): string {
  return player.newPackageRank || 'NONE';
}

/**
 * Formats a Unix timestamp to a localized date string.
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date string in en-US locale
 */
function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US');
}

/**
 * Formats a number with locale-specific thousand separators.
 * @param {number | undefined} num - The number to format
 * @returns {string} Formatted number string or '0' if undefined
 */
function formatNumber(num: number | undefined): string {
  return num !== undefined ? num.toLocaleString('en-US') : '0';
}

/**
 * Component that displays a player's profile card with their avatar and stats.
 * Shows player information including rank, level, achievements, karma, and login dates.
 *
 * @param {PlayerCardProps} props - Component props containing player data
 * @returns {JSX.Element} A styled player card with avatar and statistics
 */
export function PlayerCard({ player }: PlayerCardProps) {
  const skinUrl = `https://minotar.net/avatar/${player.uuid}/64.png`;
  const rank = getRank(player);
  const rankColor = rankColors[rank] || rankColors['NONE'];

  return (
    <div className="player-card">
      <div className="player-card-header">
        <img src={skinUrl} alt={`Face of ${player.displayname}`} className="player-avatar" />
        <div className="player-info">
          <h2 className="player-name">{player.displayname}</h2>
          <p className="player-uuid">UUID: {player.uuid}</p>

          <div className="stats-section">
            <StatDisplay label="Rank" value={rank} color={rankColor} />
            <StatDisplay
              label="Network Level"
              value={Math.floor((player.networkExp || 0) / 10000).toString()}
              color="#55FFFF"
            />
            <StatDisplay
              label="Achievement Points"
              value={formatNumber(player.achievementPoints)}
              color="#FFD700"
            />
            <StatDisplay label="Karma" value={formatNumber(player.karma)} color="#FF69B4" />
          </div>

          <div className="stats-section">
            <StatDisplay label="First Login" value={formatDate(player.firstLogin)} color="#888" />
            <StatDisplay label="Last Login" value={formatDate(player.lastLogin)} color="#888" />
            {player.lastLogout && (
              <StatDisplay label="Last Logout" value={formatDate(player.lastLogout)} color="#888" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
