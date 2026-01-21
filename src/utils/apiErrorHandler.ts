interface ApiError {
  response?: {
    status: number;
  };
  request?: unknown;
  message?: string;
}

export function handleApiError(error: ApiError | Error | unknown): string {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const apiError = error as ApiError;
    if (apiError.response) {
      const status = apiError.response.status;
      if (status === 401)
        return 'Missing or invalid API key. Please enter your API key in settings.';
      if (status === 429) return 'Too many requests. Please try again later.';
      if (status >= 500) return 'Server error. Please try again later.';
      return `API error: ${status}`;
    } else if ('request' in apiError) {
      return 'Network error. Please check your internet connection.';
    }
  }

  if (error instanceof Error) {
    return error.message || 'Unknown error.';
  }

  return 'Unknown error.';
}
