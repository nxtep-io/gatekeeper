import { OAuthAccessTokenWebService, Session, OAuthAccessToken, Pagination } from 'gatekeeper-sdk';
import Config from '../../../config';
import { tokensFetchListError } from './tokensFetchListError';
import { tokensFetchListRequest } from './tokensFetchListRequest';
import { tokensFetchListResponse } from './tokensFetchListResponse';

/**
 * Fetches the paginated OAuth 2.0 tokens list.
 */
export const tokensFetchList = (pagination: Pagination) => (
  (dispatch: Function) => {
    dispatch(tokensFetchListRequest());

    return OAuthAccessTokenWebService.getInstance({ session: Session.getInstance({}) })
      .find(pagination)
      .then((tokens: OAuthAccessToken[]) => dispatch(tokensFetchListResponse(tokens)))
      .catch((exception: Error) => dispatch(tokensFetchListError(exception)));
  }
);
