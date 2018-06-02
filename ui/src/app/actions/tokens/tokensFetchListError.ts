import { TOKENS_FETCH_LIST_ERROR } from '../types';

export const tokensFetchListError = (exception: Error) => ({
  type: TOKENS_FETCH_LIST_ERROR,
  payload: { error: exception },
});
