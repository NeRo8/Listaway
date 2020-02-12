import EditTourScreen from './EditTourScreen';

import {connect} from 'react-redux';

import * as editTourAction from '../../actions/editTourAction';

const mapStateToProps = state => {
  return {
    userid: state.users.user.userid,
    loading: state.editTour.loading,
    tourData: state.editTour.tour,
    pictureList: state.editTour.pictureList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMovePicture: newPictureList => {
      dispatch(editTourAction.movePicture(newPictureList));
    },
    onDeletePicture: id => {
      dispatch(editTourAction.deletePicture(id));
    },
    onChangeField: (name, value) => {
      dispatch(editTourAction.changeField(name, value));
    },
    onAddPicture: picture => {
      dispatch(editTourAction.addPicture(picture));
    },
    onEditTour: (tourData, pictureList) => {
      dispatch(editTourAction.updateTour(tourData, pictureList));
      dispatch(editTourAction.updatePhoto(tourData, pictureList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTourScreen);
