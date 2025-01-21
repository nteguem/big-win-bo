import * as types from './types';

export const fetchPredictionsList = (limit = 5, page = 1, date = null, isVisible = null,isVip = null) => ({
  type: types.FETCH_PREDICTIONS_LIST,
  payload: { limit, page, date, isVisible,isVip},
});

export const addPrediction = (predictionData) => ({
  type: types.ADD_PREDICTION_REQUEST,
  payload: predictionData,
});

export const updatePrediction = (id, predictionData) => ({
  type: types.UPDATE_PREDICTION_REQUEST,
  payload: { id, predictionData },
});

export const deletePrediction = (id) => ({
  type: types.DELETE_PREDICTION_REQUEST,
  payload: id,
});