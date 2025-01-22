import { call, put, takeLatest } from 'redux-saga/effects';
import { sendRequest } from '../../utils/api';
import * as types from './types';
import { toast } from 'react-toastify';

function* fetchPredictionsList({ payload }) {
  const { limit, page, date, isVisible,isVip} = payload;
  const queryParams = `limit=${limit}&page=${page}`+ (isVip ? `&isVip=${isVip}` : '') + (isVisible ? `&isVisible=${isVisible}` : '') + (date ? `&date=${date}` : '');
  try {
    const response = yield call(sendRequest, 'GET', `predict/list?${queryParams}`);
    if (response.status === 200) {
      if (date) {
        yield put({ type: types.FETCH_PREDICTIONS_LIST_SUCCESS, payload: response.data.predictions });
      } else {
        yield put({
          type: types.FETCH_PREDICTIONS_LIST_SUCCESS,
          payload: {
            total: response.data.total,
            groupedPredictions: response.data.groupedPredictions,
          },
        });
      }
    } else {
      yield put({ type: types.FETCH_PREDICTIONS_LIST_FAILURE, payload: response.message });
    }
  } catch (error) {
    yield put({ type: types.FETCH_PREDICTIONS_LIST_FAILURE, payload: error.message });
  }
}

function* addPrediction({ payload }) {
  try {
    const response = yield call(sendRequest, 'POST', 'predict/add', payload);
    if (response.status === 200 || response.status === 201) {
      yield put({ type: types.ADD_PREDICTION_SUCCESS, payload: response.data });
      toast.success('Prediction added successfully');
    } else {
      yield put({ type: types.ADD_PREDICTION_FAILURE, payload: response.message });
    }
  } catch (error) {
    yield put({ type: types.ADD_PREDICTION_FAILURE, payload: error.message });
    toast.error('Failed to add prediction');
  }
}

function* updatePrediction({ payload }) {
  const { id, predictionData } = payload;
  try {
    const response = yield call(sendRequest, 'PUT', `predict/update?id=${id}`, predictionData);
    if (response.status === 200) {
      yield put({ type: types.UPDATE_PREDICTION_SUCCESS, payload: response.data });
      toast.success('Prediction updated successfully');
    } else {
      yield put({ type: types.UPDATE_PREDICTION_FAILURE, payload: response.message });
    }
  } catch (error) {
    yield put({ type: types.UPDATE_PREDICTION_FAILURE, payload: error.message });
    toast.error('Failed to update prediction');
  }
}

function* deletePrediction({ payload }) {
  try {
    const response = yield call(sendRequest, 'DELETE', `predict/delete?id=${payload}`);
    if (response.status === 200) {
      yield put({ type: types.DELETE_PREDICTION_SUCCESS, payload });
      toast.success('Prediction deleted successfully');
    } else {
      yield put({ type: types.DELETE_PREDICTION_FAILURE, payload: response.message });
    }
  } catch (error) {
    yield put({ type: types.DELETE_PREDICTION_FAILURE, payload: error.message });
    toast.error('Failed to delete prediction');
  }
}

function* predictionsSaga() {
  yield takeLatest(types.FETCH_PREDICTIONS_LIST, fetchPredictionsList);
  yield takeLatest(types.ADD_PREDICTION_REQUEST, addPrediction);
  yield takeLatest(types.UPDATE_PREDICTION_REQUEST, updatePrediction);
  yield takeLatest(types.DELETE_PREDICTION_REQUEST, deletePrediction);
}

export default predictionsSaga;