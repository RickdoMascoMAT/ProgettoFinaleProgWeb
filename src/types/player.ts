import type {DisplayName, Rank, Timestamp, UUID} from "./index.ts";

export interface Player {
    uuid: UUID;
    displayname: DisplayName;
    rank: Rank;
    packageRank?: string;
    newPackageRank?: string;
    monthlyPackageRank?: string;
    firstLogin: Timestamp;
    lastLogin: Timestamp;
    lastLogout: Timestamp;
    stats: Record<string, any>;
}

export interface SkyblockProfile {
    profile_id: UUID;
    cute_name: string;
    selected: boolean;
    game_mode?: string;
    banking?: {
        balance: number;
        transactions: Array<{
            timestamp: Timestamp;
            action: string;
            initiator_name: string;
            amount: number;
        }>;
    };
    members: {
        player_id: UUID;
        profile: {
            deletion_notice?: {
                timestamp: Timestamp;
            };
        };
    };
    community_upgrades?: Record<string, any>;
}

export interface PlayerCardProps {
    player: Player;
    profile?: SkyblockProfile;
}