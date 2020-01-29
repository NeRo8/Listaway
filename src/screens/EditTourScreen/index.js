import EditTourScreen from './EditTourScreen';

import {connect} from 'react-redux';

import {
  createTour,
  clearError,
  getTourPictures,
} from '../../actions/toursActions';

const mapStateToProps = state => {
  return {
    userid: state.users.user.userid,
    loading: state.editTour.loading,
    tourData: state.editTour.tour,
    pictureList: state.editTour.pictureList,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTourScreen);
