const ADD_SONG = "currentSong/ADD_SONG";

const addSong = (song) => ({
  type: ADD_SONG,
  song
})

export const getCurrentSong = (id) => async (dispatch) => {
  const res = await fetch (`/api/songs/${id}`);
console.log(res)
  const song = await res.json();

  dispatch(addSong(song))
}

const currentSongReducer = (state = {}, action) => {
  switch(action.type) {
    case ADD_SONG: {
      const newState = {
       ...action.song
      }
      return newState;
    }
    default:
      return state;
  }
}

export default currentSongReducer;
