import {
  USERS_FETCH_LIST_REQUEST, USERS_CREATE_REQUEST, USERS_UPDATE_REQUEST, USERS_RESET_PASSWORD_REQUEST,
} from '../types';

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

/**
 * Notifies the users update request.
 */
export const usersUpdateRequest = () => ({
  type: USERS_UPDATE_REQUEST,
  payload: { isLoading: true },
});

/**
 * Notifies the users password reset request.
 */
export const usersResetPasswordRequest = () => ({
  type: USERS_RESET_PASSWORD_REQUEST,
  payload: { isLoading: true },
});
