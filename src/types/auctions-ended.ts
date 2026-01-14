export interface AuctionsEndedRoot {
    success:     boolean;
    lastUpdated: number;
    auctions:    Auction[];
}

export interface Auction {
    auction_id:     string;
    seller:         string;
    seller_profile: string;
    buyer:          string;
    buyer_profile:  string;
    timestamp:      number;
    price:          number;
    bin:            boolean;
    item_bytes:     string;
}
