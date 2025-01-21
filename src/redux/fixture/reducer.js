import {
  FETCH_AVAILABLE_DAYS,
  FETCH_COUNTRIES,
  FETCH_LEAGUES,
  FETCH_MATCHES,
} from './types';

const initialState = {
  availableDays: {},
  countries: [],
  leagues: [],
  matches: [],
  isLoading: false,
  error: null,
};

const FixtureReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_AVAILABLE_DAYS}_REQUEST`:
    case `${FETCH_COUNTRIES}_REQUEST`:
    case `${FETCH_LEAGUES}_REQUEST`:
    case `${FETCH_MATCHES}_REQUEST`:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case `${FETCH_AVAILABLE_DAYS}_SUCCESS`:
      return {
        ...state,
        availableDays: action.payload,
        isLoading: false,
      };
    case `${FETCH_COUNTRIES}_SUCCESS`:
      return {
        ...state,
        countries: action.payload,
        isLoading: false,
      };
    case `${FETCH_LEAGUES}_SUCCESS`:
      return {
        ...state,
        leagues: action.payload,
        isLoading: false,
      };
    case `${FETCH_MATCHES}_SUCCESS`:
      return {
        ...state,
        matches: action.payload,
        isLoading: false,
      };
    case `${FETCH_AVAILABLE_DAYS}_FAILURE`:
    case `${FETCH_COUNTRIES}_FAILURE`:
    case `${FETCH_LEAGUES}_FAILURE`:
    case `${FETCH_MATCHES}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default FixtureReducer;
