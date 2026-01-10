import type {PlayerCardProps} from "../types/player.ts";

function getRank(player: PlayerCardProps['player']): string {
    if (player.newPackageRank) return player.newPackageRank;
    if (player.packageRank) return player.packageRank;
    return 'NONE';
}

export function PlayerCard({player, profile } : PlayerCardProps){
    const uuid = localStorage.getItem('selectedPlayerUUID');
    const skinUrl = `https://minotar.net/avatar/${player.uuid}/64.png`;

    return(
        <div>
            <img
                src={skinUrl}
                alt={`Faccia di ${player.displayname}`}
                style={{ width: '64px', height: '64px' }}
            />
            <h2>{player.displayname}</h2>
            <p>UUID: {uuid}</p>
            <p>Rank: {getRank(player)}</p>
            {profile && (
                <p>Profilo principale: {profile.cute_name}</p>
            )}
        </div>
    )
}