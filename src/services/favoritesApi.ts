export function getFavorites(): string[] {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
}

export function addFavorite(uuid: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(uuid)) {
    favorites.push(uuid);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function removeFavorite(uuid: string): void {
  const favorites = getFavorites();
  const index = favorites.indexOf(uuid);
  if (index > -1) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
