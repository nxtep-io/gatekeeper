import { ANALYTICS_FETCH_ACTIVE_REQUEST } from '../types';

/**
 * Notifies the analytics active fetch fetch request.
 */
export const analyticsFetchActiveRequest = () => ({
  type: ANALYTICS_FETCH_ACTIVE_REQUEST,
  payload: { isLoading: true },
});
