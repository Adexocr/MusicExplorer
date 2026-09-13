import { createContext, ReactNode, useContext, useState } from 'react';

import { Track } from '@/services/musicApi';

interface FavoritesContextType {
  favorites: Track[];
  addFavorite: (track: Track) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Track[]>([]);

  function addFavorite(track: Track) {
    setFavorites((prev) => [...prev, track]);
  }

  function removeFavorite(id: number) {
    setFavorites((prev) => prev.filter((t) => t.id !== id));
  }
// Para que el corazon de cada cancion sepa si es favorito o no. 
  function isFavorite(id: number) {
    return favorites.some((t) => t.id === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
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