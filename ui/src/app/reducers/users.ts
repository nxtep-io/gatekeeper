import * as Actions from '../actions/types';

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
  userCreated: state.users.userCreated,
  userUpdated: state.users.userUpdated,
});

const usersReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    // Handles the request call reducing
    case Actions.USERS_FETCH_LIST:
      return {
        ...state,
        userList: false,
      };
    case Actions.USERS_CREATE:
      return {
        ...state,
        userCreated: false,
      };
    case Actions.USERS_UPDATE:
      return {
        ...state,
        userUpdated: false,
      };
    // Handles the requesting state
    case Actions.USERS_FETCH_LIST_REQUEST:
    case Actions.USERS_CREATE_REQUEST:
    case Actions.USERS_UPDATE_REQUEST:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    // Handles the session login response
    case Actions.USERS_FETCH_LIST_RESPONSE:
      return {
        ...state,
        userList: action.payload,
        error: false,
        isLoading: false,
      };
    case Actions.USERS_CREATE_RESPONSE:
      return {
        ...state,
        userCreated: action.payload,
        error: false,
        isLoading: false,
      };
    case Actions.USERS_UPDATE_RESPONSE:
      return {
        ...state,
        userUpdated: action.payload,
        error: false,
        isLoading: false,
      };
    // Handles the session login error
    case Actions.USERS_FETCH_LIST_ERROR:
    case Actions.USERS_CREATE_ERROR:
    case Actions.USERS_UPDATE_ERROR:
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
