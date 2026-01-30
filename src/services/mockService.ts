/**
 * Mock data configuration and utilities.
 * Enables using local JSON files instead of real API calls when no API key is set.
 */

// Dev player UUID (shown as favorite by default for demo purposes)
export const DEV_PLAYER_UUID = 'b6cf1077a3d848249929accc94fcbe83';
export const DEV_PLAYER_NAME = 'Rick_doMasco';

/**
 * Check if mock mode should be used for authenticated endpoints.
 * Returns true when no API key is configured.
 */
export const shouldUseMock = (): boolean => {
  const apiKey = localStorage.getItem('hypixelApiKey');
  return !apiKey || apiKey.trim() === '';
};

/**
 * Load mock data from the data folder
 */
export async function loadMockData<T>(filename: string): Promise<T> {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const response = await fetch(`${baseUrl}data/${filename}`);
  if (!response.ok) {
    throw new Error(`Failed to load mock data: ${filename}`);
  }
  return response.json();
}

// Mock UUID mapping for known players
const MOCK_UUIDS: Record<string, string> = {
  rick_domasco: 'b6cf1077a3d848249929accc94fcbe83',
  notch: '069a79f444e94726a5befca90e38aaf5',
};

// Reverse mapping for UUID to username
const MOCK_USERNAMES: Record<string, string> = Object.fromEntries(
  Object.entries(MOCK_UUIDS).map(([name, uuid]) => [uuid, name])
);

/**
 * Get mock UUID for a username (only used when no API key)
 */
export function getMockUUID(username: string): string | null {
  return MOCK_UUIDS[username.toLowerCase()] || null;
}

/**
 * Get mock username for a UUID (only used when no API key)
 */
export function getMockUsername(uuid: string): string | null {
  return MOCK_USERNAMES[uuid] || null;
}
