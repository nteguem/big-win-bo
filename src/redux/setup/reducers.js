import { combineReducers } from 'redux';
import usersReducer from '../user/reducer';
import predictionsReducer from '../prediction/reducer';
import FixtureReducer from '../fixture/reducer';
import EventReducer from '../event/reducer';

const reducerCombination = combineReducers({
  usersReducer,
  predictionsReducer,
  FixtureReducer,
  EventReducer
});

export default reducerCombination;
