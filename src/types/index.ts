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

export const rankColors: Record<string, string> = {
    'NONE': '#AAAAAA',
    'VIP': '#00AA00',
    'VIP_PLUS': '#55FFFF',
    'MVP': '#55AAFF',
    'MVP_PLUS': '#55AAFF',
    'MVP_PLUS_PLUS': '#FFAA00',
    'YOUTUBER': '#FF5555',
    'OWNER': '#AA0000',
    'ADMIN': '#FF5555',
    'MODERATOR': '#AA00AA',
};

