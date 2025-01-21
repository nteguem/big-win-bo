import * as types from './types';

const initialState = {
  predictions: [],
  groupedPredictions: [],
  total: 0,
  loading: false,
  error: null,
};

export default function predictionsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PREDICTIONS_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_PREDICTIONS_LIST_SUCCESS:
      if (action.payload.groupedPredictions) {
        return {
          ...state,
          loading: false,
          groupedPredictions: action.payload.groupedPredictions,
          total: action.payload.total,
        };
      } else {
        return {
          ...state,
          loading: false,
          predictions: action.payload,
        };
      }
    case types.FETCH_PREDICTIONS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_PREDICTION_REQUEST:
    case types.UPDATE_PREDICTION_REQUEST:
    case types.DELETE_PREDICTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADD_PREDICTION_SUCCESS:
    case types.UPDATE_PREDICTION_SUCCESS:
    case types.DELETE_PREDICTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.ADD_PREDICTION_FAILURE:
    case types.UPDATE_PREDICTION_FAILURE:
    case types.DELETE_PREDICTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
