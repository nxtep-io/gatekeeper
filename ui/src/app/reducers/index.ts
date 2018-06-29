import { combineReducers } from 'redux';
import sessionReducer, { getSessionSelector } from './session';
import usersReducer, { getUsersSelector } from './users';
import clientsReducer, { getClientsSelector } from './clients';
import tokensReducer, { getTokensSelector } from './tokens';
import analyticsReducer, { getAnalyticsSelector } from './analytics';

export {
  getSessionSelector,
  getUsersSelector,
  getClientsSelector,
  getTokensSelector,
  getAnalyticsSelector,
};

// Root Reducer
const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  clients: clientsReducer,
  tokens: tokensReducer,
  analytics: analyticsReducer,
});

export default rootReducer;
