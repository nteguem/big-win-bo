import { call, put, takeLatest } from 'redux-saga/effects';
import { sendRequest } from '../../utils/api';
import{buildUrlWithParams} from '../../utils/helpers'
import {
  FETCH_AVAILABLE_DAYS,
  FETCH_COUNTRIES,
  FETCH_LEAGUES,
  FETCH_MATCHES,
} from './types';


function* fetchAvailableDays() {
  try {
    yield put({ type: `${FETCH_AVAILABLE_DAYS}_REQUEST` });
    const response = yield call(sendRequest, 'GET', '/fixture/available-days');
    if (response.status === 200) {
      yield put({ type: `${FETCH_AVAILABLE_DAYS}_SUCCESS`, payload: response.data?.availableDays });
    } else {
      yield put({ type: `${FETCH_AVAILABLE_DAYS}_FAILURE`, payload: response.message });
    }
  } catch (error) {
    yield put({ type: `${FETCH_AVAILABLE_DAYS}_FAILURE`, payload: error.message });
  }
}

function* fetchCountries({ payload }) {
  try {
    yield put({ type: `${FETCH_COUNTRIES}_REQUEST` });
    const urlWithParams = buildUrlWithParams('/fixture/countries', payload);
    const response = yield call(sendRequest, 'GET', urlWithParams);
    if (response.status === 200) {
      yield put({ type: `${FETCH_COUNTRIES}_SUCCESS`, payload: response.data?.countries });
    } else {
      yield put({ type: `${FETCH_COUNTRIES}_FAILURE`, payload: response.message });
    }
  } catch (error) {
    yield put({ type: `${FETCH_COUNTRIES}_FAILURE`, payload: error.message });
  }
}

function* fetchLeagues({ payload }) {
  try {
    yield put({ type: `${FETCH_LEAGUES}_REQUEST` });
    const urlWithParams = buildUrlWithParams('/fixture/leagues', payload);
    const response = yield call(sendRequest, 'GET', urlWithParams );
    if (response.status === 200) {
      yield put({ type: `${FETCH_LEAGUES}_SUCCESS`, payload: response.data?.leagues });
    } else {
      yield put({ type: `${FETCH_LEAGUES}_FAILURE`, payload: response.message });
    }
  } catch (error) {
    yield put({ type: `${FETCH_LEAGUES}_FAILURE`, payload: error.message });
  }
}

function* fetchMatches({ payload }) {
  try {
    yield put({ type: `${FETCH_MATCHES}_REQUEST` });
    const urlWithParams = buildUrlWithParams('/fixture/matches', payload);
    const response = yield call(sendRequest, 'GET',urlWithParams);
    if (response.status === 200) {
      yield put({ type: `${FETCH_MATCHES}_SUCCESS`, payload: response.data?.matches });
    } else {
      yield put({ type: `${FETCH_MATCHES}_FAILURE`, payload: response.message });
    }
  } catch (error) {
    yield put({ type: `${FETCH_MATCHES}_FAILURE`, payload: error.message });
  }
}

function* FixtureSaga() {
  yield takeLatest(FETCH_AVAILABLE_DAYS, fetchAvailableDays);
  yield takeLatest(FETCH_COUNTRIES, fetchCountries);
  yield takeLatest(FETCH_LEAGUES, fetchLeagues);
  yield takeLatest(FETCH_MATCHES, fetchMatches);
}

export default FixtureSaga;
