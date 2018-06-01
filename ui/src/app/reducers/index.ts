import { combineReducers } from 'redux';
import sessionReducer, { getSessionSelector } from './session';
import usersReducer, { getUsersSelector } from './users';

export { getSessionSelector, getUsersSelector };

// Root Reducer
const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
});

export default rootReducer;
