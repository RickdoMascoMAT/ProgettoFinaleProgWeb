export type UUID = string;

export type DisplayName = string;

export type Rank = string;

export type Timestamp = number;

export type Optional<T> = T | null;

export type LoadingState<T> = {
  isLoading: boolean;
  data?: T;
  error?: string;
};
