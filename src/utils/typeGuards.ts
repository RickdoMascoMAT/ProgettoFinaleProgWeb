import type { ApiResponse } from '../types/advanced';
import type { Player } from '../types/player';

export function isValidApiResponse<T>(response: any): response is ApiResponse<T> {
  return response && typeof response.success === 'boolean' && 'data' in response;
}

export function hasEssentialPlayerFields(player: any): player is Player {
  return player && typeof player.uuid === 'string' && typeof player.displayname === 'string';
}
