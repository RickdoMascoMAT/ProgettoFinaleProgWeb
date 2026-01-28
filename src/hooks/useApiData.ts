import { useQuery, type UseQueryResult } from '@tanstack/react-query';

/**
 * Parameters for the useApiData hook
 * @template T - The type of data returned by the query
 * @property {string[]} queryKey - Unique key for caching and identifying the query
 * @property {() => Promise<T>} queryFn - Async function that fetches the data
 * @property {boolean} [enabled] - Whether the query should execute (default: true)
 */
type UseApiDataParams<T> = {
  queryKey: string[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
};

/**
 * Generic hook for fetching API data using React Query.
 * Provides a consistent interface for data fetching with caching,
 * loading states, and error handling.
 *
 * @template T - The type of data returned by the query
 * @param {UseApiDataParams<T>} params - The query parameters
 * @returns {UseQueryResult<T, Error>} React Query result object with data, loading, and error states
 *
 * @example
 * const { data, isLoading, error } = useApiData({
 *   queryKey: ['player', uuid],
 *   queryFn: () => fetchPlayer(uuid),
 *   enabled: !!uuid,
 * });
 */
export function useApiData<T>({
  queryKey,
  queryFn,
  enabled = true,
}: UseApiDataParams<T>): UseQueryResult<T, Error> {
  return useQuery<T, Error>({
    queryKey,
    queryFn,
    enabled,
  });
}
