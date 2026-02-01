import axios from 'axios';
import type { DisplayName, UUID, Optional } from '../types';
import { shouldUseMock, getMockUUID } from './mockService';

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
 */
export async function getUUID(username: DisplayName): Promise<Optional<UUID>> {
  try {
    if (shouldUseMock()) {
      const mockUUID = getMockUUID(username);
      if (mockUUID) {
        return mockUUID;
      }
    }

    if (isDev) {
      const response = await axios.get(`${MOJANG_PROXY}/users/profiles/minecraft/${username}`);
      return response.data.id;
    } else {
      const response = await axios.get(`${PLAYERDB_API}/${username}`);
      if (response.data.success && response.data.data?.player?.id) {
        return response.data.data.player.id.replace(/-/g, '');
      }
      return null;
    }
  } catch {
    return null;
  }
}

/**
 * Retrieves the username for a Minecraft UUID.
 * Uses PlayerDB API (CORS-friendly, no auth required).
 *
 * @param {UUID} uuid - The Minecraft UUID to lookup
 * @returns {Promise<Optional<DisplayName>>} The player's username or null if not found
 *
 * @example
 * const username = await getUsername('069a79f444e94726a5befca90e38aaf5');
 */
export async function getUsername(uuid: UUID): Promise<Optional<DisplayName>> {
  try {
    const uuidWithDashes = uuid.includes('-')
      ? uuid
      : uuid.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
    const response = await axios.get(`${PLAYERDB_API}/${uuidWithDashes}`);
    if (response.data.success && response.data.data?.player?.username) {
      return response.data.data.player.username;
    }
    return null;
  } catch {
    return null;
  }
}
