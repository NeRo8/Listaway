import {SET_TOUR, SET_ERROR} from '../actions/toursActions';

const initState = {
  tour: {
    posterid: null,
    tourlocation: '',
    posttime: '',
  },
  error: null,
};

const toursReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TOUR: {
      return {
        ...state,
        tour: action.payload,
      };
    }
    default:
      return state;
  }
};

export default toursReducer;
