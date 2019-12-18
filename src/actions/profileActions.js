import {DEFAULT_URL} from '../config/server';

export const SET_PROFILE = 'SET_PROFILE';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const CHANGE_PROFILE_FIELD = 'CHANGE_PROFILE_FIELD';
export const SET_SUCCESS = 'SET_SUCCESS';
export const CLEAR_ERROR = 'CLEAR_ERROR';

const setProfile = profile => ({
  type: SET_PROFILE,
  payload: profile,
});

const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

const setSuccess = value => ({
  type: SET_SUCCESS,
  payload: value,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const onChangeProfileInfo = (name, value) => ({
  type: CHANGE_PROFILE_FIELD,
  name,
  value,
});

export const getProfile = userid => dispatch => {
  dispatch(setLoading(true));

  fetch(`${DEFAULT_URL}/api/v1/profile/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      dispatch(setProfile(responseJson));
      dispatch(setLoading(false));
    })
    .catch(error => {
      dispatch(setError(error));
      dispatch(setLoading(false));
    });
};

export const updateProfile = (newProfile, userid) => dispatch => {
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
        dispatch(setProfile(responseJson));
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
