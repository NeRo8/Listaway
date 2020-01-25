import {
  SET_TOUR,
  SET_ERROR,
  SET_LOADING,
  SET_TOURS,
} from '../actions/toursActions';

const initState = {
  tour: {
    posterid: null,
    tourlocation: '',
    posttime: '',
  },
  tours: {
    tourID: null,
    posterID: null,
    tour_location: '',
    music_name: '',
    photo_order: null,
  },
  error: null,
  loading: false,
};

const toursReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TOUR: {
      return {
        ...state,
        tour: action.payload,
      };
    }
    case SET_TOURS: {
      return {
        ...state,
        tours: action.payload,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
};

export default toursReducer;
