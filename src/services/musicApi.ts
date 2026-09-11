export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  previewUrl: string;
}
// Deezer devuelve un JSON a veces con mas campos de lo que se necesita. Esto es una version mas limpia
export async function searchMusic(term: string): Promise<Track[]> {
  const response = await fetch(
    `https://api.deezer.com/search?q=${encodeURIComponent(term)}`
  );

  if (!response.ok) {
    throw new Error('No se pudo conectar con Deezer');
  }

  const json = await response.json();

  return json.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    artist: item.artist.name,
    album: item.album.title,
    coverUrl: item.album.cover_medium,
    previewUrl: item.preview,
  }));
}