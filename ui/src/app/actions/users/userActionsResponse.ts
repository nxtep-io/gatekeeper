import { User } from 'gatekeeper-sdk';
import { USERS_FETCH_LIST_RESPONSE, USERS_CREATE_RESPONSE, USERS_UPDATE_RESPONSE } from '../types';

/**
 * Handles the users list response from action call.
 *
 * @param users The list of users got returned from server
 */
export const usersFetchListResponse = (users: User[]) => ({
  type: USERS_FETCH_LIST_RESPONSE,
  payload: users,
});

/**
 * Handles the user creation response from action call.
 *
 * @param users The user created in the server
 */
export const usersCreateResponse = (user: User) => ({
  type: USERS_CREATE_RESPONSE,
  payload: user,
});

/**
 * Handles the user update response from action call.
 *
 * @param users The user updated in the server
 */
export const usersUpdateResponse = (user: User) => ({
  type: USERS_UPDATE_RESPONSE,
  payload: user,
});
