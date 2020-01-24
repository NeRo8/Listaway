import { Platform } from 'react-native';
import moment from 'moment';
import API from '../api';
import axios from 'react-native-axios';

export const SET_TOUR = 'SET_TOUR';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_STATUS';

const setTour = tour => ({
  type: SET_TOUR,
  payload: tour,
});

const setError = error => ({
  type: SET_ERROR,
  payload: error,
});

const setLoading = loading => ({
  type: SET_LOADING,
  payload: loading,
});

export const clearError = () => dispatch => {
  dispatch(setError(null));
};

export const createTour = (userId, location, photoL, audioL) => dispatch => {
  dispatch(setLoading(true));
  const newTour = new FormData();
  console.log("USIC", audioL)

  newTour.append('posterid', userId);
  newTour.append('tourlocation', location);

  newTour.append('posttime', moment().format('YYYY:MM:DD HH:mm:ss'));

  API.post('/user/create_tour', newTour, {
    headers: { 'Content-Type': 'multipart/form-data' },
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
    .then(toure => {
      dispatch(addSoundToTour(toure.tourID, audioL));
    })
    .then(() => {
      dispatch(setLoading(false))
    })
    .catch(error => {
      dispatch(setLoading(false))
      dispatch(setError(error));
    });
};

const addPhotoToTour = (tourID, photoList) => dispatch => {
  console.log(photoList)
  const photoL = photoList.map(photo => {
    return {
      name: photo.fileName,
      type: photo.type === null ? 'image/jpeg' : photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    };
  });

  //Вот тут я реалізував через проход масива а має бути що ти посиалєш масив в запросі
  photoL.forEach(photo => {
    const dataIncome = new FormData();
    dataIncome.append('tourID', tourID);
    dataIncome.append('photo', photo);

    axios({
      method: 'post',
      url:
        'https://3.136.62.106/Listeasy/backend/index.php/user/add_photo_for_tour',
      data: dataIncome,
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(response => console.log(response.data))    
      .catch(error => {
        console.log("Error " + error)
    });
  });
  dispatch(setLoading(false))

};

const addSoundToTour = (tourID, soundList) => dispatch => {
  const soundL = soundList.map(sound => {
    return {
      name: 'audio',
      type: sound.type,
      uri:
        Platform.OS === 'android'
          ? sound.uri
          : sound.uri.replace('file://', ''),
    };
  });

  soundL.forEach(sound => {
    const dataIncome = new FormData();
    dataIncome.append('tourID', tourID);
    dataIncome.append('audio', sound);

    axios({
      method: 'post',
      url:
        'https://3.136.62.106/Listeasy/backend/index.php/user/add_audio_for_tour',
      data: dataIncome,
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(response => console.log(response.data))    
      .catch(error => {
        console.log("Error " + error)
    });
  });
};
