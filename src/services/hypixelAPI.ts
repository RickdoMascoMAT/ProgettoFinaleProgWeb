import axios from 'axios';

const BASE_URL = 'https://api.hypixel.net/v2/';

export async function get(endpoint: string, params?: Record<string, any>, authenticated: boolean = false) {
    const API_KEY = localStorage.getItem('hypixelApiKey') || '';
    const requestParams = authenticated ? { key: API_KEY, ...params } : params;
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params: requestParams,
    });
    return response.data;
}
