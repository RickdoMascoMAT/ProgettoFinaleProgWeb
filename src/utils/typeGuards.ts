import type { ApiResponse } from '../types/advanced';
import type { Player } from '../types/player';

/**
 * Type guard to check if a response matches the ApiResponse structure.
 * Validates that the response has a boolean 'success' property and a 'data' property.
 *
 * @template T - The expected type of the response data
 * @param {unknown} response - The response object to validate
 * @returns {boolean} True if the response is a valid ApiResponse
 *
 * @example
 * if (isValidApiResponse<Player>(response)) {
 *   // TypeScript knows response.data is of type Player
 *   console.log(response.data.displayname);
 * }
 */
export function isValidApiResponse<T>(response: unknown): response is ApiResponse<T> {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    typeof (response as ApiResponse<T>).success === 'boolean' &&
    'data' in response
  );
}

/**
 * Type guard to check if an object has the essential fields of a Player.
 * Validates that the object has a string 'uuid' and 'displayname' property.
 *
 * @param {unknown} player - The object to validate
 * @returns {boolean} True if the object has essential Player fields
 *
 * @example
 * if (hasEssentialPlayerFields(data)) {
 *   // TypeScript knows data.uuid and data.displayname are strings
 *   console.log(`Player: ${data.displayname}`);
 * }
 */
export function hasEssentialPlayerFields(player: unknown): player is Player {
  return (
    typeof player === 'object' &&
    player !== null &&
    'uuid' in player &&
    typeof (player as Player).uuid === 'string' &&
    'displayname' in player &&
    typeof (player as Player).displayname === 'string'
  );
}
