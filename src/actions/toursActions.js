import {Platform} from 'react-native';
import moment from 'moment';
import API from '../api';

export const SET_TOUR = 'SET_TOUR';
export const SET_ERROR = 'SET_ERROR';

const setTour = tour => ({
  type: SET_TOUR,
  payload: tour,
});

const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

export const clearError = () => dispatch => {
  dispatch(setError(null));
};

export const createTour = (userId, location, photoL, audioL) => dispatch => {
  const newTour = new FormData();

  newTour.append('posterid', userId);
  newTour.append('tourlocation', location);
  newTour.append('posttime', moment().format('YYYY:MM:DD HH:mm:ss'));

  API.post('/user/create_tour', newTour, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(setTour(response.data.tourinfo));
        return response.data.tourinfo;
      } else {
        dispatch(setError(response.data));
      }
    })
    .then(toure => {
      dispatch(addPhotoToTour(toure.tourID, photoL));
      return toure;
    })
    .then(toure => console.log('Tour', toure))
    .catch(error => {
      dispatch(setError(error));
    });
};

const addPhotoToTour = (tourID, photoList) => dispatch => {
  const photoL = photoList.map(photo => {
    return {
      name: photo.image.fileName,
      type: photo.image.type === null ? 'image/jpeg' : photo.image.type,
      uri:
        Platform.OS === 'android'
          ? photo.image.uri
          : photo.image.uri.replace('file://', ''),
    };
  });

  //Вот тут я реалізував через проход масива а має бути що ти посиалєш масив в запросі
  photoL.forEach(photo => {
    const dataIncome = new FormData();
    dataIncome.append('tourID', tourID);
    dataIncome.append('photo', photo);

    API.post('/user/add_photo_for_tour', dataIncome, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
  });
};

const addSoundToTour = (tourID, soundList) => {
  const photoL = photoList.map(photo => {
    return {
      name: photo.image.fileName,
      type: photo.image.type === null ? 'image/jpeg' : photo.image.type,
      uri:
        Platform.OS === 'android'
          ? photo.image.uri
          : photo.image.uri.replace('file://', ''),
    };
  });

  photoL.forEach(photo => {
    const dataIncome = new FormData();
    dataIncome.append('tourID', tourID);
    dataIncome.append('photo', photo);

    API.post('/user/add_photo_for_tour', dataIncome, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
  });
};
