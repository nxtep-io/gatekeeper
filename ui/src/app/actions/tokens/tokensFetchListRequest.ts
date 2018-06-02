import { TOKENS_FETCH_LIST_REQUEST } from '../types';

/**
 * Notifies the tokens fetch request.
 */
export const tokensFetchListRequest = () => ({
  type: TOKENS_FETCH_LIST_REQUEST,
  payload: { isLoading: true },
});
