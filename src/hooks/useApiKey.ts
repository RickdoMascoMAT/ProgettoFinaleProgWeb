/**
 * Hook for managing the Hypixel API key stored in localStorage.
 * Provides functions to get, set, and clear the API key.
 *
 * @returns {Object} Object containing API key management functions
 * @returns {Function} returns.getApiKey - Retrieves the stored API key
 * @returns {Function} returns.setApiKey - Saves an API key to storage
 * @returns {Function} returns.clearApiKey - Removes the API key from storage
 *
 * @example
 * const { getApiKey, setApiKey, clearApiKey } = useApiKey();
 * const key = getApiKey();
 * setApiKey('new-api-key');
 */
export function useApiKey() {
  const getApiKey = () => localStorage.getItem('hypixelApiKey') || '';
  const setApiKey = (key: string) => localStorage.setItem('hypixelApiKey', key);
  const clearApiKey = () => localStorage.removeItem('hypixelApiKey');
  return { getApiKey, setApiKey, clearApiKey };
}
