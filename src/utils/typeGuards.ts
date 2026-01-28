import type { ApiResponse } from '../types/advanced';
import type { Player } from '../types/player';

/**
 * Type guard to check if a response matches the ApiResponse structure.
 * Validates that the response has a boolean 'success' property and a 'data' property.
 *
 * @template T - The expected type of the response data
 * @param {any} response - The response object to validate
 * @returns {boolean} True if the response is a valid ApiResponse
 *
 * @example
 * if (isValidApiResponse<Player>(response)) {
 *   // TypeScript knows response.data is of type Player
 *   console.log(response.data.displayname);
 * }
 */
export function isValidApiResponse<T>(response: any): response is ApiResponse<T> {
  return response && typeof response.success === 'boolean' && 'data' in response;
}

/**
 * Type guard to check if an object has the essential fields of a Player.
 * Validates that the object has a string 'uuid' and 'displayname' property.
 *
 * @param {any} player - The object to validate
 * @returns {boolean} True if the object has essential Player fields
 *
 * @example
 * if (hasEssentialPlayerFields(data)) {
 *   // TypeScript knows data.uuid and data.displayname are strings
 *   console.log(`Player: ${data.displayname}`);
 * }
 */
export function hasEssentialPlayerFields(player: any): player is Player {
  return player && typeof player.uuid === 'string' && typeof player.displayname === 'string';
}
