import CreateTour from './CreateTour';

import {connect} from 'react-redux';

import {createTour, clearError} from '../../actions/toursActions';

const mapStateToProps = state => {
  return {
    // error: state.tours.error,
    // tour: state.tours.tour,
    user: state.users.user,
  };
};

const mapDisptchToProps = dispatch => {
  return {
    onCreateTour: (tour, userid) => {
      dispatch(createTour(tour, userid));
    },
    clearErrorProfile: () => {
      dispatch(clearError());
    },
  };
};

export default connect(mapStateToProps, mapDisptchToProps)(CreateTour);
