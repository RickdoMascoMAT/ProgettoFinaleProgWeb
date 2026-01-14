import {useState} from "react";
import {getUUID} from "../services/minecraftAPI.ts";
import {useApiKey} from "../hooks/useApiKey.ts";
import { useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage.tsx";
import SuccessMessage from "../components/SuccessMessage.tsx";


export function HomePage() {
    const [username, setUsername] = useState(``);
    const {setApiKey: saveApiKey, getApiKey} = useApiKey();
    const savedKey = getApiKey();
    const [apiKey, setApiKey] = useState(savedKey ? '**************' : '');
    const [isApiKeyModified, setIsApiKeyModified] = useState(false);
    const [APIMessage, setAPIMessage] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');


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
                <div style={{display: 'flex', alignItems: 'center'}}>
                <input
                    type="password"
                    placeholder="Inserisci la tua API-key"
                    value={apiKey}
                    onChange={(e) => {
                        setApiKey(e.target.value);
                        setIsApiKeyModified(true);
                    }}
                    onFocus={() => {
                        // Quando l'utente fa focus sul campo, puliscilo se mostra asterischi
                        if (apiKey === '**************') {
                            setApiKey('');
                        }
                    }}
                />
                <button type="submit">Salva API Key</button>
                {APIMessage && <SuccessMessage message={APIMessage} />}
                </div>
            </form>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="text" placeholder="Inserisci username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    <button type="submit">Cerca</button>
                    {usernameMessage && usernameMessage.includes('successo') ? (
                        <SuccessMessage message={usernameMessage} />
                    ) : (
                        <ErrorMessage message={usernameMessage} />
                    )}
                </div>
            </form>

        </>
    );
}