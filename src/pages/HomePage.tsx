import { useState } from 'react';
import { getUUID } from '../services/minecraftAPI.ts';
import { useApiKey } from '../hooks/useApiKey.ts';
import { useEffect } from 'react';
import ErrorMessage from '../components/ErrorMessage.tsx';
import SuccessMessage from '../components/SuccessMessage.tsx';
import { getFavorites, saveUserPreferences } from '../services/favoritesApi';
import { FavoriteItem } from '../components/FavoriteItem';
import { handleApiError } from '../utils/apiErrorHandler';
import { validateApiKey } from '../services/hypixelApi';

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
          setApiKeyWarning('Your API key is invalid or expired. Update it to access real data.');
        } else {
          setApiKeyWarning('');
        }
      }
    };
    checkApiKeyValidity();
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
        } catch (error) {
          console.error('Failed to save preferences:', error);
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
    }
  };

  return (
    <>
      <h1>Hypixel SkyBlock Stats Tracker</h1>
      <p style={{ textAlign: 'left', marginBottom: '20px' }}>
        Welcome! Enter your Hypixel API key to access real data (optional for mockup data [WIP]) and
        search for a player to view their SkyBlock statistics.
      </p>
      <form onSubmit={handleApiKeySubmit}>
        <div style={{ textAlign: 'left', marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Hypixel API Key (optional for mockup data [WIP]):
            <br />
          </label>
          <label style={{ display: 'block', marginBottom: '15px' }}>
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
          />
          <button type="submit" className="form-button">
            Save API key
          </button>
          {savedKey && (
            <button
              type="button"
              className="form-button"
              style={{ marginLeft: '10px', backgroundColor: '#dc3545' }}
              onClick={() => {
                clearApiKey();
                setApiKey('');
                setApiKeyWarning('');
                setAPIMessage('API key removed successfully!');
                setIsApiKeyModified(false);
              }}
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
        <div className="search-form" style={{ justifyContent: 'flex-start' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Minecraft Username:
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="E.g. Notch"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="form-button">
              Search Player
            </button>
          </div>
          {usernameMessage && usernameMessage.includes('successo') ? (
            <SuccessMessage message={usernameMessage} />
          ) : (
            <ErrorMessage message={usernameMessage} />
          )}
        </div>
      </form>
      <div style={{ textAlign: 'left', marginTop: '20px' }}>
        <button onClick={() => (window.location.href = '/auctions')} className="form-button">
          View Auctions House
        </button>
      </div>
      {searchedUUID && (
        <div className="searched-player-section" style={{ textAlign: 'left', marginTop: '20px' }}>
          <h3>Searched Player</h3>
          <FavoriteItem uuid={searchedUUID} />
        </div>
      )}
      {favorites.length > 0 && (
        <div className="favorites-section" style={{ textAlign: 'left' }}>
          <h2>Favorite Players</h2>
          <ul className="favorites-list">
            {favorites.map((uuid) => (
              <FavoriteItem key={uuid} uuid={uuid} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
