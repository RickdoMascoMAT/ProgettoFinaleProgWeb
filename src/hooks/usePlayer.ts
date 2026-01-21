import { useApiData } from './useApiData';
import type { PlayerApiResponse } from '../types/api.ts';
import { get } from '../services/hypixelApi';

export function usePlayer(uuid: string, options?: { enabled?: boolean }) {
  return useApiData({
    queryKey: ['player', uuid],
    queryFn: async () => {
      const response: PlayerApiResponse = await get('player', { uuid }, true);
      if (!response.success) throw new Error(response.cause || 'API error');
      return response.player;
    },
    enabled: options?.enabled !== undefined ? options.enabled : !!uuid,
  });
}
