/**
 * Retrieves the list of favorite player UUIDs from localStorage.
 *
 * @returns {string[]} Array of favorite player UUIDs
 */
export function getFavorites(): string[] {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
}

/**
 * Adds a player UUID to the favorites list.
 * Prevents duplicate entries.
 *
 * @param {string} uuid - The player's UUID to add
 */
export function addFavorite(uuid: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(uuid)) {
    favorites.push(uuid);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

/**
 * Removes a player UUID from the favorites list.
 *
 * @param {string} uuid - The player's UUID to remove
 */
export function removeFavorite(uuid: string): void {
  const favorites = getFavorites();
  const index = favorites.indexOf(uuid);
  if (index > -1) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

/**
 * User preferences configuration interface.
 * @property {'light' | 'dark'} theme - The UI theme preference
 * @property {string} language - The preferred language code
 * @property {boolean} notifications - Whether notifications are enabled
 */
export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

/**
 * Saves user preferences to localStorage asynchronously.
 * Simulates an async API call with a 500ms delay.
 *
 * @param {UserPreferences} preferences - The preferences to save
 * @returns {Promise<{success: boolean, message: string}>} Result of the save operation
 */
export async function saveUserPreferences(
  preferences: UserPreferences
): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        resolve({
          success: true,
          message: 'Preferences saved successfully',
        });
      } catch {
        reject({
          success: false,
          message: 'Failed to save preferences',
        });
      }
    }, 500);
  });
}
