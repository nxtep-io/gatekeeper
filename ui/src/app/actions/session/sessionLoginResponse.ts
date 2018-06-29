import { OAuthCredentials } from 'gatekeeper-sdk';
import { SESSION_LOGIN_RESPONSE } from '../types';

export const sessionLoginResponse = (accountInfo: OAuthCredentials) => ({
  type: SESSION_LOGIN_RESPONSE,
  payload: { ...accountInfo },
});
