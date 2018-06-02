import { combineReducers } from 'redux';
import sessionReducer, { getSessionSelector } from './session';
import usersReducer, { getUsersSelector } from './users';
import clientsReducer, { getClientsSelector } from './clients';
import tokensReducer, { getTokensSelector } from './tokens';

export { getSessionSelector, getUsersSelector, getClientsSelector, getTokensSelector };

// Root Reducer
const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  clients: clientsReducer,
  tokens: tokensReducer,
});

export default rootReducer;
