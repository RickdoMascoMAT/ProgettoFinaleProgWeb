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

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  const filteredAuctions = useMemo(() => {
    if (!appliedFilter) return [];

    const auctions = showBin
      ? auctionsData?.filter((auction) => auction.bin) || []
      : auctionsData?.filter((auction) => !auction.bin) || [];

    return auctions
      .filter((auction) => auction.item_name.toLowerCase().includes(appliedFilter.toLowerCase()))
      .sort((a, b) => a.starting_bid - b.starting_bid);
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
        Torna alla Home
      </button>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          {lastUpdatedTimestamp && (
            <span>
              Ultimo aggiornamento:{' '}
              {new Date(lastUpdatedTimestamp).toLocaleTimeString('it-IT', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          )}
          {timeUntilRefresh !== null && (
            <span style={{ marginLeft: '20px' }}>
              Prossimo aggiornamento tra: {formatTime(timeUntilRefresh)}
            </span>
          )}
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Cerca item (es. Hyperion, Aspect...)"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-input"
          style={{ marginRight: '10px', minWidth: '250px' }}
        />
        <button onClick={handleFilterApply} className="form-button">
          Cerca
        </button>
        <button
          onClick={() => {
            setShowBin(!showBin);
            setCurrentPage(1);
          }}
          className={`form-button ${showBin ? 'active' : ''}`}
          style={{ marginLeft: '10px' }}
        >
          {showBin ? 'Mostra solo BIN' : 'Mostra solo Non-BIN'}
        </button>
      </div>
      {error && <ErrorMessage message={error} />}

      {!appliedFilter ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          <p>Inserisci un termine di ricerca per visualizzare le auctions.</p>
          <p>Ci sono {auctionsData?.length.toLocaleString('it-IT') || 0} auctions disponibili.</p>
        </div>
      ) : (
        <div>
          <h2>
            {showBin ? 'Auctions BIN' : 'Auctions Non-BIN'} - Risultati:{' '}
            {filteredAuctions.length.toLocaleString('it-IT')}
          </h2>

          {filteredAuctions.length === 0 ? (
            <p>Nessuna auction trovata per "{appliedFilter}".</p>
          ) : (
            <>
              <div style={{ marginBottom: '10px' }}>
                <span>
                  Pagina {currentPage} di {totalPages} ({paginatedAuctions.length} di{' '}
                  {filteredAuctions.length} risultati)
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
                      <strong>Prezzo:</strong> {auction.starting_bid.toLocaleString('it-IT')} coins
                    </p>
                    <p>
                      <strong>Scade il:</strong> {new Date(auction.end).toLocaleString('it-IT')}
                    </p>
                    <p>
                      <strong>Auctioneer:</strong> {auction.auctioneer}
                    </p>
                    <p>
                      <strong>ID Auction:</strong> {auction.uuid}
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
                  ← Precedente
                </button>
                <span>
                  Pagina {currentPage} di {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="form-button"
                >
                  Successiva →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
