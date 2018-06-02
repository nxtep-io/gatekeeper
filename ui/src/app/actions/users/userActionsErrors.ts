import { USERS_FETCH_LIST_ERROR, USERS_CREATE_ERROR } from '../types';

/**
 * Handles a Users List fetch error.
 *
 * @param exception The exception received from server
 */
export const usersFetchListError = (exception: Error) => ({
  type: USERS_FETCH_LIST_ERROR,
  payload: { error: exception },
});

/**
 * Handles a Users Create error.
 *
 * @param exception The exception received from server
 */
export const usersCreateError = (exception: Error) => ({
  type: USERS_CREATE_ERROR,
  payload: { error: exception },
});
