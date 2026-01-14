export interface HypixelConfig {
    apiKey: string;
    baseUrl: string;
}

export interface EndpointConfig {
    path: string;
    requiresKey?: boolean;
    queryParams?: Record<string, string | number>;
    outputFile: string;
}

export interface DownloadResult {
    endpoint: string;
    status: number;
    filePath: string;
}
