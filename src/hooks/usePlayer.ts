import { useApiData } from './useApiData';
import type { PlayerApiResponse } from '../types/api.ts';
import { get } from '../services/hypixelApi';

/**
 * Hook for fetching player data from the Hypixel API.
 * Uses React Query for caching and automatic refetching.
 *
 * @param {string} uuid - The player's UUID
 * @param {Object} [options] - Optional configuration
 * @param {boolean} [options.enabled] - Whether the query should execute
 * @returns {UseQueryResult} Query result containing player data, loading state, and errors
 *
 * @example
 * const { data: player, isLoading, error } = usePlayer(uuid);
 */
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
