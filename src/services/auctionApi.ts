import { get } from './hypixelAPI';
import type { AuctionsRoot } from '../types/auctions';

/**
 * Fetches a page of auction data from the Hypixel SkyBlock Auctions API.
 * Returns an empty result for invalid page numbers.
 *
 * @param {number} [page=0] - The page number to fetch (0-indexed)
 * @returns {Promise<AuctionsRoot>} The auctions data for the requested page
 *
 * @example
 * const firstPage = await getAuctions(0);
 * console.log(`Found ${firstPage.totalAuctions} total auctions`);
 */
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
