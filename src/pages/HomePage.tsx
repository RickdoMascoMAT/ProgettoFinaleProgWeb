import { useState, useEffect } from 'react';
import { getUUID } from '../services/minecraftAPI.ts';
import { useApiKey } from '../hooks/useApiKey.ts';
import ErrorMessage from '../components/ErrorMessage.tsx';
import SuccessMessage from '../components/SuccessMessage.tsx';
import { getFavorites, saveUserPreferences } from '../services/favoritesApi';
import { FavoriteItem } from '../components/FavoriteItem';
import { handleApiError } from '../utils/apiErrorHandler';
import { validateApiKey } from '../services/hypixelAPI';
import { shouldUseMock } from '../services/mockService';

/**
 * Home page component.
 * Main entry point of the application with API key configuration,
 * player search functionality, and favorites management.
 *
 * Features:
 * - Hypixel API key input and validation
 * - Minecraft username search to find players
 * - Display of searched player with navigation to profile
 * - List of favorite players for quick access
 * - Navigation to auctions page
 *
 * @returns {JSX.Element} The home page UI
 */
export function HomePage() {
  const [username, setUsername] = useState(``);

  const { setApiKey: saveApiKey, getApiKey, clearApiKey } = useApiKey();
  const savedKey = getApiKey();
  const [apiKey, setApiKey] = useState(savedKey ? '**************' : '');
  const [isApiKeyModified, setIsApiKeyModified] = useState(false);

  const [APIMessage, setAPIMessage] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [apiKeyWarning, setApiKeyWarning] = useState('');

  const favorites = getFavorites();
  const [searchedUUID, setSearchedUUID] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const usingMockData = shouldUseMock();

  useEffect(() => {
    if (APIMessage) {
      const timer = setTimeout(() => setAPIMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [APIMessage]);

  useEffect(() => {
    if (usernameMessage) {
      const timer = setTimeout(() => setUsernameMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [usernameMessage]);

  useEffect(() => {
    const checkApiKeyValidity = async () => {
      if (savedKey) {
        const isValid = await validateApiKey(savedKey);
        if (!isValid) {
          clearApiKey();
          setApiKey('');
          setApiKeyWarning('Your API key was invalid or expired and has been removed.');
        } else {
          setApiKeyWarning('');
        }
      }
    };
    checkApiKeyValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedKey]);

  const handleApiKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isApiKeyModified && apiKey !== '**************') {
      const isValid = await validateApiKey(apiKey);
      if (isValid) {
        saveApiKey(apiKey);

        try {
          await saveUserPreferences({
            theme: 'dark',
            language: 'en',
            notifications: true,
          });
        } catch {
          // Intentionally empty - preferences save is not critical
        }

        setAPIMessage('API key saved successfully!');
        setApiKey('**************');
        setIsApiKeyModified(false);
      } else {
        setAPIMessage('Invalid API key. Please check and try again.');
      }
    } else if (!isApiKeyModified) {
      setAPIMessage('API key already saved');
    }
  };

  /**
   * Handles username search form submission.
   * Looks up the UUID for the entered username and stores the result.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const uuid = await getUUID(username);
      if (uuid) {
        localStorage.setItem('selectedPlayerUUID', uuid);
        setUsernameMessage('UUID saved successfully!');
        setSearchedUUID(uuid);
      } else {
        setUsernameMessage('Username not found');
      }
    } catch (error) {
      setUsernameMessage(handleApiError(error));
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <div className="app-header">
        <h1 className="page-title">Hypixel SkyBlock Stats Tracker</h1>
      </div>
      <p className="intro-text">
        Welcome! Enter your Hypixel API key to access real player data, or click on the DEV player
        below to see sample data.
      </p>

      {usingMockData && (
        <div className="demo-mode-banner">
          <p>
            <strong>Demo Mode:</strong> No API key configured. Click on{' '}
            <strong>Rick_doMasco (DEV)</strong> below to view sample data.
          </p>
        </div>
      )}

      <form onSubmit={handleApiKeySubmit}>
        <div className="api-key-section">
          <label className="api-key-label">
            Hypixel API Key:
            <br />
          </label>
          <label className="api-key-sublabel">
            Use the&nbsp;
            <a href="https://developer.hypixel.net" target="_blank" rel="noopener noreferrer">
              Official website
            </a>{' '}
            to request the API Key
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setIsApiKeyModified(true);
            }}
            aria-label="Hypixel API key"
          />
          <button type="submit" className="form-button" aria-label="Save API key">
            Save API key
          </button>
          {savedKey && (
            <button
              type="button"
              className="form-button clear-button"
              onClick={() => {
                clearApiKey();
                setApiKey('');
                setApiKeyWarning('');
                setAPIMessage('API key removed successfully!');
                setIsApiKeyModified(false);
              }}
              aria-label="Clear API key"
            >
              Clear API key
            </button>
          )}
          {APIMessage && <SuccessMessage message={APIMessage} />}
          {apiKeyWarning && <ErrorMessage message={apiKeyWarning} />}
        </div>
      </form>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="search-form search-form-centered">
          <div>
            <label className="api-key-label">Minecraft Username:</label>
            <input
              type="text"
              className="form-input search-input-large"
              placeholder="E.g. Notch"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Minecraft username"
              disabled={!savedKey || isSearching}
            />
            <button
              type="submit"
              className="form-button search-button"
              disabled={!savedKey || isSearching || !username.trim()}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
        {usingMockData && (
          <div className="search-disabled-banner">
            <p>
              <strong>Player search disabled</strong>
              <br />
              Configure an API key to search for real players.
            </p>
          </div>
        )}
      </form>
      {searchedUUID && (
        <div className="searched-player-section">
          <h3>Searched Player</h3>
          <FavoriteItem uuid={searchedUUID} />
        </div>
      )}
      {favorites.length > 0 && (
        <div className="favorites-section favorites-section-left">
          <h2>Favorite Players</h2>
          <ul className="favorites-list">
            <FavoriteItem key={favorites[0]} uuid={favorites[0]} />
            {savedKey && favorites.slice(1).map((uuid) => <FavoriteItem key={uuid} uuid={uuid} />)}
          </ul>
        </div>
      )}
    </>
  );
}
