import CreateAccountScreen from './CreateAccountScreen';

import {connect} from 'react-redux';

import {
  onChangeUserInfo,
  updateUser,
  clearError,
} from '../../../actions/usersActions';

const mapStateToProps = state => {
  return {
    error: state.users.error,
    loading: state.users.loading,
    userid: state.users.user !== null ? state.users.user.userid : null,
    success: state.users.success,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeProfile: (name, value) => {
      dispatch(onChangeUserInfo(name, value));
    },
    onUpdateProfile: (profile, userid) => {
      dispatch(updateUser(profile, userid));
    },
    clearErrorProfile: () => {
      dispatch(clearError());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccountScreen);
