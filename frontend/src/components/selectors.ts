// src/selectors.ts

import { RootState } from '../../src/store';

export const selectTotalSongs = (state: RootState) => state.songs.songs.length;

export const selectTotalArtists = (state: RootState) => {
  const artists = state.songs.songs.map(song => song.artist);
  return new Set(artists).size;
};

export const selectTotalAlbums = (state: RootState) => {
  const albums = state.songs.songs.map(song => song.album);
  return new Set(albums).size;
};

export const selectTotalGenres = (state: RootState) => {
  const genres = state.songs.songs.map(song => song.genre);
  return new Set(genres).size;
};

export const selectSongsByGenre = (state: RootState) => {
  return state.songs.songs.reduce((acc, song) => {
    acc[song.genre] = (acc[song.genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const selectSongsAndAlbumsByArtist = (state: RootState) => {
  return state.songs.songs.reduce((acc, song) => {
    if (!acc[song.artist]) {
      acc[song.artist] = { songs: 0, albums: new Set<string>() };
    }
    acc[song.artist].songs += 1;
    acc[song.artist].albums.add(song.album);
    return acc;
  }, {} as Record<string, { songs: number; albums: Set<string> }>);
};

export const selectSongsByAlbum = (state: RootState) => {
  return state.songs.songs.reduce((acc, song) => {
    acc[song.album] = (acc[song.album] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};
