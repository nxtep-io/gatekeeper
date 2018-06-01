import { User } from 'gatekeeper-sdk';
import { USERS_FETCH_LIST_RESPONSE } from '../types';

export const usersFetchListResponse = (users: User[]) => ({
  type: USERS_FETCH_LIST_RESPONSE,
  payload: users,
});
