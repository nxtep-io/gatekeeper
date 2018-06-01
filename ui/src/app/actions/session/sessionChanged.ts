import { Session, Observer, OAuthCredentials } from 'gatekeeper-sdk';
import Config from '../../../config';
import { SESSION_CHANGED } from '../types';

export const sessionChanged = (credentials: OAuthCredentials) => ({
  type: SESSION_CHANGED,
  payload: { ...credentials },
});
