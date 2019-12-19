import {
  SET_USER,
  SET_LOADING,
  SET_ERROR,
  SET_SUCCESS,
  CHANGE_USER_FIELD,
  CLEAR_USER,
} from '../actions/usersActions';

const initState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case CHANGE_USER_FIELD: {
      return {
        ...state,
        user: {
          ...state.user,
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
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default usersReducer;
