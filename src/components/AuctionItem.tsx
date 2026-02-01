import type { Auction } from '../types/auctions';

interface AuctionItemProps {
  auction: Auction;
  onClick: (auction: Auction) => void;
}

export function AuctionItem({ auction, onClick }: AuctionItemProps) {
  const handleClick = () => {
    onClick(auction);
  };

  return (
    <div className="auction-item" onClick={handleClick}>
      <h3>{auction.item_name}</h3>
      <p>
        <strong>Price:</strong>{' '}
        {(auction.bin
          ? auction.starting_bid
          : auction.bids.length > 0
            ? auction.bids[auction.bids.length - 1].amount
            : auction.starting_bid
        ).toLocaleString('it-IT')}{' '}
        coins
      </p>
      <p>
        <strong>Ends on:</strong> {new Date(auction.end).toLocaleString('it-IT')}
      </p>
      <p>
        <strong>Auctioneer:</strong> {auction.auctioneerName || 'Unknown'}
      </p>
    </div>
  );
}
