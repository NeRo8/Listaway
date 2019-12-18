import {DEFAULT_URL} from '../config/server';

export const SET_USER = 'SET_USER';
export const SET_LOADING = 'SET_STATUS';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_USER = 'CLEAR_USER';

const setUser = user => ({
  type: SET_USER,
  payload: user,
});

const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

export const clearError = () => dispatch => {
  dispatch(setError(null));
};

export const clearUser = () => dispatch => {
  dispatch({
    type: CLEAR_USER,
  });
};

export const loginWithEmail = (e, p) => dispatch => {
  dispatch(setLoading(true));

  fetch(`${DEFAULT_URL}/user/user_login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: e,
      password: p,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === 200) {
        dispatch(setUser(responseJson.userinfo));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(responseJson));
        dispatch(setLoading(false));
      }
    })
    .catch(error => dispatch(setError(error)));
};

export const createAccount = data => dispatch => {
  dispatch(setLoading(true));

  fetch(`${DEFAULT_URL}/api/v1/registration/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password1: data.password1,
      password2: data.password2,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.key !== undefined) {
        dispatch(setToken(responseJson.key));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(responseJson));
        dispatch(setLoading(false));
      }
    })
    .catch(error => dispatch(setError(error)));
};

/**

export const loginWithFacebook = token => dispatch => {
  dispatch(setLoading(true));

  fetch(`${DEFAULT_URL}/api/v1/facebook/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_token: token,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.key !== undefined) {
        dispatch(setToken(responseJson.key));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(responseJson));
        dispatch(setLoading(false));
      }
    })
    .catch(error => dispatch(setError(error)));
};

export const loginWithGoogle = token => dispatch => {
  dispatch(setLoading(true));

  fetch(`${DEFAULT_URL}/api/v1/google/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_token: token,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.key !== undefined) {
        dispatch(setToken(responseJson.key));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(responseJson));
        dispatch(setLoading(false));
      }
    })
    .catch(error => dispatch(setError(error)));
};

 */
