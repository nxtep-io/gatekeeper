import { ANALYTICS_FETCH_ACTIVE_ERROR } from '../types';

export const analyticsFetchActiveError = (exception: Error) => ({
  type: ANALYTICS_FETCH_ACTIVE_ERROR,
  payload: { error: exception },
});
