import {useQuery} from "@tanstack/react-query";
import type {PlayerApiResponse} from "../types/api.ts";
import { get } from '../services/hypixelAPI';

export function usePlayer(uuid: string) {
    return useQuery({
        queryKey: ['player', uuid],
        queryFn: async () => {
            const response: PlayerApiResponse = await get('player', { uuid }, true);
            if (!response.success) throw new Error(response.cause || 'Errore API');
            return response.player;
        },
        enabled: !!uuid,
    });
}