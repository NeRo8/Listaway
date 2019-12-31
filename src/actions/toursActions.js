import {Platform} from 'react-native';
import moment from 'moment';
import axios from 'react-native-axios';

const BASE_URL = 'http://3.136.62.106/Listeasy/backend/index.php/user';

export const SET_TOUR = 'SET_TOUR';
export const SET_ERROR = 'SET_ERROR';
//export const SET_USER_ID = 'SET_USER_ID';

const setTour = tour => ({
  type: SET_TOUR,
  payload: tour,
});

const setError = error => ({
  type: SET_ERROR,
  payload: error,
});
// const setUserId = id => ({
//   type: SET_USER_ID,
//   payload: id,
// });

export const clearError = () => dispatch => {
  dispatch(setError(null));
};

export const createTour = (
  newTour,
  user,
  location,
  photoList = null,
  songList,
) => dispatch => {
  const tour = new FormData();

  tour.append('posterid', user.userid);
  tour.append('tourlocation', location);
  tour.append('posttime', moment().format('YYYY:MM:DD HH:mm:ss'));

  axios({
    method: 'post',
    url: `${BASE_URL}/create_tour/`,
    data: tour,
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(responseJson => {
      console.log(responseJson);
      if (responseJson.data.status === 200) {
        dispatch(setTour(responseJson.data.tourinfo));
      } else {
        dispatch(setError(responseJson));
      }
    })
    .catch(error => {
      dispatch(setError(error));
    });
};

export const addPhotoTour = (tour, photoList) => dispatch => {
  const photos = new FormData();

  tour.append('tourID', tour.tourID);
  if (photoList !== null) {
    photos.append('photo', {
      name: photoList.fileName,
      type: photoList.type === null ? 'image/jpeg' : photoList.type,
      uri:
        Platform.OS === 'android'
          ? photoList.uri
          : photoList.uri.replace('file://', ''),
    });
  }
  console.log(photoList);
  console.log('tourIDDDDD', tour.tourID);

  axios({
    method: 'post',
    url: `${BASE_URL}/add_photo_for_tour/`,
    data: photos,
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
export const addSongTour = (tour, songList) => dispatch => {
  const song = new FormData();

  tour.append('tourID', tour.tourID);
  if (songList !== null) {
    song.append('audio', {
      name: songList.fileName,
      type: songList.type === null ? 'song/mp3' : songList.type,
      uri:
        Platform.OS === 'android'
          ? songList.uri
          : songList.uri.replace('file://', ''),
    });
  }

  console.log('tourIDDDDD', tour.tourID);

  axios({
    method: 'post',
    url: `${BASE_URL}/add_audio_for_tour/`,
    data: photos,
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
