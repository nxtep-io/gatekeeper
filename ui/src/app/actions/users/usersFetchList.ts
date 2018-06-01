import { User, UserWebService, Session } from 'gatekeeper-sdk';
import Config from '../../../config';
import { usersFetchListError } from './usersFetchListError';
import { usersFetchListRequest } from './usersFetchListRequest';
import { usersFetchListResponse } from './usersFetchListResponse';

/**
 * Fetches the paginated users list.
 */
export const usersFetchList = () => (
  (dispatch: Function) => {
    dispatch(usersFetchListRequest());

    // Performs the authentication call with account kit
    return UserWebService.getInstance({ session: Session.getInstance({}) })
      .find()
      .then((users: User[]) => dispatch(usersFetchListResponse(users)))
      .catch((exception: Error) => dispatch(usersFetchListError(exception)));
  }
);
