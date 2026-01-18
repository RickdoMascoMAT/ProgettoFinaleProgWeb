import { get } from './hypixelAPI';
import type { AuctionsRoot } from '../types/auctions';

export async function getAuctions(page: number = 0): Promise<AuctionsRoot> {
  if (page < 0) {
    return {
      success: false,
      auctions: [],
      page: 0,
      totalPages: 0,
      totalAuctions: 0,
      lastUpdated: 0,
    };
  }
  return await get('skyblock/auctions', { page }, false);
}
