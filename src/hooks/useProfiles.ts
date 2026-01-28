import type { UUID } from '../types/index';
import { useApiData } from './useApiData';
import type { ProfileApiResponse } from '../types/api';
import { get } from '../services/hypixelApi';

/**
 * Hook for fetching SkyBlock profiles for a player from the Hypixel API.
 * Uses React Query for caching and automatic refetching.
 *
 * @param {UUID} uuid - The player's UUID
 * @param {Object} [options] - Optional configuration
 * @param {boolean} [options.enabled] - Whether the query should execute
 * @returns {UseQueryResult} Query result containing profile array, loading state, and errors
 *
 * @example
 * const { data: profiles, isLoading, error } = useProfiles(uuid);
 * const selectedProfile = profiles?.find(p => p.selected);
 */
export function useProfiles(uuid: UUID, options?: { enabled?: boolean }) {
  return useApiData({
    queryKey: ['profiles', uuid],
    queryFn: async () => {
      const response: ProfileApiResponse = await get('skyblock/profiles', { uuid }, true);
      if (!response.success) throw new Error('Profiles API error');
      return response.profiles;
    },
    enabled: options?.enabled !== undefined ? options.enabled : !!uuid,
  });
}
