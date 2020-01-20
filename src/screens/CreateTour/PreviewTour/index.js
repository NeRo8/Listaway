import PreviewTour from './PreviewTour';

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    photoList: state.users.user.photoList,
    soundList: state.tours.soundList,
  };
};

const mapDisptchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDisptchToProps)(PreviewTour);
