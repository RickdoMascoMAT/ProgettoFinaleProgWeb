import type { PlayerCardProps } from '../types/player';
import StatDisplay from './StatDisplay';

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

function getRank(player: PlayerCardProps['player']): string {
  return player.newPackageRank || 'NONE';
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('it-IT');
}

function formatNumber(num: number | undefined): string {
  return num !== undefined ? num.toLocaleString('it-IT') : '0';
}

export function PlayerCard({ player }: PlayerCardProps) {
  const skinUrl = `https://minotar.net/avatar/${player.uuid}/64.png`;
  const rank = getRank(player);
  const rankColor = rankColors[rank] || rankColors['NONE'];

  return (
    <div className="player-card">
      <div className="player-card-header">
        <img src={skinUrl} alt={`Faccia di ${player.displayname}`} className="player-avatar" />
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
