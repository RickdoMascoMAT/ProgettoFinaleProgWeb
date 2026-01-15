export function useApiKey() {
  const getApiKey = () => localStorage.getItem('hypixelApiKey') || '';
  const setApiKey = (key: string) => localStorage.setItem('hypixelApiKey', key);
  const clearApiKey = () => localStorage.removeItem('hypixelApiKey');
  return { getApiKey, setApiKey, clearApiKey };
}
