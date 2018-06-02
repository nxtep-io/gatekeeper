import { USERS_FETCH_LIST_REQUEST, USERS_CREATE_REQUEST } from '../types';

/**
 * Notifies the users fetch request.
 */
export const usersFetchListRequest = () => ({
  type: USERS_FETCH_LIST_REQUEST,
  payload: { isLoading: true },
});

/**
 * Notifies the users create request.
 */
export const usersCreateRequest = () => ({
  type: USERS_CREATE_REQUEST,
  payload: { isLoading: true },
});
