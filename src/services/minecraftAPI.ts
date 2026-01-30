import axios from 'axios';
import type { DisplayName, UUID, Optional } from '../types/index';
import { shouldUseMock, getMockUUID, getMockUsername } from './mockService';

// In development use proxy, in production use PlayerDB API (CORS-friendly)
const isDev = import.meta.env.DEV;
const MOJANG_PROXY = '/api';
const PLAYERDB_API = 'https://playerdb.co/api/player/minecraft';

/**
 * Retrieves the UUID for a Minecraft username.
 * Uses mock data if enabled, otherwise:
 * - Mojang API via proxy in development
 * - PlayerDB API in production
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
    // When no API key, use mock UUID if available
    if (shouldUseMock()) {
      const mockUUID = getMockUUID(username);
      if (mockUUID) {
        return mockUUID;
      }
    }

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

/**
 * Retrieves the username for a Minecraft UUID.
 * Uses PlayerDB API (CORS-friendly).
 *
 * @param {UUID} uuid - The Minecraft UUID to lookup
 * @returns {Promise<Optional<DisplayName>>} The player's username or null if not found
 *
 * @example
 * const username = await getUsername('069a79f444e94726a5befca90e38aaf5');
 * // Returns: 'Notch'
 */
export async function getUsername(uuid: UUID): Promise<Optional<DisplayName>> {
  try {
    if (shouldUseMock()) {
      const mockUsername = getMockUsername(uuid);
      if (mockUsername) {
        return mockUsername;
      }
      return null;
    }

    const response = await axios.get(`${PLAYERDB_API}/${uuid}`);
    if (response.data.success && response.data.data?.player?.username) {
      return response.data.data.player.username;
    }
    return null;
  } catch (error) {
    console.error('Error fetching username:', error);
    return null;
  }
}
