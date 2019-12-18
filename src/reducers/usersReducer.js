//import {AsyncStorage} from 'react-native';

import {
  SET_USER,
  SET_LOADING,
  SET_ERROR,
  CLEAR_USER,
} from '../actions/usersActions';

const initState = {
  user: null,
  loading: false,
  error: null,
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER: {
      //AsyncStorage.setItem('token', action.payload);
      return {
        ...state,
        user: action.payload,
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
