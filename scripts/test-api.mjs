async function testSearch() {
  const term = 'queen';
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(term)}`;

  console.log('Buscando:', term);

  const response = await fetch(url);

  if (!response.ok) {
    console.log('Error: la respuesta no fue exitosa');
    return;
  }

  const json = await response.json();

  console.log('Cantidad de resultados:', json.data.length);
  console.log('Primer resultado:', {
    title: json.data[0].title,
    artist: json.data[0].artist.name,
    album: json.data[0].album.title,
  });
}

testSearch();