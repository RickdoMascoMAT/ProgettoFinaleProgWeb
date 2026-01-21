import type { UUID } from '../types/index';
import { useApiData } from './useApiData';
import type { ProfileApiResponse } from '../types/api';
import { get } from '../services/hypixelApi';

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
