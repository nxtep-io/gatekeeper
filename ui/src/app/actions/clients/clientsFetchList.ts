import { OAuthClient, OAuthClientWebService, Session } from 'gatekeeper-sdk';
import Config from '../../../config';
import { clientsFetchListError } from './clientsFetchListError';
import { clientsFetchListRequest } from './clientsFetchListRequest';
import { clientsFetchListResponse } from './clientsFetchListResponse';

/**
 * Fetches the paginated OAuth 2.0 clients list.
 */
export const clientsFetchList = () => (
  (dispatch: Function) => {
    dispatch(clientsFetchListRequest());

    return OAuthClientWebService.getInstance({ session: Session.getInstance({}) })
      .find()
      .then((users: OAuthClient[]) => dispatch(clientsFetchListResponse(users)))
      .catch((exception: Error) => dispatch(clientsFetchListError(exception)));
  }
);
