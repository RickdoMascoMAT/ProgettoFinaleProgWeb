import type { ProfileElement as Profile } from './profiles';
import type { Product as BazaarItem } from './bazaar';
import type { Auction } from './auctions';

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type ExtendedProfile = Profile & {
  auctions?: Auction[];
  bazaarItems?: BazaarItem[];
};
