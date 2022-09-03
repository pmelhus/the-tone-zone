const ADD_SONG = "currentSong/ADD_SONG";

const addSong = (song, time) => ({
  type: ADD_SONG,
  song,
  time
})

export const getCurrentSong = (id, time) => async (dispatch) => {
  const res = await fetch (`/api/songs/${id}`);
console.log(res)
  const song = await res.json();

  dispatch(addSong(song, time))
}

const currentSongReducer = (state = {}, action) => {
  switch(action.type) {
    case ADD_SONG: {
      const newState = {
        ...{...action.song}, time: {...action.time}
      }
      return newState;
    }
    default:
      return state;
  }
}

export default currentSongReducer;
