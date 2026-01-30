import { useProgressiveAuctions } from '../hooks/useProgressiveAuctions';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import { AuctionItem } from '../components/AuctionItem';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Auction } from '../types/auctions';
import { useUUID } from '../hooks/useUUID';

const ITEMS_PER_PAGE = 50;
const MAX_SUGGESTIONS = 10;

export function AuctionsPage() {
  const navigate = useNavigate();
  const { data: auctionsData, error } = useProgressiveAuctions();
  const [filterText, setFilterText] = useState<string>('');
  const [appliedFilter, setAppliedFilter] = useState<string>('');
  const [searchMode, setSearchMode] = useState<'item' | 'auctioneer'>('item');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showBin, setShowBin] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Autocomplete state
  const [itemNames, setItemNames] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  // Load item names
  useEffect(() => {
    const loadItemNames = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${baseUrl}data/item-names.json`);
        if (response.ok) {
          const names = await response.json();
          setItemNames(names);
        }
      } catch (err) {
        console.error('Failed to load item names:', err);
      }
    };
    loadItemNames();
  }, []);

  // Update suggestions
  const suggestions = useMemo(() => {
    if (filterText.length >= 2 && itemNames.length > 0) {
      return itemNames
        .filter((name) => name.toLowerCase().includes(filterText.toLowerCase()))
        .slice(0, MAX_SUGGESTIONS);
    }
    return [];
  }, [filterText, itemNames]);

  // Fetch UUID for auctioneer search
  const {
    data: resolvedUUID,
    isLoading: uuidLoading,
    error: uuidError,
  } = useUUID(
    searchMode === 'auctioneer' && appliedFilter && !appliedFilter.includes('-')
      ? appliedFilter
      : ''
  );

  // Filter auctions based on mode
  const filteredAuctions = useMemo(() => {
    if (!appliedFilter) return [];

    let auctions = auctionsData || [];

    // Filter by BIN/non-BIN first
    auctions = auctions.filter((auction) => (showBin ? auction.bin : !auction.bin));

    const getPrice = (auction: Auction) =>
      auction.bin
        ? auction.starting_bid
        : auction.bids.length > 0
          ? auction.bids[auction.bids.length - 1].amount
          : Infinity;

    if (searchMode === 'item') {
      return auctions
        .filter((auction) => auction.item_name.toLowerCase().includes(appliedFilter.toLowerCase()))
        .sort((a, b) => getPrice(a) - getPrice(b));
    } else {
      // For auctioneer search, use resolved UUID if available, otherwise use appliedFilter directly (if it's already a UUID)
      const targetUUID = resolvedUUID || appliedFilter;
      return auctions
        .filter((auction) => auction.auctioneer === targetUUID)
        .sort((a, b) => getPrice(a) - getPrice(b));
    }
  }, [auctionsData, appliedFilter, searchMode, showBin, resolvedUUID]);

  const totalPages = Math.ceil(filteredAuctions.length / ITEMS_PER_PAGE);
  const paginatedAuctions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAuctions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAuctions, currentPage]);

  const handleFilterApply = () => {
    setAppliedFilter(filterText);
    setCurrentPage(1);
  };

  const handleSelectSuggestion = (name: string) => {
    setFilterText(name);
    setAppliedFilter(name);
    setCurrentPage(1);
  };

  const handleAuctionClick = async (auction: Auction) => {
    const command = `/viewauction ${auction.uuid}`;
    try {
      await navigator.clipboard.writeText(command);
      setSuccessMessage(`Command to viewAuction in game copied to clipboard`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Failed to copy command to clipboard:', err);
      // Fallback
      const tempInput = document.createElement('input');
      tempInput.value = command;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      setSuccessMessage(`Command to viewAuction in game copied to clipboard`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[selectedIndex]);
        return;
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        return;
      }
    }
    if (e.key === 'Enter') {
      handleFilterApply();
    }
  };

  return (
    <div>
      <h1>Auctions</h1>
      <p style={{ marginBottom: '20px', color: '#ccc' }}>
        This page displays available auctions on Hypixel SkyBlock. You can search auctions by item
        name or auctioneer name using the toggle below, and click on an auction to copy the
        /viewauction command to your clipboard.
      </p>
      <button onClick={() => navigate('/')} className="form-button back-button">
        Back to Home
      </button>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <button
            onClick={() => setSearchMode('item')}
            className={`form-button ${searchMode === 'item' ? 'active' : ''}`}
            style={{ marginRight: '10px' }}
          >
            Search by Item Name
          </button>
          <button
            onClick={() => setSearchMode('auctioneer')}
            className={`form-button ${searchMode === 'auctioneer' ? 'active' : ''}`}
          >
            Search by Auctioneer Name
          </button>
        </div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder={
              searchMode === 'item'
                ? 'Search items (e.g. Hyperion, Aspect...)'
                : 'Search auctioneers by name or UUID (e.g. Notch, 123e4567-e89b-12d3-a456-426614174000...)'
            }
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (searchMode === 'item' && suggestions.length > 0) setShowSuggestions(true);
            }}
            className="form-input"
            style={{ marginRight: '10px', minWidth: '250px' }}
            autoComplete="off"
          />
          {searchMode === 'item' && showSuggestions && suggestions.length > 0 && (
            <ul
              ref={suggestionsRef}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: '10px',
                backgroundColor: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: '4px',
                margin: 0,
                padding: 0,
                listStyle: 'none',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 1000,
              }}
            >
              {suggestions.map((name, index) => (
                <li
                  key={name}
                  onClick={() => handleSelectSuggestion(name)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    backgroundColor: index === selectedIndex ? '#4a4a4a' : 'transparent',
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
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
          {showBin ? 'Show Non-BIN only' : 'Show BIN only'}
        </button>
      </div>
      {error && <ErrorMessage message={error} />}
      {uuidError && <ErrorMessage message={`Failed to resolve username: ${uuidError.message}`} />}
      {uuidLoading &&
        searchMode === 'auctioneer' &&
        appliedFilter &&
        !appliedFilter.includes('-') && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#ccc' }}>
            Resolving username "{appliedFilter}"...
          </div>
        )}
      {successMessage && <SuccessMessage message={successMessage} />}

      {!appliedFilter ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          <p>Enter a search term to view auctions.</p>
          <p>There are {auctionsData?.length.toLocaleString('it-IT') || 0} auctions available.</p>
        </div>
      ) : (
        <div>
          <h2>
            {searchMode === 'item' ? 'Item' : 'Auctioneer'} Auctions - Results:{' '}
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

              <div
                className="auctions-list"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
              >
                {paginatedAuctions.map((auction) => (
                  <AuctionItem key={auction.uuid} auction={auction} onClick={handleAuctionClick} />
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
                  &lt; Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="form-button"
                >
                  Next &gt;
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
