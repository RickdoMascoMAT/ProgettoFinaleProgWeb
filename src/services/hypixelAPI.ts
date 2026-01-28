import axios from 'axios';
import { isValidApiResponse } from '../utils/typeGuards';

const BASE_URL = 'https://api.hypixel.net/v2/';

/**
 * Makes a GET request to the Hypixel API.
 * Automatically includes the API key for authenticated endpoints.
 *
 * @param {string} endpoint - The API endpoint (e.g., 'player', 'skyblock/profiles')
 * @param {Record<string, unknown>} [params] - Query parameters to include
 * @param {boolean} [authenticated=false] - Whether to include the API key
 * @returns {Promise<any>} The API response data
 *
 * @example
 * // Authenticated request
 * const player = await get('player', { uuid: '...' }, true);
 *
 * // Public request
 * const auctions = await get('skyblock/auctions', { page: 0 }, false);
 */
export async function get(
  endpoint: string,
  params?: Record<string, unknown>,
  authenticated: boolean = false
) {
  const API_KEY = localStorage.getItem('hypixelApiKey') || '';
  const requestParams = authenticated ? { key: API_KEY, ...params } : params;
  const response = await axios.get(`${BASE_URL}${endpoint}`, {
    params: requestParams,
  });
  return response.data;
}

/**
 * Validates a Hypixel API key by making a test request.
 * Uses Notch's UUID for the test request as it's the game creator.
 *
 * @param {string} apiKey - The API key to validate
 * @returns {Promise<boolean>} True if the API key is valid, false otherwise
 */
export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await axios.get(`${BASE_URL}player`, {
      params: { key: apiKey, uuid: '069a79f444e94726a5befca90e38aaf5' },
    });
    // Use type guard to validate response structure
    if (isValidApiResponse(response.data)) {
      return response.data.success === true;
    }
    return response.data.success === true;
  } catch {
    return false;
  }
}
