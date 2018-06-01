import { CLIENTS_FETCH_LIST_REQUEST } from '../types';

/**
 * Notifies the clients fetch request.
 */
export const clientsFetchListRequest = () => ({
  type: CLIENTS_FETCH_LIST_REQUEST,
  payload: { isLoading: true },
});
