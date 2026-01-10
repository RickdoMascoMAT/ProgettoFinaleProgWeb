import {useState} from "react";
import {getUUID} from "../services/minecraftAPI.ts";
import {useApiKey} from "../hooks/useApiKey.ts";
import { useEffect } from "react";


export function HomePage() {
    const [username, setUsername] = useState(``);
    const [apiKey, setApiKey] = useState('');
    const [APIMessage, setAPIMessage] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const {setApiKey: saveApiKey, getApiKey} = useApiKey();

    useEffect(() => {
        if (getApiKey()) {
            setApiKey('**************'); // Mostra asterischi
        }
    }, [getApiKey]);

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
        saveApiKey(apiKey === '**************' ? getApiKey() : apiKey);
        setAPIMessage('API key salvata con successo!');
        setApiKey('**************');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const uuid = await getUUID(username);
        if (uuid) {
            localStorage.setItem('selectedPlayerUUID', uuid);
            setUsernameMessage('UUID salvato con successo!');
        } else {
            setUsernameMessage('Username non trovato o errore API');
        }
    };

    return (
        <>
            <h1>Hypixel SkyBlock Stats Tracker</h1>
            <p>App per tracciare statistiche dei giocatori su Hypixel SkyBlock.</p>
            <form onSubmit={handleApiKeySubmit}>
                <h2>Inserisci API-key</h2>
                <p>Necessaria per funzionamento di certe funzionalità (WIP su dati mockup per display funzionalità pure senza key)</p>
                <input
                    type="password"
                    placeholder="Inserisci la tua API-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <button type="submit">Salva API Key</button>
                {APIMessage && <p style={{ color: 'green' }}>{APIMessage}</p>}
            </form>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Inserisci username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <button type="submit">Cerca</button>
            </form>
            {usernameMessage && <p style={{ color: usernameMessage.includes('successo') ? 'green' : 'red' }}>{usernameMessage}</p>}
        </>
    );
}