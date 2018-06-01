import { USERS_FETCH_LIST_REQUEST } from '../types';

/**
 * Notifies the session login request.
 */
export const usersFetchListRequest = () => ({
  type: USERS_FETCH_LIST_REQUEST,
  payload: { isLoading: true },
});
