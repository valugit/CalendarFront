import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user from './user';

const reducers = history => combineReducers({
  user,
  router: connectRouter(history)
});

export default reducers;