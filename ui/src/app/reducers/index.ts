import { combineReducers } from 'redux';
import sessionReducer, { getSessionSelector } from './session';
import usersReducer, { getUsersSelector } from './users';
import clientsReducer, { getClientsSelector } from './clients';

export { getSessionSelector, getUsersSelector, getClientsSelector };

// Root Reducer
const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  clients: clientsReducer,
});

export default rootReducer;
