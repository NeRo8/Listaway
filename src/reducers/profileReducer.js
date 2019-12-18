import {
  SET_ERROR,
  SET_LOADING,
  SET_PROFILE,
  CHANGE_PROFILE_FIELD,
  SET_SUCCESS,
  CLEAR_ERROR,
} from '../actions/profileActions';

const initState = {
  profile: {
    fullname: '',
    direct_tel: '',
    title: '',
    website: '',
    job_title: '',
    office_tel: '',
    photo: null,
  },
  error: null,
  loading: false,
  success: false,
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case CHANGE_PROFILE_FIELD: {
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.name]: action.value,
        },
      };
    }
    case SET_SUCCESS: {
      return {
        ...state,
        success: action.payload,
      };
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};

export default profileReducer;
