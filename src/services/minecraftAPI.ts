import axios from 'axios';

//const BASE_URL = 'https://api.mojang.com';
//uso un Proxy che durante il dev non mi fa usare le api di mojang
const BASE_URL = '/api';

export async function getUUID(username: string): Promise<string | null> {
  try {
    const response = await axios.get(`${BASE_URL}/users/profiles/minecraft/${username}`);
    return response.data.id;
  } catch (error) {
    console.error('Errore nel recupero UUID:', error);
    return null;
  }
}
