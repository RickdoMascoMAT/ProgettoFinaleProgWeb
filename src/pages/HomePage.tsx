import { useState } from 'react';
import { getUUID } from '../services/minecraftAPI.ts';
import { useApiKey } from '../hooks/useApiKey.ts';
import { useEffect } from 'react';
import ErrorMessage from '../components/ErrorMessage.tsx';
import SuccessMessage from '../components/SuccessMessage.tsx';
import { getFavorites } from '../services/favoritesApi';
import { FavoriteItem } from '../components/FavoriteItem';
import { handleApiError } from '../utils/apiErrorHandler';

export function HomePage() {
  const [username, setUsername] = useState(``);
  const { setApiKey: saveApiKey, getApiKey } = useApiKey();
  const savedKey = getApiKey();
  const [apiKey, setApiKey] = useState(savedKey ? '**************' : '');
  const [isApiKeyModified, setIsApiKeyModified] = useState(false);
  const [APIMessage, setAPIMessage] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
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

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Se la chiave è stata modificata, salva il nuovo valore, altrimenti mantieni quella esistente
    if (isApiKeyModified && apiKey !== '**************') {
      saveApiKey(apiKey);
      setAPIMessage('API key salvata con successo!');
      setApiKey('**************');
      setIsApiKeyModified(false);
    } else if (!isApiKeyModified) {
      setAPIMessage('API key già salvata');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const uuid = await getUUID(username);
      if (uuid) {
        localStorage.setItem('selectedPlayerUUID', uuid);
        setUsernameMessage('UUID salvato con successo!');
        setSearchedUUID(uuid);
      } else {
        setUsernameMessage('Username non trovato');
      }
    } catch (error) {
      setUsernameMessage(handleApiError(error));
    }
  };

  return (
    <>
      <h1>Hypixel SkyBlock Stats Tracker</h1>
      <p style={{ textAlign: 'left', marginBottom: '20px' }}>
        Benvenuto! Inserisci la tua API key di Hypixel per accedere ai dati reali (opzionale per
        dati WIP) e cerca un player per visualizzare le sue statistiche SkyBlock.
      </p>
      <form onSubmit={handleApiKeySubmit}>
        <div style={{ textAlign: 'left', marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            API Key di Hypixel (opzionale per dati WIP):
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="Inserisci la tua API key"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setIsApiKeyModified(true);
            }}
          />
          <button type="submit" className="form-button">
            Salva API key
          </button>
          {APIMessage && <SuccessMessage message={APIMessage} />}
        </div>
      </form>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="search-form" style={{ justifyContent: 'flex-start' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Username Minecraft:
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Es. Notch"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="form-button">
              Cerca Player
            </button>
          </div>
          {usernameMessage && usernameMessage.includes('successo') ? (
            <SuccessMessage message={usernameMessage} />
          ) : (
            <ErrorMessage message={usernameMessage} />
          )}
        </div>
      </form>
      {searchedUUID && (
        <div className="searched-player-section" style={{ textAlign: 'left', marginTop: '20px' }}>
          <h3>Player Cercato</h3>
          <FavoriteItem uuid={searchedUUID} />
        </div>
      )}
      {favorites.length > 0 && (
        <div className="favorites-section" style={{ textAlign: 'left' }}>
          <h2>Player Preferiti</h2>
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
