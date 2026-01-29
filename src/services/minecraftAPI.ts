import axios from 'axios';
import type { DisplayName, UUID, Optional } from '../types/index';

// In development use proxy, in production use PlayerDB API (CORS-friendly)
const isDev = import.meta.env.DEV;
const MOJANG_PROXY = '/api';
const PLAYERDB_API = 'https://playerdb.co/api/player/minecraft';

/**
 * Retrieves the UUID for a Minecraft username.
 * Uses Mojang API via proxy in development, PlayerDB API in production.
 *
 * @param {DisplayName} username - The Minecraft username to lookup
 * @returns {Promise<Optional<UUID>>} The player's UUID or null if not found
 *
 * @example
 * const uuid = await getUUID('Notch');
 * // Returns: '069a79f444e94726a5befca90e38aaf5'
 */
export async function getUUID(username: DisplayName): Promise<Optional<UUID>> {
  try {
    if (isDev) {
      // Development: use Mojang API via proxy
      const response = await axios.get(`${MOJANG_PROXY}/users/profiles/minecraft/${username}`);
      return response.data.id;
    } else {
      // Production: use PlayerDB API (CORS-friendly)
      const response = await axios.get(`${PLAYERDB_API}/${username}`);
      if (response.data.success && response.data.data?.player?.id) {
        // PlayerDB returns UUID with dashes, remove them
        return response.data.data.player.id.replace(/-/g, '');
      }
      return null;
    }
  } catch (error) {
    console.error('Error fetching UUID:', error);
    return null;
  }
}
