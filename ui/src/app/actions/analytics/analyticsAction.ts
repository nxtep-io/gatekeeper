import { Session, AnalyticsWebService } from 'gatekeeper-sdk';
import Config from '../../../config';
import { analyticsFetchActiveError } from './analyticsActionError';
import { analyticsFetchActiveRequest } from './analyticsActionRequest';
import { analyticsFetchActiveResponse } from './analyticsActionResponse';

/**
 * Fetches analytics for currently active users and clients.
 */
export const analyticsFetchActive = () => (
  (dispatch: Function) => {
    dispatch(analyticsFetchActiveRequest());

    return AnalyticsWebService.getInstance({ session: Session.getInstance({}) })
      .active()
      .then(active => dispatch(analyticsFetchActiveResponse(active)))
      .catch((exception: Error) => dispatch(analyticsFetchActiveError(exception)));
  }
);
