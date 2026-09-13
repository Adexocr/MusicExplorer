import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { Track } from '@/services/musicApi';
import { loadFavorites, saveFavorites } from '@/storage/favoritesStorage';

interface FavoritesContextType {
  favorites: Track[];
  isLoading: boolean;
  addFavorite: (track: Track) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites().then((stored) => {
      setFavorites(stored);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveFavorites(favorites);
    }
  }, [favorites]);

  function addFavorite(track: Track) {
    setFavorites((prev) => [...prev, track]);
  }

  function removeFavorite(id: number) {
    setFavorites((prev) => prev.filter((t) => t.id !== id));
  }

  function isFavorite(id: number) {
    return favorites.some((t) => t.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, isLoading, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de un FavoritesProvider');
  }
  return context;
}