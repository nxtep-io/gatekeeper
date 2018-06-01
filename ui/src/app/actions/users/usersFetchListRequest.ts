import { USERS_FETCH_LIST_REQUEST } from '../types';

/**
 * Notifies the users fetch request.
 */
export const usersFetchListRequest = () => ({
  type: USERS_FETCH_LIST_REQUEST,
  payload: { isLoading: true },
});
