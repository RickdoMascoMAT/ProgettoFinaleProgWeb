import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * React Query client instance.
 * Manages caching, background updates, and stale data for all API queries.
 */
const queryClient = new QueryClient();

/**
 * Application entry point.
 * Renders the React application with StrictMode and React Query provider.
 *
 * - StrictMode: Enables additional development checks and warnings
 * - QueryClientProvider: Provides React Query context for data fetching
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
