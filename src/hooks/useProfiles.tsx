import type {UUID} from "../types";
import {useQuery} from "@tanstack/react-query";
import type {ProfileApiResponse} from "../types/api.ts";
import {get} from "../services/hypixelAPI.ts";

export function useProfiles(uuid: UUID){
    return useQuery({
        queryKey: ['profiles', uuid],
        queryFn: async () => {
            const response: ProfileApiResponse = await get('skyblock/profiles', {uuid}, true);
            if(!response.success) throw new Error('Errore API profili');
            return response.profiles;
        },
        enabled: !!uuid,
    })
}