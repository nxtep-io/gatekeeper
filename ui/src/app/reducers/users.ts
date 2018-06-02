import {
  USERS_FETCH_LIST,
  USERS_FETCH_LIST_REQUEST,
  USERS_FETCH_LIST_RESPONSE,
  USERS_FETCH_LIST_ERROR,
  USERS_CREATE_REQUEST,
  USERS_CREATE_ERROR,
  USERS_CREATE,
  USERS_CREATE_RESPONSE,
} from '../actions/types';

const initialState = {
  userList: false,
  userCreated: false,
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
    // Handles the request call reducing
    case USERS_FETCH_LIST:
      return {
        ...state,
        userList: false,
      };
    case USERS_CREATE:
      return {
        ...state,
        userCreated: false,
      };
    // Handles the requesting state
    case USERS_FETCH_LIST_REQUEST:
    case USERS_CREATE_REQUEST:
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
    case USERS_CREATE_RESPONSE:
      return {
        ...state,
        userCreated: action.payload,
        error: false,
        isLoading: false,
      };
    // Handles the session login error
    case USERS_FETCH_LIST_ERROR:
    case USERS_CREATE_ERROR:
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
