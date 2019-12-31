import CreateTour from './CreateTour';

import {connect} from 'react-redux';

import {
  createTour,
  clearError,
  addPhotoTour,
  addSongTour,
} from '../../actions/toursActions';

const mapStateToProps = state => {
  return {
    // error: state.tours.error,
    tour: state.tours.tour,
    user: state.users.user,
  };
};

const mapDisptchToProps = dispatch => {
  return {
    onCreateTour: (tour, userid, location, photoList, songList) => {
      dispatch(createTour(tour, userid, location));
      dispatch(addPhotoTour(tour, photoList));
      // dispatch(addSongTour(tour, songList));
    },
    clearErrorProfile: () => {
      dispatch(clearError());
    },
  };
};

export default connect(mapStateToProps, mapDisptchToProps)(CreateTour);
