export interface AuctionsRoot {
  success: boolean;
  page: number;
  totalPages: number;
  totalAuctions: number;
  lastUpdated: number;
  auctions: Auction[];
}

export interface Auction {
  uuid: string;
  auctioneer: string;
  profile_id: string;
  coop: string[];
  start: number;
  end: number;
  item_name: string;
  item_lore: string;
  extra: string;
  categories: string[];
  category: string;
  tier: string;
  starting_bid: number;
  item_bytes: string;
  claimed: boolean;
  claimed_bidders: any[];
  highest_bid_amount: number;
  last_updated: number;
  bin: boolean;
  bids: Bid[];
  item_uuid?: string;
}

export interface Bid {
  auction_id: string;
  bidder: string;
  profile_id: string;
  amount: number;
  timestamp: number;
}
