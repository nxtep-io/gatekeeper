import { SESSION_LOGIN_ERROR } from '../types';

export const sessionLoginError = (exception: Error) => ({
  type: SESSION_LOGIN_ERROR,
  payload: { error: exception },
});
