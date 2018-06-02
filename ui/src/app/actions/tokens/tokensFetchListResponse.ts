import { OAuthAccessToken } from 'gatekeeper-sdk';
import { TOKENS_FETCH_LIST_RESPONSE } from '../types';

export const tokensFetchListResponse = (tokens: OAuthAccessToken[]) => ({
  type: TOKENS_FETCH_LIST_RESPONSE,
  payload: tokens,
});
