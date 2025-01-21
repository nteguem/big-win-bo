import { all } from 'redux-saga/effects';
import usersSaga from '../user/saga';
import predictionsSaga from '../prediction/saga';
import FixtureSaga from '../fixture/saga';
import EventSaga from '../event/saga';
/**

 * @description combine sagas.

 */

export default function* Sagas() {
  yield all([
  usersSaga(),
  predictionsSaga(),
  FixtureSaga(),
  EventSaga()
]);
}
