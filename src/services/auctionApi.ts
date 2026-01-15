import { get } from './hypixelAPI';
import type { AuctionsRoot } from '../types/auctions';

export async function getAuctions(page: number = 0): Promise<AuctionsRoot> {
  return await get('skyblock/auctions', { page }, true);
}
