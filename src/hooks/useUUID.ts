import { useQuery } from '@tanstack/react-query';
import { getUUID } from '../services/minecraftAPI';

export function useUUID(username: string) {
  return useQuery({
    queryKey: ['uuid', username],
    queryFn: async () => {
      const uuid = await getUUID(username);
      if (!uuid) throw new Error('Username non trovato');
      return uuid;
    },
    enabled: !!username,
  });
}
