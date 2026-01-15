import type { Player } from './player';
import type { ProfileElement } from './profiles';
import type { AuctionsRoot } from './auctions';
import type { BazaarRoot } from './bazaar';

export interface HypixelApiResponse<T> {
  success: boolean;
  cause?: string;
  data?: T;
}

export interface PlayerApiResponse {
  success: boolean;
  cause?: string;
  player: Player;
}
export interface ProfileApiResponse {
  success: boolean;
  profiles: ProfileElement[];
}

export type AuctionsApiResponse = AuctionsRoot;

export type BazaarApiResponse = BazaarRoot;
