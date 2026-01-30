import { useQuery } from '@tanstack/react-query';
import { getUsername } from '../services/minecraftAPI';

/**
 * Hook for resolving a Minecraft UUID to its username.
 * Uses the PlayerDB API to lookup player usernames.
 *
 * @param {string} uuid - The Minecraft UUID to lookup
 * @returns {UseQueryResult} Query result containing the username, loading state, and errors
 *
 * @example
 * const { data: username, isLoading, error } = useUsername('069a79f444e94726a5befca90e38aaf5');
 */
export function useUsername(uuid: string) {
  return useQuery({
    queryKey: ['username', uuid],
    queryFn: async () => {
      const username = await getUsername(uuid);
      if (!username) throw new Error('UUID not found');
      return username;
    },
    enabled: !!uuid,
  });
}
