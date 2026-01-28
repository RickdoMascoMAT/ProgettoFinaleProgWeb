/**
 * Interface representing an API error with optional response and request info.
 * Used for typed error handling of Axios-like error objects.
 */
interface ApiError {
  response?: {
    status: number;
  };
  request?: unknown;
  message?: string;
}

/**
 * Handles API errors and returns user-friendly error messages.
 * Supports various error types including HTTP errors, network errors,
 * and generic JavaScript errors.
 *
 * @param {ApiError | Error | unknown} error - The error to handle
 * @returns {string} A user-friendly error message
 *
 * @example
 * try {
 *   await fetchData();
 * } catch (error) {
 *   const message = handleApiError(error);
 *   showError(message);
 * }
 */
export function handleApiError(error: ApiError | Error | unknown): string {
  // Handle Axios-like errors with response object
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const apiError = error as ApiError;
    if (apiError.response) {
      const status = apiError.response.status;
      // Map common HTTP status codes to user-friendly messages
      if (status === 401)
        return 'Missing or invalid API key. Please enter your API key in settings.';
      if (status === 429) return 'Too many requests. Please try again later.';
      if (status >= 500) return 'Server error. Please try again later.';
      return `API error: ${status}`;
    } else if ('request' in apiError) {
      // Request was made but no response received
      return 'Network error. Please check your internet connection.';
    }
  }

  // Handle standard JavaScript Error objects
  if (error instanceof Error) {
    return error.message || 'Unknown error.';
  }

  return 'Unknown error.';
}
