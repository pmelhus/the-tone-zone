import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf";

const ADD_ONE = "queue/ADD_ONE";

const addOne = (queueSong) => ({
  type: ADD_ONE,
payload: queueSong
});

export const addSongToQueue = (payload) => async (dispatch) => {


  try {
    const response = await csrfFetch(`/api/queueSongs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
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
    const queueSong = await response.json();
    dispatch(addOne(queueSong));
    return queueSong
  } catch (error) {
    // console.log(error, '=-=================')
    throw error;
  }
};

const queueReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ONE: {
          return {...state, [action.payload.id]: action.payload}
    }

    default:
      return state;
  }
};

export default queueReducer;
