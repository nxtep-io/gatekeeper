import { User } from 'gatekeeper-sdk';
import { USERS_FETCH_LIST_RESPONSE, USERS_CREATE_RESPONSE } from '../types';

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
