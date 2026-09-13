# MusicExplorer 🎵

Aplicación móvil desarrollada con **Expo** y **React Native** para el curso de Programación para Dispositivos Móviles (TPA-4001). Permite buscar canciones y artistas en tiempo real y guardar tus favoritos de forma persistente en el dispositivo.

## Funcionalidades

- 🔍 Búsqueda de canciones y artistas en tiempo real
- ❤️ Marcar/quitar canciones como favoritas
- 💾 Los favoritos persisten aunque cierres la app
- 🎨 Interfaz adaptada a modo claro y oscuro

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Expo + Expo Router | Framework y navegación basada en archivos |
| TypeScript | Tipado estático |
| Deezer API | Fuente de datos de música (sin autenticación requerida) |
| Context API | Manejo de estado global de favoritos |
| AsyncStorage | Persistencia local de datos |
| React Native Reanimated | Animaciones de interfaz |

## API utilizada

Este proyecto consume la [Deezer API](https://developers.deezer.com/api), específicamente el endpoint de búsqueda:

https://api.deezer.com/search?q={término}


No requiere autenticación ni API key.

## Arquitectura del proyecto

src/
├── app/ → Pantallas (rutas de Expo Router)
├── components/ → Componentes reutilizables de UI
├── context/ → Estado global (Context API)
├── services/ → Lógica de consumo de la API
└── storage/ → Lógica de persistencia local (AsyncStorage)


La lógica de red, la lógica de base de datos local y las vistas están completamente separadas, siguiendo el principio de responsabilidad única.

## Cómo correr el proyecto

1. Clona el repositorio:
```bash
git clone https://github.com/Adexocr/MusicExplorer.git
cd MusicExplorer
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npx expo start
```

4. Escanea el código QR con la app **Expo Go** en tu dispositivo (Android/iOS).

## Autor

Kevin Hidalgo Barrantes (Adexocr) — Tecnológico de Costa Rica