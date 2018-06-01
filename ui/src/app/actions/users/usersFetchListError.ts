import { USERS_FETCH_LIST_ERROR } from '../types';

export const usersFetchListError = (exception: Error) => ({
  type: USERS_FETCH_LIST_ERROR,
  payload: { error: exception },
});
