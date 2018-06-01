import {
  CLIENTS_FETCH_LIST,
  CLIENTS_FETCH_LIST_REQUEST,
  CLIENTS_FETCH_LIST_RESPONSE,
  CLIENTS_FETCH_LIST_ERROR,
} from '../actions/types';

const initialState = {
  clientList: false,
  error: false,
  isLoading: false,
};

export const getClientsSelector = (state: any) => ({
  error: state.clients.error,
  isLoading: state.clients.isLoading,
  clientList: state.clients.clientList,
});

const clientsReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    // Handles a simple session changed for JWT
    case CLIENTS_FETCH_LIST:
      return {
        ...state,
        clientList: false,
        credentials: action.payload.credentials,
      };
    // Handles the requesting state
    case CLIENTS_FETCH_LIST_REQUEST:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    // Handles the session login response
    case CLIENTS_FETCH_LIST_RESPONSE:
      return {
        ...state,
        clientList: action.payload,
        error: false,
        isLoading: false,
      };
    // Handles the session login error
    case CLIENTS_FETCH_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default clientsReducer;
