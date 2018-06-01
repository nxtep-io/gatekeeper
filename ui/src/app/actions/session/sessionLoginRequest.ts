import { SESSION_LOGIN_REQUEST } from '../types';

/**
 * Notifies the session login request.
 */
export const sessionLoginRequest = () => ({
  type: SESSION_LOGIN_REQUEST,
  payload: { isLoading: true },
});
