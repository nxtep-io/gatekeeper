import { User, UserWebService, Session, UserSchema, Pagination } from 'gatekeeper-sdk';
import Config from '../../../config';
import { usersFetchListError, usersCreateError, usersUpdateError, usersResetPasswordError } from './userActionsErrors';
import {
  usersFetchListRequest, usersCreateRequest, usersUpdateRequest, usersResetPasswordRequest,
} from './userActionsRequest';
import {
  usersFetchListResponse, usersCreateResponse, usersUpdateResponse, usersResetPasswordResponse,
} from './userActionsResponse';

/**
 * Fetches the paginated users list.
 *
 * @param pagination The pagination params.
 */
export const usersFetchList = (pagination?: Pagination) => (
  (dispatch: Function) => {
    dispatch(usersFetchListRequest());

    return UserWebService.getInstance({ session: Session.getInstance({}) })
      .find(pagination)
      .then((users: User[]) => dispatch(usersFetchListResponse(users)))
      .catch((exception: Error) => dispatch(usersFetchListError(exception)));
  }
);

/**
 * Creates a new User in the platform.
 *
 * @param user The user instance to be created
 */
export const usersCreate = (user: UserSchema) => (
  (dispatch: Function) => {
    dispatch(usersCreateRequest());

    return UserWebService.getInstance({ session: Session.getInstance({}) })
      .create(user)
      .then((user: User) => dispatch(usersCreateResponse(user)))
      .catch((exception: Error) => dispatch(usersCreateError(exception)));
  }
);

/**
 * Updates an existing User in the platform.
 *
 * @param user The user instance to be updated
 */
export const usersUpdate = (id: string, user: UserSchema) => (
  (dispatch: Function) => {
    dispatch(usersUpdateRequest());

    return UserWebService.getInstance({ session: Session.getInstance({}) })
      .update(id, user)
      .then((user: User) => dispatch(usersUpdateResponse(user)))
      .catch((exception: Error) => dispatch(usersUpdateError(exception)));
  }
);

/**
 * Requests a credential recover using the user email/].
 *
 * @param email The user email, to receive further instructions
 */
export const usersResetPassword = (email: string) => (
  (dispatch: Function) => {
    dispatch(usersResetPasswordRequest());

    return UserWebService.getInstance({ session: Session.getInstance({}) })
      .reset(email)
      .then(() => dispatch(usersResetPasswordResponse()))
      .catch((exception: Error) => dispatch(usersResetPasswordError(exception)));
  }
);
