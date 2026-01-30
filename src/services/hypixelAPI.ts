import axios from 'axios';
import { isValidApiResponse } from '../utils/typeGuards';
import { shouldUseMock, loadMockData } from './mockService';

const BASE_URL = 'https://api.hypixel.net/v2/';

// Mock endpoint to file mapping (only for authenticated endpoints)
const MOCK_FILES: Record<string, string> = {
  player: 'player.json',
  'skyblock/profiles': 'profiles.json',
  status: 'status.json',
};

/**
 * Makes a GET request to the Hypixel API.
 * Uses mock data for authenticated endpoints when no API key is set.
 *
 * @param {string} endpoint - The API endpoint (e.g., 'player', 'skyblock/profiles')
 * @param {Record<string, unknown>} [params] - Query parameters to include
 * @param {boolean} [authenticated=false] - Whether to include the API key
 * @returns {Promise<any>} The API response data
 */
export async function get(
  endpoint: string,
  params?: Record<string, unknown>,
  authenticated: boolean = false
) {
  // Use mock data only for authenticated endpoints when no API key
  if (authenticated && shouldUseMock()) {
    const mockFile = MOCK_FILES[endpoint];
    if (mockFile) {
      return await loadMockData(mockFile);
    }
  }

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
