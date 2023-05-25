

import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const EDIT_USER = 'session/editUser'


const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const editUser = (user) => {
  return {
    type: EDIT_USER,
    payload: user
  }
}

export const updateUser = (user) => async (dispatch) => {
  const { image, username, userId } = user;

  const formData = new FormData();
  formData.append("username", username);
  formData.append('id',userId)


  if (image) formData.append("image", image);

  const response = await csrfFetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await response.json();
  dispatch(editUser(data.user));
  return response;
}


export const login = (user) => async (dispatch) => {
  const { credential, password,  } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();


  dispatch(setUser(data.user));
  return response
};

const initialState = { user: null };


export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session/');
  const data = await response.json();

  dispatch(setUser(data.user));
  if (data.user) {

    return data.user;
  } else {
    return
  }
};

export const signup = (user) => async dispatch => {

  const { images, image, username, email, password } = user;

  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  if (image) formData.append("image", image);

  const response = await csrfFetch(`/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
}

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

//REDUCER

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case EDIT_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
    default:
      return state;
  }
};




export default sessionReducer;
