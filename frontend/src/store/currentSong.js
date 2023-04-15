import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf";

const ADD_SONG = "currentSong/ADD_SONG";
const GET_ONE = "currentSongs/GET_ONE";
const DELETE = "currentSongs/DELETE";
const LOAD = "currentSongs/LOAD";

const addSong = (song) => ({
  type: ADD_SONG,
  song,
});

const getOne = (song) => ({
  type: GET_ONE,
  song,
});

const deleteSong = () => ({
  type: DELETE,
});

const getSongs = (songs) => ({
  type: LOAD,
  songs,
});

export const getAllCurrentSongs = (id) => async (dispatch) => {

  const res = await fetch(`/api/currentSongs/all/${id}`);
  if (res.ok) {
    const songs = await res.json();

    dispatch(getSongs(songs));
    return songs;
  } else {
    throw res;
  }
};

export const createCurrentSong = (payload) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/currentSongs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let error;
      if (response.status === 422) {
        error = await response.json();
        throw new ValidationError(error.errors, response.statusText);
      } else {
        let errorJSON;
        error = await response.text();
        try {
          // Check if the error is JSON, i.e., from the Pokemon server. If so,
          // don't throw error yet or it will be caught by the following catch
          errorJSON = JSON.parse(error);
        } catch {
          // Case if server could not be reached
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }
    const song = await response.json();

    dispatch(addSong(song));
    return song;
  } catch (error) {

    throw error;
  }
};

export const getCurrentSong = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/currentSongs/${id}`);

    if (!response.ok) {
      let error;
      if (response.status === 422) {
        error = await response.json();

        throw new ValidationError(error.errors, response.statusText);
      } else if (response.status === 404) {
        return false;
      } else {
        let errorJSON;
        error = await response.text();
        try {
          // Check if the error is JSON, i.e., from the Pokemon server. If so,
          // don't throw error yet or it will be caught by the following catch
          errorJSON = JSON.parse(error);
        } catch {
          // Case if server could not be reached
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }
    const song = await response.json();

    dispatch(getOne(song));
    return song;
  } catch (error) {

  }
};

export const deleteCurrentSong = () => async (dispatch) => {
  const response = await csrfFetch(`/api/currentSongs/`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSong());
    return "Success!";
  } else {
    return false;
  }
};

const currentSongReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SONG: {
      const newState = {
        ...{ ...action.song },
      };
      return newState;
    }
    case LOAD: {
      const allSongs = {};
      action.songs.forEach((song) => (allSongs[song.id] = song));
      return { ...allSongs, ...state };
    }
    case GET_ONE: {
      const newState = { ...state, [action.song.id]: action.song };

      return newState;
    }
    case DELETE: {
      return state;
    }
    default:
      return state;
  }
};

export default currentSongReducer;
