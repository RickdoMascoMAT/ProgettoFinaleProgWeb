import { useState, useEffect, useCallback, useRef } from 'react';
import { getAuctions } from '../services/auctionApi';
import type { Auction, AuctionsRoot } from '../types/auctions';

const API_REFRESH_INTERVAL = 60000;
const INITIAL_BUFFER = 2000;
const BUFFER_INCREMENT = 100;
const BUFFER_STORAGE_KEY = 'auctionBufferMs';
const MAX_RETRIES = 3;

function getStoredBuffer(): number {
  const stored = localStorage.getItem(BUFFER_STORAGE_KEY);
  return stored ? parseInt(stored, 10) : INITIAL_BUFFER;
}

function setStoredBuffer(value: number): void {
  localStorage.setItem(BUFFER_STORAGE_KEY, value.toString());
}

async function fetchPageWithRetry(page: number, retries = MAX_RETRIES): Promise<AuctionsRoot> {
  const response = await getAuctions(page);
  if (!response.success) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 500));
      return fetchPageWithRetry(page, retries - 1);
    }
    throw new Error(`Failed to fetch page ${page}`);
  }
  return response;
}

export function useProgressiveAuctions() {
  const [data, setData] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<number | null>(null);
  const [timeUntilRefresh, setTimeUntilRefresh] = useState<number | null>(null);
  const cacheRef = useRef<Auction[] | null>(null);
  const lastUpdatedRef = useRef<number | null>(null);
  const bufferRef = useRef<number>(getStoredBuffer());

  const loadAuctions = useCallback(async (forceRefresh = false) => {
    if (cacheRef.current && !forceRefresh) {
      setData(cacheRef.current);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const firstResponse = await fetchPageWithRetry(0);

      const newLastUpdated = firstResponse.lastUpdated;

      if (forceRefresh && lastUpdatedRef.current !== null) {
        if (newLastUpdated === lastUpdatedRef.current) {
          bufferRef.current = Math.min(bufferRef.current + BUFFER_INCREMENT, 10000);
          setStoredBuffer(bufferRef.current);
          console.debug(`[Auctions] Buffer increased to ${bufferRef.current}ms`);
          setIsLoading(false);
          return;
        } else {
          bufferRef.current = Math.max(bufferRef.current - BUFFER_INCREMENT, 500);
          setStoredBuffer(bufferRef.current);
          console.debug(`[Auctions] Buffer reduced to ${bufferRef.current}ms`);
        }
      }

      lastUpdatedRef.current = newLastUpdated;
      setLastUpdatedTimestamp(newLastUpdated);

      const totalPages = firstResponse.totalPages;
      const pagePromises = Array.from({ length: totalPages - 1 }, (_, i) =>
        fetchPageWithRetry(i + 1)
      );
      const results = await Promise.allSettled(pagePromises);

      const allAuctions: Auction[] = [...firstResponse.auctions];
      for (const result of results) {
        if (result.status === 'fulfilled') {
          allAuctions.push(...result.value.auctions);
        }
      }

      cacheRef.current = allAuctions;
      setData(allAuctions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAuctions();
  }, [loadAuctions]);

  useEffect(() => {
    if (!lastUpdatedRef.current || isLoading) return;

    const updateCountdown = () => {
      const now = Date.now();
      const nextUpdate = lastUpdatedRef.current! + API_REFRESH_INTERVAL + bufferRef.current;
      const remaining = Math.max(0, nextUpdate - now);
      setTimeUntilRefresh(remaining);
      return remaining;
    };

    const countdownInterval = setInterval(() => {
      const remaining = updateCountdown();
      if (remaining <= 0) {
        clearInterval(countdownInterval);
        loadAuctions(true);
      }
    }, 1000);

    updateCountdown();

    return () => clearInterval(countdownInterval);
  }, [lastUpdatedTimestamp, isLoading, loadAuctions]);

  return { data, isLoading, error, lastUpdatedTimestamp, timeUntilRefresh };
}
