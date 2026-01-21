import { useQuery, type UseQueryResult } from '@tanstack/react-query';

type UseApiDataParams<T> = {
  queryKey: string[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
};

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
