import SearchSongs from "../components/HomePage/SearchSongs/SearchSongs";
import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf";

const GET_ALL = 'search/GET_ALL'

const getAll = (songs, users, playlists) => ({
  type: GET_ALL,
  songs, users, playlists
})

export const getSearchResults = (searchWord) => async (dispatch) => {
  console.log(searchWord, 'SEARCH IN THUNK')
  const res = await csrfFetch(`/api/search/${searchWord}`)
  if (res.ok) {
    const results = await res.json()
    const {songs, users, playlists} = results

    dispatch(getAll(songs, users, playlists))
  } else {
    throw res;
  }
}

const initialState = {songs: null, users: null, playlists: null}

const searchReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL: {
      newState = Object.assign({}, state)
      const allSongs = []
      const allUsers = []
      const allPlaylists = []
      action.songs?.forEach((song) => (allSongs.push(song) ))
      action.users?.forEach((user)=> (allUsers.push(user)))
      action.playlists?.forEach((playlist) => (allPlaylists.push(playlist)))
      newState.songs = allSongs
      newState.users = allUsers
      newState.playlists = allPlaylists
      return newState;

    }
    default:
      return state;
  }
}

export default searchReducer
