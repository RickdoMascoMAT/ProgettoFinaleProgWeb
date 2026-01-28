import { useQuery } from '@tanstack/react-query';
import { getUUID } from '../services/minecraftAPI';

//Sto utilizzando un proxy per le chiamate a questa API perchè non funziona durante il development altrimenti
/**
 * Hook for resolving a Minecraft username to its UUID.
 * Uses the Mojang API to lookup player UUIDs.
 *
 * @param {string} username - The Minecraft username to lookup
 * @returns {UseQueryResult} Query result containing the UUID, loading state, and errors
 *
 * @example
 * const { data: uuid, isLoading, error } = useUUID('Notch');
 */
export function useUUID(username: string) {
  return useQuery({
    queryKey: ['uuid', username],
    queryFn: async () => {
      const uuid = await getUUID(username);
      if (!uuid) throw new Error('Username not found');
      return uuid;
    },
    enabled: !!username,
  });
}
