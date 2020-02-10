import moment from 'moment';
import API from '../api';

export const SET_TOUR = 'SET_TOUR';
export const SET_TOURS = 'SET_TOURS';
export const SET_PICTURES = 'SET_PICTURES';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_STATUS';

const setTour = tour => ({
  type: SET_TOUR,
  payload: tour,
});

const setTours = tours => ({
  type: SET_TOURS,
  payload: tours,
});

const setPictures = pictures => ({
  type: SET_PICTURES,
  payload: pictures,
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

export const getTourList = userId => dispatch => {
  dispatch(setLoading(true));
  const getTours = new FormData();
  getTours.append('userid', userId);

  API.post('/user/get_tour_list', getTours, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(setTours(response.data.tourlist));
        return response.data.tourlist;
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

export const getMyTourList = userId => dispatch => {
  dispatch(setLoading(true));
  const getTours = new FormData();
  getTours.append('userid', userId);

  API.post('/user/get_tour_list', getTours, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(response => {
      if (response.data.status === 200) {
        const myTours = response.data.tourlist.filter(
          tour => tour.posterID === userId,
        );
        dispatch(setTours(myTours));
        return response.data.tourlist;
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

export const getTourPictures = tourId => dispatch => {
  dispatch(setLoading(true));

  const getPictures = new FormData();
  getPictures.append('tourID', tourId);

  API.post('/user/get_media_list_for_tour', getPictures, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(setPictures(response.data.medialist));
        console.log('Response z serva: ', response.data);
        return response.data.medialist;
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

export const createTour = (
  userId,
  location,
  photoL,
  selectedSong,
) => dispatch => {
  dispatch(setLoading(true));
  const newTour = new FormData();
  newTour.append('posterid', userId);
  newTour.append('tourlocation', location);
  newTour.append('music_name', selectedSong);
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
    .then(tour => {
      dispatch(addPhotoToTour(tour.tourID, photoL));
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(setError(error));
    });
};

export const deleteTour = deletingTourId => dispatch => {
  dispatch(setLoading(true));

  const deletingTour = new FormData();
  deletingTour.append('tourid', deletingTourId);

  API.post('/user/remove_tour', deletingTour, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(getTourList());
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

export const tourStatus = (tourId, isActive, postTime) => dispatch => {
  dispatch(setLoading(true));

  const statusUpdate = new FormData();
  statusUpdate.append('tourid', tourId);
  statusUpdate.append('is_active', isActive);
  statusUpdate.append('posttime', postTime);

  API.post('/user/update_tour', statusUpdate, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(response => {
      if (response.data.status === 200) {
        dispatch(getTourList());
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

export const addPhotoToTour = (tourID, photoList) => dispatch => {
  photoList.forEach(photo => {
    const dataIncome = new FormData();
    dataIncome.append('tourID', tourID);
    dataIncome.append('photo', photo);

    API.post('/user/add_photo_for_tour', dataIncome, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(response =>
        console.log('add picture in create action:', response.data),
      )
      .catch(error => {
        console.log('Error ' + error);
      });
  });
  dispatch(setLoading(false));
};
