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

export const createTour = (newTour, user) => dispatch => {
  const tour = new FormData();

  tour.append('posterid', user.userid);
  tour.append('tourlocation', 'Yerevan, Armenia');
  tour.append('posttime', moment().format('YYYY:MM:DD HH:mm:ss'));

  axios({
    method: 'post',
    url: `${BASE_URL}/create_tour/`,
    data: tour,
    headers: {'Content-Type': 'multipart/form-data'},
  }).then(responseJson => {
    console.log(responseJson);
    //   if (responseJson.data.status === 200) {
    //     dispatch(setUser(responseJson.data.userinfo));
    //     dispatch(setSuccess(true));
    //     dispatch(setLoading(false));
    //   } else {
    //     dispatch(setError(responseJson));
    //     dispatch(setLoading(false));
    //   }
    // })
    // .catch(error => {
    //   dispatch(setLoading(false));
    //   dispatch(setError(error));
  });
};
