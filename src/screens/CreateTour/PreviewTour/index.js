import PreviewTour from './PreviewTour';

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    photoList: state.users.user.photoList,
    soundList: state.tours.soundList,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewTour);
