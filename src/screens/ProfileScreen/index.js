import {connect} from 'react-redux';

import ProfileScreen from './ProfileScreen';

import {
  // getProfile,
  onChangeProfileInfo,
  updateProfile,
  //updateAvatar,
  clearError,
} from '../../actions/profileActions';

const mapStateToProps = state => {
  return {
    users: state.users.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeProfile: (name, value) => {
      dispatch(onChangeProfileInfo(name, value));
    },
    // getProfileDetail: userid => {
    //   dispatch(getProfile(userid));
    // },
    onUpdateProfile: (profile, token) => {
      dispatch(updateProfile(profile, token));
    },
    clearErrorProfile: () => {
      dispatch(clearError());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
