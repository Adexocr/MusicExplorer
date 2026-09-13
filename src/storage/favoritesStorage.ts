import AsyncStorage from '@react-native-async-storage/async-storage';

import { Track } from '@/services/musicApi';

const FAVORITES_KEY = '@music_explorer_favorites'; //donde todo se guarda

export async function saveFavorites(favorites: Track[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.log('Error guardando favoritos:', error);
  }
}
// AsyncStorage guarda solo strings, por eso se hace JSON.stringify y JSON.parse para convertir a string y de string a objeto.
export async function loadFavorites(): Promise<Track[]> {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.log('Error cargando favoritos:', error);
    return [];
  }
}