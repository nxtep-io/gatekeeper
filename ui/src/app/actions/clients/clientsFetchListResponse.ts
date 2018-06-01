import { OAuthClient } from 'gatekeeper-sdk';
import { CLIENTS_FETCH_LIST_RESPONSE } from '../types';

export const clientsFetchListResponse = (clients: OAuthClient[]) => ({
  type: CLIENTS_FETCH_LIST_RESPONSE,
  payload: clients,
});
