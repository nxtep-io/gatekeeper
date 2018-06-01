import {
  USERS_FETCH_LIST,
  USERS_FETCH_LIST_REQUEST,
  USERS_FETCH_LIST_RESPONSE,
  USERS_FETCH_LIST_ERROR,
} from '../actions/types';

const initialState = {
  userList: false,
  error: false,
  isLoading: false,
};

export const getUsersSelector = (state: any) => ({
  error: state.users.error,
  isLoading: state.users.isLoading,
  userList: state.users.userList,
});

const usersReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    // Handles a simple session changed for JWT
    case USERS_FETCH_LIST:
      return {
        ...state,
        userList: false,
        credentials: action.payload.credentials,
      };
    // Handles the requesting state
    case USERS_FETCH_LIST_REQUEST:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    // Handles the session login response
    case USERS_FETCH_LIST_RESPONSE:
      return {
        ...state,
        userList: action.payload,
        error: false,
        isLoading: false,
      };
    // Handles the session login error
    case USERS_FETCH_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default usersReducer;
