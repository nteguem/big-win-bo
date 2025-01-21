import {
  FETCH_LIST_EVENT
} from './types';

const initialState = {
  events: [],
  isLoading: false,
  error: null,
};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_LIST_EVENT}_REQUEST`:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case `${FETCH_LIST_EVENT}_SUCCESS`:
      return {
        ...state,
        events: action.payload,
        isLoading: false,
      };
    case `${FETCH_LIST_EVENT}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EventReducer;
