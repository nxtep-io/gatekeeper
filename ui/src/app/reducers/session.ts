import {
  SESSION_LOGIN_ERROR,
  SESSION_LOGIN_REQUEST,
  SESSION_LOGIN_RESPONSE,
  SESSION_CHANGED,
} from '../actions/types';

const initialState = {
  user: false,
  error: false,
  isLoading: false,
};

export const getSessionSelector = (state: any) => ({
  error: state.session.error,
  isLoading: state.session.isLoading,
  user: state.session.user,
});

const sessionLoginReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    // Handles a simple session changed for JWT
    case SESSION_CHANGED:
      return {
        ...state,
        ...action.payload,
      };
    // Handles the requesting state
    case SESSION_LOGIN_REQUEST:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    // Handles the session login response
    case SESSION_LOGIN_RESPONSE:
      return {
        ...state,
        user: action.payload,
        credentials: action.payload.credentials,
        error: false,
        isLoading: false,
      };
    // Handles the session login error
    case SESSION_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default sessionLoginReducer;
