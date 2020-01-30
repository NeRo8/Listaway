export const TOUR_ADD_PICTURE = 'TOUR_ADD_PICTURE';
export const TOUR_DELETE_PICTURE = 'TOUR_DELETE_PICTURE';
export const TOUR_MOVE_PICTURE = 'TOUR_MOVE_PICTURE';
export const TOUR_CHANGE_FIELD = 'TOUR_CHANGE_FIELD';
export const TOUR_SET_TOUR = 'TOUR_SER_TOUR';
export const TOUR_SET_PHOTO_LIST = 'TOUR_SET_PHOTO_LIST';
export const SET_ERROR = 'SET_ERROR_TOUR';
export const SET_LOADING = 'SET_LOADING_TOUR';

import {Platform} from 'react-native';

import {addPhotoToTour} from './toursActions';

import moment from 'moment';
import API from '../api';

const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

export const addPicture = picture => ({
  type: TOUR_ADD_PICTURE,
  payload: picture,
});

export const deletePicture = id => ({
  type: TOUR_DELETE_PICTURE,
  payload: id,
});

export const movePicture = pictureList => ({
  type: TOUR_MOVE_PICTURE,
  payload: pictureList,
});

export const changeField = (name, value) => ({
  type: TOUR_CHANGE_FIELD,
  name,
  value,
});

export const setTour = tour => dispatch => {
  dispatch({
    type: TOUR_SET_TOUR,
    payload: tour,
  });
  dispatch(getTourPictures(tour.tourID));
};

export const setPhotos = photos => ({
  type: TOUR_SET_PHOTO_LIST,
  payload: photos,
});

export const getTourPictures = tourId => dispatch => {
  dispatch(setLoading(true));

  const getPictures = new FormData();
  getPictures.append('tourID', tourId);

  API.post('/user/get_media_list_for_tour', getPictures, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(setPhotos(response.data.medialist));
      } else {
        dispatch(setError(response.data));
      }
    })
    .then(() => dispatch(setLoading(false)))
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(setError(error));
    });
};

export const updateTour = tourData => dispatch => {
  const updatingTour = new FormData();
  updatingTour.append('tourid', tourData.tourID);
  updatingTour.append('posttime', moment().format('YYYY:MM:DD HH:mm:ss'));
  updatingTour.append('posterid', tourData.posterID);
  updatingTour.append('tourlocation', tourData.tour_location);
  updatingTour.append('music_name', tourData.music_name);
  updatingTour.append('is_active', tourData.is_active);

  API.post('/user/update_tour', updatingTour, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(response => {
      console.log('Update tour responce: ', response.data);
    })
    .catch(error => console.log('Error with update toure', error));
};

export const updatePhoto = (tourData, pictureList) => dispatch => {
  const addingPhotos = pictureList.filter(
    photo => photo.posterID === undefined,
  );
  dispatch(addPhotoToTour(tourData.tourID, addingPhotos));
};
