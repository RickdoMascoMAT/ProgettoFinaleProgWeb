import type {PlayerCardProps} from "../types/player";
import StatDisplay from "./StatDisplay";
import {rankColors} from "../types/index";

function getRank(player: PlayerCardProps['player']): string {
    return player.newPackageRank || player.rank || 'NONE';
}

function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString('it-IT');
}

function formatNumber(num: number): string {
    return num.toLocaleString('it-IT');
}

export function PlayerCard({player, profile } : PlayerCardProps){
    const skinUrl = `https://minotar.net/avatar/${player.uuid}/64.png`;
    const rank = getRank(player);
    const rankColor = rankColors[rank] || rankColors['NONE'];

    return(
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <img
                    src={skinUrl}
                    alt={`Faccia di ${player.displayname}`}
                    style={{ width: '64px', height: '64px', borderRadius: '8px' }}
                />
                <div style={{ flex: 1 }}>
                    <h2 style={{ margin: '0 0 10px 0' }}>{player.displayname}</h2>
                    <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>UUID: {player.uuid}</p>

                    <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                        <StatDisplay label="Rank" value={rank} color={rankColor} />
                        <StatDisplay label="Network Level" value={Math.floor(player.networkExp / 10000).toString()} color="#55FFFF" />
                        <StatDisplay label="Achievement Points" value={formatNumber(player.achievementPoints)} color="#FFD700" />
                        <StatDisplay label="Karma" value={formatNumber(player.karma)} color="#FF69B4" />
                    </div>

                    <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                        <StatDisplay label="First Login" value={formatDate(player.firstLogin)} color="#888" />
                        <StatDisplay label="Last Login" value={formatDate(player.lastLogin)} color="#888" />
                        {player.lastLogout && (
                            <StatDisplay label="Last Logout" value={formatDate(player.lastLogout)} color="#888" />
                        )}
                    </div>

                    {profile && (
                        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                            <strong>Profilo SkyBlock:</strong> {profile.cute_name}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}