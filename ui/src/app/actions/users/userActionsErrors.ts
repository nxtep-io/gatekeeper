import { USERS_FETCH_LIST_ERROR, USERS_CREATE_ERROR, USERS_UPDATE_ERROR, USERS_RESET_PASSWORD_ERROR } from '../types';

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

/**
 * Handles a Users Update error.
 *
 * @param exception The exception received from server
 */
export const usersUpdateError = (exception: Error) => ({
  type: USERS_UPDATE_ERROR,
  payload: { error: exception },
});

/**
 * Handles a Users reset password error.
 *
 * @param exception The exception received from server
 */
export const usersResetPasswordError = (exception: Error) => ({
  type: USERS_RESET_PASSWORD_ERROR,
  payload: { error: exception },
});
