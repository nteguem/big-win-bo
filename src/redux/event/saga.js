import { call, put, takeLatest } from 'redux-saga/effects';
import { sendRequest } from '../../utils/api';
import {
  FETCH_LIST_EVENT,
} from './types';


function* fetchListEvent() {
  try {
    yield put({ type: `${FETCH_LIST_EVENT}_REQUEST` });
    const response = yield call(sendRequest, 'GET', '/event/list');
    if (response.status === 200) {
      yield put({ type: `${FETCH_LIST_EVENT}_SUCCESS`, payload: response.data?.events });
    } else {
      yield put({ type: `${FETCH_LIST_EVENT}_FAILURE`, payload: response.message });
    }
  } catch (error) {
    yield put({ type: `${FETCH_LIST_EVENT}_FAILURE`, payload: error.message });
  }
}

function* EventSaga() {
  yield takeLatest(FETCH_LIST_EVENT, fetchListEvent);
}

export default EventSaga;
