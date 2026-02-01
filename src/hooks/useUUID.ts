import { useQuery } from '@tanstack/react-query';
import { getUUID } from '../services/minecraftAPI';

/**
 * Hook for resolving a Minecraft username to its UUID.
 * Uses the Mojang API to lookup player UUIDs.
 */
export function useUUID(username: string) {
  return useQuery({
    queryKey: ['uuid', username],
    queryFn: async () => {
      const uuid = await getUUID(username);
      return uuid || null;
    },
    enabled: !!username,
    retry: false,
  });
}
