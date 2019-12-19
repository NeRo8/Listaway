import {Platform} from 'react-native';

import {DEFAULT_URL} from '../config/server';

export const SET_USER = 'SET_USER';
export const SET_LOADING = 'SET_STATUS';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';
export const CHANGE_USER_FIELD = 'CHANGE_USER_FIELD';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_USER_ID = 'SET_USER_ID';

const setUser = user => ({
  type: SET_USER,
  payload: user,
});

const setUserId = id => ({
  type: SET_USER_ID,
  payload: id,
});

const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

const setSuccess = value => ({
  type: SET_SUCCESS,
  payload: value,
});

export const clearError = () => dispatch => {
  dispatch(setError(null));
};

export const clearUser = () => dispatch => {
  dispatch({
    type: CLEAR_USER,
  });
};

export const onChangeUserInfo = (name, value) => ({
  type: CHANGE_USER_FIELD,
  name,
  value,
});

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
      device_type: Platform.OS === 'ios' ? 0 : 1,
      action_time: Date().toLocaleString(),
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

  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('device_type', Platform.OS === 'ios' ? 0 : 1);
  formData.append('action_time', Date().toLocaleString());

  fetch(`${DEFAULT_URL}/user/user_signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === 200) {
        //dispatch(setUser(responseJson.userinfo));
        dispatch(setUserId(responseJson.userinfo.userid));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(responseJson));
        dispatch(setLoading(false));
      }
    })
    .catch(error => dispatch(setError(error)));
};

export const updateUser = (newProfile, userid) => dispatch => {
  const profile = new FormData();
  profile.append('userid', userid);
  profile.append('fullname', newProfile.fullname);
  profile.append('direct_tel', newProfile.direct_tel);
  profile.append('title', newProfile.title);
  profile.append('website', newProfile.website);
  profile.append('job_title', newProfile.job_title);
  profile.append('office_tel', newProfile.office_tel);

  if (newProfile.photo !== null) {
    profile.append('photo', {
      uri: newProfile.photo.uri,
      type:
        newProfile.photo.type === null ? 'image/jpeg' : newProfile.photo.type,
      name: newProfile.photo.fileName,
      data: newProfile.photo.data,
    });
  }

  fetch(`${DEFAULT_URL}/user/user_update_profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: profile,
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === 200) {
        dispatch(setUser(responseJson));
        dispatch(setSuccess(true));
        dispatch(setLoading(false));
      } else {
        dispatch(setError(responseJson));
        dispatch(setLoading(false));
      }
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(setError(error));
    });
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
