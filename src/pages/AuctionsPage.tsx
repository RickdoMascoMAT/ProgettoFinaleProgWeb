import { useProgressiveAuctions } from '../hooks/useProgressiveAuctions';
import ErrorMessage from '../components/ErrorMessage';
import { useState, useMemo } from 'react';

const ITEMS_PER_PAGE = 50;

export function AuctionsPage() {
  const {
    data: auctionsData,
    error,
    lastUpdatedTimestamp,
    timeUntilRefresh,
  } = useProgressiveAuctions();
  const [filterText, setFilterText] = useState<string>('');
  const [showBin, setShowBin] = useState<boolean>(true);
  const [appliedFilter, setAppliedFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  /**
   * Formats milliseconds to a readable time string.
   * @param {number} ms - Time in milliseconds
   * @returns {string} Formatted time string (e.g., "45s")
   */
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  /**
   * Memoized filtered and sorted auctions.
   * Only computes when dependencies change for performance.
   */
  const filteredAuctions = useMemo(() => {
    if (!appliedFilter) return [];

    const auctions = showBin
      ? auctionsData?.filter((auction) => auction.bin) || []
      : auctionsData?.filter((auction) => !auction.bin) || [];

    /**
     * Gets the current price of an auction.
     * For BIN: starting bid. For regular: highest bid or Infinity if no bids.
     */
    const getPrice = (auction: any) =>
      auction.bin
        ? auction.starting_bid
        : auction.bids.length > 0
          ? auction.bids[auction.bids.length - 1].amount
          : Infinity;

    return auctions
      .filter((auction) => auction.item_name.toLowerCase().includes(appliedFilter.toLowerCase()))
      .sort((a, b) => getPrice(a) - getPrice(b));
  }, [auctionsData, appliedFilter, showBin]);

  const totalPages = Math.ceil(filteredAuctions.length / ITEMS_PER_PAGE);
  const paginatedAuctions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAuctions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAuctions, currentPage]);

  const handleFilterApply = () => {
    setAppliedFilter(filterText);
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFilterApply();
    }
  };

  return (
    <div>
      <h1>Auctions</h1>
      <button onClick={() => (window.location.href = '/')} className="form-button back-button">
        Back to Home
      </button>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          {lastUpdatedTimestamp && (
            <span>
              Last update:{' '}
              {new Date(lastUpdatedTimestamp).toLocaleTimeString('it-IT', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          )}
          {timeUntilRefresh !== null && (
            <span style={{ marginLeft: '20px' }}>
              Next update in: {formatTime(timeUntilRefresh)}
            </span>
          )}
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search items (e.g. Hyperion, Aspect...)"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-input"
          style={{ marginRight: '10px', minWidth: '250px' }}
        />
        <button onClick={handleFilterApply} className="form-button">
          Search
        </button>
        <button
          onClick={() => {
            setShowBin(!showBin);
            setCurrentPage(1);
          }}
          className={`form-button ${showBin ? 'active' : ''}`}
          style={{ marginLeft: '10px' }}
        >
          {showBin ? 'Show BIN only' : 'Show Non-BIN only'}
        </button>
      </div>
      {error && <ErrorMessage message={error} />}

      {!appliedFilter ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          <p>Enter a search term to view auctions.</p>
          <p>There are {auctionsData?.length.toLocaleString('it-IT') || 0} auctions available.</p>
        </div>
      ) : (
        <div>
          <h2>
            {showBin ? 'BIN Auctions' : 'Non-BIN Auctions'} - Results:{' '}
            {filteredAuctions.length.toLocaleString('it-IT')}
          </h2>

          {filteredAuctions.length === 0 ? (
            <p>No auctions found for "{appliedFilter}".</p>
          ) : (
            <>
              <div style={{ marginBottom: '10px' }}>
                <span>
                  Page {currentPage} of {totalPages} ({paginatedAuctions.length} of{' '}
                  {filteredAuctions.length} results)
                </span>
              </div>

              <div className="auctions-list">
                {paginatedAuctions.map((auction) => (
                  <div
                    key={auction.uuid}
                    className="auction-item"
                    style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
                  >
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
                      <strong>Auctioneer:</strong> {auction.auctioneer}
                    </p>
                    <p>
                      <strong>Auction ID:</strong> {auction.uuid}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="form-button"
                >
                  ← Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="form-button"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
