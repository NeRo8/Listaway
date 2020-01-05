import {SET_TOUR, SET_ERROR, SET_LOADING} from '../actions/toursActions';

const initState = {
  tour: {
    posterid: null,
    tourlocation: '',
    posttime: '',
    
  },
  error: null,
  loading: false
};

const toursReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_TOUR: {
      return {
        ...state,
        tour: action.payload,
      };
      
    }
    case SET_LOADING: {
      console.log("SET_LOADING ok")
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
