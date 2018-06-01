import { combineReducers } from 'redux';
import loginAccount, { getSessionSelector } from './session';

export { getSessionSelector };

// Root Reducer
const rootReducer = combineReducers({
  session: loginAccount,
});

export default rootReducer;
