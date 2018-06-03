import { OAuthAccessToken } from 'gatekeeper-sdk';
import { ANALYTICS_FETCH_ACTIVE_RESPONSE } from '../types';

export const analyticsFetchActiveResponse = active => ({
  type: ANALYTICS_FETCH_ACTIVE_RESPONSE,
  payload: active,
});
