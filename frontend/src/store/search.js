import SearchSongs from "../components/HomePage/SearchSongs/SearchSongs";
import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf";

const GET_ALL = 'search/GET_ALL'

const getAll = (songs, users, playlists) => ({
  type: GET_ALL,
  songs, users, playlists
})

export const getSearchResults = (searchWord) => async (dispatch) => {
  const res = await csrfFetch(`/api/search/${searchWord}`)
  if (res.ok) {
    const results = await res.json()
    const {songs, users, playlists} = results
   console.log(results, 'yoooo')
    dispatch(getAll(songs, users, playlists))
  } else {
    throw res;
  }
}

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL: {
      const allSongs = {}
      const allUsers = {}
      const allPlaylists = {}
      action.songs?.forEach((song) => (allSongs[song.id]= song))
      action.users?.forEach((user)=> (allUsers[user.id] = user))
      action.playlists?.forEach((playlist) => (allPlaylists[playlist.id] = playlist))
      return {...allSongs, ...allUsers, ...allPlaylists, ...state }
    }
    default:
      return state;
  }
}

export default searchReducer
