import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { setSongs, addSong, updateSong, deleteSong } from '../reducers/songSlice';
import { FETCH_SONGS } from '../actions/songActions'; // Import the action type

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  // Add other properties of the song object
}

interface FetchSongsAction {
  type: typeof FETCH_SONGS;
}

interface CreateSongPayload {
  type: string;
  payload: Partial<Song>;
}

interface EditSongPayload {
  type: string;
  payload: Song;
}

interface RemoveSongPayload {
  type: string;
  payload: string;
}

function* fetchSongs(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, 'http://localhost:3001/songs');
    yield put(setSongs(response.data));
  } catch (error) {
    // Handle error if needed
  }
}

function* createSong(action: PayloadAction<Partial<Song>>): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, 'http://localhost:3001/songs', action.payload);
    yield put(addSong(response.data));
  } catch (error) {
    // Handle error if needed
  }
}

function* editSong(action: PayloadAction<Song>): Generator<any, void, any> {
  try {
    const { _id } = action.payload; // Destructure the _id from the payload
    const response = yield call(axios.put, `http://localhost:3001/songs/${_id}`, action.payload);
    yield put(updateSong(response.data));
  } catch (error) {
    // Handle error if needed
  }
}

function* removeSong(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    yield call(axios.delete, `http://localhost:3001/songs/${action.payload}`);
    yield put(deleteSong(action.payload));
  } catch (error) {
    // Handle error if needed
  }
}

function* songSagas(): Generator<any, void, any> {
  yield takeEvery(FETCH_SONGS, fetchSongs);
  yield takeEvery('songs/createSong', createSong);
  yield takeEvery('songs/editSong', editSong);
  yield takeEvery('songs/removeSong', removeSong);
}

export default songSagas;
