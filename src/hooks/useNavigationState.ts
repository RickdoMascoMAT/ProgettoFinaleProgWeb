import { useNavigate } from 'react-router-dom';

/**
 * Hook for handling navigation with state in the application.
 * Provides navigation functions that can pass data between routes.
 *
 * @returns {Object} Object containing navigation functions
 * @returns {Function} returns.navigateToProfile - Navigates to a player's profile page
 *
 * @example
 * const { navigateToProfile } = useNavigationState();
 * navigateToProfile('Notch', { player: playerData });
 */
export function useNavigationState() {
  const navigate = useNavigate();

  /**
   * Navigates to a player's profile page with optional state data.
   * @param {string} username - The player's username
   * @param {Record<string, unknown>} [state] - Optional state to pass to the profile page
   */
  const navigateToProfile = (username: string, state?: Record<string, unknown>) => {
    navigate(`/profile/${username}`, { state });
  };

  return { navigateToProfile };
}
