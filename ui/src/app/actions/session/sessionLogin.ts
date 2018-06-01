import { Session } from 'gatekeeper-sdk';
import Config from '../../../config';
import { sessionLoginError } from './sessionLoginError';
import { sessionLoginRequest } from './sessionLoginRequest';
import { sessionLoginResponse } from './sessionLoginResponse';

/**
 * Authenticates using email and password.
 *
 * @param email The email address
 * @param password The password
 */
export const sessionLoginEmail = (email, password) => (
  (dispatch: Function) => {
    dispatch(sessionLoginRequest());

    // Performs the authentication call with account kit
    return Session.getInstance({}).password({ password, username: email })
      .then((accountInfo: any) => dispatch(sessionLoginResponse(accountInfo)))
      .catch((exception: Error) => dispatch(sessionLoginError(exception)));
  }
);
