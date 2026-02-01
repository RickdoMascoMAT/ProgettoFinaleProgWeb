import { useProgressiveAuctions } from '../hooks/useProgressiveAuctions';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import { AuctionItem } from '../components/AuctionItem';
import { useState, useMemo, useRef, useEffect } from 'react';
import type { Auction } from '../types/auctions';
import { useUUID } from '../hooks/useUUID';
import { getUsername } from '../services/minecraftAPI';
import { shouldUseMock } from '../services/mockService';
import pLimit from 'p-limit';

const ITEMS_PER_PAGE = 50;
const MAX_SUGGESTIONS = 10;

/**
 * Auctions page component for browsing Hypixel SkyBlock Auction House.
 *
 * Features:
 * - Search auctions by item name or auctioneer (username/UUID)
 * - Autocomplete suggestions for item names
 * - Filter by BIN (Buy It Now) or regular auctions
 * - Pagination for large result sets
 * - Click auction to copy /viewauction command to clipboard
 * - Real-time auctioneer name resolution from UUIDs
 * - Price sorting (lowest first)
 *
 * @returns {JSX.Element} The auctions page UI with search and results
 */
export function AuctionsPage() {
  const { data: auctionsData, error, timeUntilRefresh } = useProgressiveAuctions();
  const [filterText, setFilterText] = useState<string>('');
  const [appliedFilter, setAppliedFilter] = useState<string>('');
  const [searchMode, setSearchMode] = useState<'item' | 'auctioneer'>('item');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showBin, setShowBin] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [recentSearches, setRecentSearches] = useState<{ item: string[]; auctioneer: string[] }>({
    item: [
      'Hyperion',
      "Necron's Handle",
      'Aspect of the Void',
      'Aspect of the Dragon',
      'Livid Dagger',
    ],
    auctioneer: [],
  });

  const [auctioneerName, setAuctioneerName] = useState<string | null>(null);
  const [usernameMap, setUsernameMap] = useState<Map<string, string | null>>(new Map());

  const limit = useMemo(() => pLimit(10), []);

  const [itemNames, setItemNames] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  /**
   * Loads available item names for autocomplete suggestions.
   * Fetches from Hypixel API if API key is present, otherwise uses static data.
   * Filters out items that can't be auctioned and simplifies names for better matching.
   */
  useEffect(() => {
    const loadItemNames = async () => {
      if (shouldUseMock()) {
        try {
          const baseUrl = import.meta.env.BASE_URL || '/';
          const response = await fetch(`${baseUrl}data/item-names.json`);
          if (response.ok) {
            const names = (await response.json()) as string[];
            const simplifiedNames = names.map((name: string) => simplifyItemName(name));
            const filteredSimplified = simplifiedNames.filter((simplified) => {
              const isMinionRoman = /minion\s+[ivxlcdm]+$/i.test(simplified);
              return !isMinionRoman;
            });
            const uniqueNames = Array.from(new Set(filteredSimplified)).sort();
            setItemNames(uniqueNames);
          }
        } catch {
          // Silently fail
        }
      } else {
        try {
          const itemsResponse = await fetch('https://api.hypixel.net/resources/skyblock/items');
          if (!itemsResponse.ok) throw new Error('Failed to fetch items');
          const itemsData = await itemsResponse.json();
          if (!itemsData.success) throw new Error('Items API failed');

          const bazaarResponse = await fetch('https://api.hypixel.net/skyblock/bazaar');
          if (!bazaarResponse.ok) throw new Error('Failed to fetch bazaar');
          const bazaarData = await bazaarResponse.json();
          if (!bazaarData.success) throw new Error('Bazaar API failed');

          const bazaarIds = new Set(Object.keys(bazaarData.products));

          interface HypixelItem {
            id: string;
            name: string;
            can_auction?: boolean;
          }
          const auctionableItems = (itemsData.items as HypixelItem[]).filter(
            (item) => item.can_auction !== false && !bazaarIds.has(item.id)
          );

          const names = auctionableItems.map((item) => item.name);
          const filteredNames = names.filter((name: string) => {
            const hasPercent = name.includes('%');
            const simplified = simplifyItemName(name);
            const isMinionRoman = /minion\s+[ivxlcdm]+$/i.test(simplified);
            return !hasPercent && !isMinionRoman;
          });
          const simplifiedNames = filteredNames.map((name: string) => simplifyItemName(name));
          const uniqueNames = Array.from(new Set(simplifiedNames)).sort() as string[];
          setItemNames(uniqueNames);
        } catch {
          try {
            const baseUrl = import.meta.env.BASE_URL || '/';
            const response = await fetch(`${baseUrl}data/item-names.json`);
            if (response.ok) {
              const names = (await response.json()) as string[];
              const filteredNames = names.filter((name) => {
                const lower = name.toLowerCase();
                const hasPercent = name.includes('%');
                const hasMinion = lower.includes('minion');
                const hasRoman = /[IVXLCDM]+/.test(name);
                return !hasPercent && !(hasMinion && hasRoman);
              });
              const simplifiedNames = filteredNames.map((name: string) => simplifyItemName(name));
              const uniqueNames = Array.from(new Set(simplifiedNames)).sort();
              setItemNames(uniqueNames);
            }
          } catch {
            // Silently fail
          }
        }
      }
    };
    loadItemNames();
  }, []);

  /**
   * Generates autocomplete suggestions based on current search mode and filter text.
   * Shows recent searches when input is empty, otherwise filters item names or recent auctioneers.
   */
  const suggestions = useMemo(() => {
    if (filterText.length === 0) {
      return recentSearches[searchMode].slice(0, MAX_SUGGESTIONS);
    } else if (searchMode === 'item' && filterText.length >= 1) {
      return itemNames
        .filter((name) => name.toLowerCase().includes(filterText.toLowerCase()))
        .slice(0, MAX_SUGGESTIONS);
    } else if (searchMode === 'auctioneer' && filterText.length >= 1) {
      return recentSearches.auctioneer
        .filter((name) => name.toLowerCase().includes(filterText.toLowerCase()))
        .slice(0, MAX_SUGGESTIONS);
    }
    return [];
  }, [filterText, itemNames, recentSearches, searchMode]);

  /**
   * Resolves username to UUID for auctioneer search mode.
   * Only active when searching by auctioneer name (not UUID).
   */
  const {
    data: resolvedUUID,
    isLoading: uuidLoading,
    error: uuidError,
  } = useUUID(
    searchMode === 'auctioneer' && appliedFilter && !appliedFilter.includes('-')
      ? appliedFilter
      : ''
  );

  /**
   * Fetches and displays the auctioneer's username when searching by auctioneer.
   */
  useEffect(() => {
    if (searchMode === 'auctioneer' && appliedFilter && !shouldUseMock()) {
      const targetUUID = resolvedUUID || appliedFilter;
      getUsername(targetUUID)
        .then((name) => setAuctioneerName(name))
        .catch(() => setAuctioneerName(null));
    } else {
      setAuctioneerName(null);
    }
  }, [searchMode, appliedFilter, resolvedUUID]);

  /**
   * Fetches usernames for all auctioneers in the filtered results.
   * Uses rate limiting to avoid overwhelming the API.
   */
  useEffect(() => {
    if (!appliedFilter || shouldUseMock()) {
      setUsernameMap(new Map());
      return;
    }

    let auctions = auctionsData || [];
    auctions = auctions.filter((auction) => (showBin ? auction.bin : !auction.bin));

    let filtered: Auction[];
    if (searchMode === 'item') {
      filtered = auctions.filter((auction) =>
        auction.item_name.toLowerCase().includes(appliedFilter.toLowerCase())
      );
    } else {
      const targetUUID = resolvedUUID || appliedFilter;
      filtered = auctions.filter((auction) => auction.auctioneer === targetUUID);
    }

    const uniqueAuctioneers = new Set(filtered.map((a) => a.auctioneer));
    const promises = Array.from(uniqueAuctioneers).map((uuid) =>
      limit(() => getUsername(uuid).catch(() => null))
    );

    Promise.all(promises).then((names) => {
      const map = new Map<string, string | null>();
      Array.from(uniqueAuctioneers).forEach((uuid, i) => {
        map.set(uuid, names[i]);
      });
      setUsernameMap(map);
    });
  }, [appliedFilter, searchMode, showBin, resolvedUUID, auctionsData, limit]);

  /**
   * Filters and sorts auctions based on search criteria.
   * Results are sorted by price (lowest first) and include auctioneer names.
   */
  const filteredAuctions = useMemo(() => {
    if (!appliedFilter) return [];

    let auctions = auctionsData || [];
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
        .sort((a, b) => getPrice(a) - getPrice(b))
        .map((a) => ({ ...a, auctioneerName: usernameMap.get(a.auctioneer) || undefined }));
    } else {
      const targetUUID = resolvedUUID || appliedFilter;
      return auctions
        .filter((auction) => auction.auctioneer === targetUUID)
        .sort((a, b) => getPrice(a) - getPrice(b))
        .map((a) => ({ ...a, auctioneerName: usernameMap.get(a.auctioneer) || undefined }));
    }
  }, [auctionsData, appliedFilter, searchMode, showBin, resolvedUUID, usernameMap]);

  const totalPages = Math.ceil(filteredAuctions.length / ITEMS_PER_PAGE);

  /**
   * Paginates filtered auctions based on current page.
   */
  const paginatedAuctions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAuctions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAuctions, currentPage]);

  /**
   * Applies the current filter text to the auction list.
   * Updates recent searches and resets pagination.
   */
  const handleFilterApply = () => {
    setAppliedFilter(filterText);
    setCurrentPage(1);
    if (filterText.trim() !== '') {
      setRecentSearches((prev) => ({
        ...prev,
        [searchMode]: [filterText, ...prev[searchMode].filter((s) => s !== filterText)].slice(0, 5),
      }));
    }
  };

  /**
   * Handles selection of an autocomplete suggestion.
   * Applies the suggestion as filter and updates recent searches.
   */
  const handleSelectSuggestion = (name: string) => {
    setFilterText(name);
    setAppliedFilter(name);
    setCurrentPage(1);
    setShowSuggestions(false);
    setRecentSearches((prev) => ({
      ...prev,
      [searchMode]: [name, ...prev[searchMode].filter((s) => s !== name)].slice(0, 5),
    }));
  };

  /**
   * Handles auction item click by copying the /viewauction command to clipboard.
   * Shows success message after copying.
   *
   * @param {Auction} auction - The auction that was clicked
   */
  const handleAuctionClick = async (auction: Auction) => {
    const command = `/viewauction ${auction.uuid}`;
    try {
      await navigator.clipboard.writeText(command);
      setSuccessMessage(`Command to viewAuction in game copied to clipboard`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
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

  /**
   * Handles keyboard navigation for the search input and autocomplete.
   * Supports Enter, Arrow Up/Down, and Escape keys.
   *
   * @param {React.KeyboardEvent} e - The keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (filterText.trim() === '') {
        setAppliedFilter('');
        setCurrentPage(1);
        setShowSuggestions(false);
        return;
      } else {
        handleFilterApply();
        return;
      }
    }
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
  };

  return (
    <div>
      <h1>Auctions</h1>
      <p className="auction-header-text">
        Next refresh in {timeUntilRefresh ? Math.ceil(timeUntilRefresh / 1000) : 0} seconds
      </p>
      <p className="auction-intro">
        This page displays available auctions on Hypixel SkyBlock. You can search auctions by item
        name or auctioneer name using the toggle below, and click on an auction to copy the
        /viewauction command to your clipboard.
      </p>
      <div className="auction-controls">
        <div className="search-mode-selector">
          <label className="search-mode-label">Search Mode:</label>
          <div className="search-mode-toggle-container">
            <button
              onClick={() => {
                setSearchMode('item');
                setFilterText('');
                setAppliedFilter('');
                setCurrentPage(1);
                setShowSuggestions(false);
                setSelectedIndex(-1);
              }}
              className={`search-mode-button ${searchMode === 'item' ? 'active' : ''}`}
            >
              Item
            </button>
            <button
              onClick={() => {
                setSearchMode('auctioneer');
                setFilterText('');
                setAppliedFilter('');
                setCurrentPage(1);
                setShowSuggestions(false);
                setSelectedIndex(-1);
              }}
              className={`search-mode-button ${searchMode === 'auctioneer' ? 'active' : ''}`}
            >
              Auctioneer
            </button>
          </div>
        </div>
        <div className="search-input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder={
              searchMode === 'item' ? 'Search items' : 'Search auctioneers by name or UUID'
            }
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setShowSuggestions(true);
            }}
            onBlur={() => {
              // Delay hiding to allow clicking on suggestions
              setTimeout(() => setShowSuggestions(false), 150);
            }}
            className="form-input auction-search-input"
            autoComplete="off"
          />
          {showSuggestions &&
            (suggestions.length > 0 || (searchMode === 'item' && filterText.length >= 1)) && (
              <ul ref={suggestionsRef} className="suggestions-dropdown">
                {suggestions.length > 0
                  ? suggestions.map((name, index) => (
                      <li
                        key={name}
                        onClick={() => handleSelectSuggestion(name)}
                        className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        {name}
                      </li>
                    ))
                  : searchMode === 'item' && (
                      <li className="no-suggestions-item">No suggestions</li>
                    )}
              </ul>
            )}
        </div>
        <div className="search-actions">
          <button
            onClick={() => {
              setShowBin(!showBin);
              setCurrentPage(1);
            }}
            className={`search-bin-toggle ${showBin ? 'active' : ''}`}
          >
            {showBin ? 'Show Non-BIN only' : 'Show BIN only'}
          </button>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      {uuidError && <ErrorMessage message={`Failed to resolve username: ${uuidError.message}`} />}
      {uuidLoading &&
        searchMode === 'auctioneer' &&
        appliedFilter &&
        !appliedFilter.includes('-') && (
          <div className="loading-message">Resolving username "{appliedFilter}"...</div>
        )}
      {successMessage && <SuccessMessage message={successMessage} />}

      {!appliedFilter ? (
        <div className="no-results-message">
          <p>Enter a search term to view auctions.</p>
          <p>There are {auctionsData?.length.toLocaleString('it-IT') || 0} auctions available.</p>
        </div>
      ) : (
        <div className="auctions-results">
          <h2>
            {searchMode === 'item'
              ? `Search results for "${appliedFilter}"`
              : auctioneerName
                ? `Auctions by ${auctioneerName}`
                : `Auctions by ${appliedFilter}`}
            {' - '}
            {filteredAuctions.length.toLocaleString('it-IT')} result
            {filteredAuctions.length !== 1 ? 's' : ''}
          </h2>

          {filteredAuctions.length === 0 ? (
            <p>No auctions found for "{appliedFilter}".</p>
          ) : (
            <>
              <div className="results-header">
                <span>
                  Page {currentPage} of {totalPages} ({paginatedAuctions.length} of{' '}
                  {filteredAuctions.length} results)
                </span>
              </div>

              <div className="auctions-grid">
                {paginatedAuctions.map((auction) => (
                  <AuctionItem key={auction.uuid} auction={auction} onClick={handleAuctionClick} />
                ))}
              </div>

              <div className="pagination-controls">
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

/**
 * Simplifies an item name by removing common prefixes and formatting.
 * Used for better autocomplete matching and duplicate removal.
 *
 * Removes:
 * - Quality prefixes (Legendary, Epic, etc.)
 * - Stat prefixes (Spicy, Wise, etc.)
 * - Pet level info
 * - Special characters
 *
 * @param {string} name - The original item name
 * @returns {string} The simplified item name in lowercase
 */
function simplifyItemName(name: string): string {
  let simplified = name.toLowerCase().trim();
  const prefixes = [
    'spicy',
    'shiny',
    'legendary',
    'epic',
    'rare',
    'uncommon',
    'common',
    'enchanted',
    'super',
    'ultimate',
    'ancient',
    'fabled',
    'mythic',
    'heroic',
    'wise',
    'strong',
    'unyielding',
    'perfect',
    'flawless',
    'refined',
    '✪',
  ];
  prefixes.forEach((prefix) => {
    if (simplified.startsWith(prefix + ' ')) {
      simplified = simplified.slice(prefix.length + 1);
    }
  });
  simplified = simplified.replace(/lvl \[lvl \d+\]/g, '').trim();
  simplified = simplified.replace(/\s*\]$/, '').trim();
  return simplified;
}
