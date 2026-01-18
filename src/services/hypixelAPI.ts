import axios from 'axios';

const BASE_URL = 'https://api.hypixel.net/v2/';

export async function get(
  endpoint: string,
  params?: Record<string, unknown>,
  authenticated: boolean = false
) {
  const API_KEY = localStorage.getItem('hypixelApiKey') || '';
  const requestParams = authenticated ? { key: API_KEY, ...params } : params;
  const response = await axios.get(`${BASE_URL}${endpoint}`, {
    params: requestParams,
  });
  return response.data;
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await axios.get(`${BASE_URL}player`, {
      params: { key: apiKey, uuid: '069a79f444e94726a5befca90e38aaf5' },
    });
    return response.data.success === true;
  } catch {
    return false;
  }
}
