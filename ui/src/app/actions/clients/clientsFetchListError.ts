import { CLIENTS_FETCH_LIST_ERROR } from '../types';

export const clientsFetchListError = (exception: Error) => ({
  type: CLIENTS_FETCH_LIST_ERROR,
  payload: { error: exception },
});
