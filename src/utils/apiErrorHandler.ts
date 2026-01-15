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
        return 'API key mancante o non valida. Inserisci la tua API key nelle impostazioni.';
      if (status === 429) return 'Troppe richieste. Riprova più tardi.';
      if (status >= 500) return 'Errore del server. Riprova più tardi.';
      return `Errore API: ${status}`;
    } else if ('request' in apiError) {
      return 'Errore di rete. Controlla la connessione internet.';
    }
  }

  if (error instanceof Error) {
    return error.message || 'Errore sconosciuto.';
  }

  return 'Errore sconosciuto.';
}
