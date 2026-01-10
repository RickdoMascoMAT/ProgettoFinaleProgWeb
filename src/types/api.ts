import type {Player, SkyblockProfile} from "./player.ts";

export interface HypixelApiResponse<T> {
    success: boolean;
    cause?: string;
    data?: T;
}

export interface PlayerApiResponse{
    success: boolean;
    player: Player;
}
export interface ProfileApiResponse{
    success: boolean;
    profiles: SkyblockProfile[];
}