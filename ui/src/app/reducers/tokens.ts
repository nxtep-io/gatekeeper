import {
  TOKENS_FETCH_LIST,
  TOKENS_FETCH_LIST_REQUEST,
  TOKENS_FETCH_LIST_RESPONSE,
  TOKENS_FETCH_LIST_ERROR,
} from '../actions/types';

const initialState = {
  tokenList: false,
  error: false,
  isLoading: false,
};

export const getTokensSelector = (state: any) => ({
  error: state.tokens.error,
  isLoading: state.tokens.isLoading,
  tokenList: state.tokens.tokenList,
});

const tokensReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    // Fetch the list of tokens
    case TOKENS_FETCH_LIST:
      return {
        ...state,
        tokenList: false,
      };
    // Handles the requesting state
    case TOKENS_FETCH_LIST_REQUEST:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    // Handles the tokens fetch response
    case TOKENS_FETCH_LIST_RESPONSE:
      return {
        ...state,
        tokenList: action.payload,
        error: false,
        isLoading: false,
      };
    // Handles the tokens fetch error
    case TOKENS_FETCH_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default tokensReducer;
