import {connect} from 'react-redux';
import HomeScreen from './HomeScreen';
import {getTourList, deleteTour, tourStatus} from '../../actions/toursActions';

const mapStateToProps = state => {
  return {
    userid: state.users.user.userid,
    tourlist: state.tours.tours,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getToursList: userid => {
      dispatch(getTourList(userid));
    },
    onDeleteTour: deletingTourId => {
      dispatch(deleteTour(deletingTourId));
    },
    onUpdateStatus: (tourId, isActive, postTime) => {
      dispatch(tourStatus(tourId, isActive, postTime));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
