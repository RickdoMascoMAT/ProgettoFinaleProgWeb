import axios from 'axios';
import type { DisplayName, UUID, Optional } from '../types/index';

// Original Mojang API URL (commented out for proxy usage)
// const BASE_URL = 'https://api.mojang.com';

// Using a proxy to bypass CORS restrictions during development
const BASE_URL = '/api';

/**
 * Retrieves the UUID for a Minecraft username from the Mojang API.
 * Uses a proxy endpoint to avoid CORS issues during development.
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
    const response = await axios.get(`${BASE_URL}/users/profiles/minecraft/${username}`);
    return response.data.id;
  } catch (error) {
    console.error('Error fetching UUID:', error);
    return null;
  }
}
