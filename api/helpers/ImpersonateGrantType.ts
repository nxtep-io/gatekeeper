import * as Bluebird from 'bluebird';
import { BaseRequest } from 'ts-framework';
import * as AbstractGrantType from 'oauth2-server/lib/grant-types/abstract-grant-type';
import * as InvalidArgumentError from 'oauth2-server/lib/errors/invalid-argument-error';
import * as InvalidRequestError from 'oauth2-server/lib/errors/invalid-request-error';

import Database from '../MainDatabase';
import { User, UserRole, OAuthAccessToken} from '../models';

export default class ImpersonateGrantType extends AbstractGrantType {

  public async handle(request: BaseRequest, client) {
    if (!request) {
      throw new InvalidArgumentError('Missing parameter: `request`');
    }
    if (!client) {
      throw new InvalidArgumentError('Missing parameter: `client`');
    }
    if (!request.body.access_token) {
      throw new InvalidRequestError('Missing parameter: `access_token`');
    }
    if (!request.body.user_id) {
      throw new InvalidRequestError('Missing parameter: `user_id`');
    }

    // Gets user instance from database
    const userClient = await this.getUser(request.body.access_token, request.body.user_id);
    return this.saveToken(userClient, client, undefined);
  }

  /**
   * Gets the user instance to be impersonated, validating the impersonator permissions.
   * 
   * @param accessToken The access token of the impersonator
   * @param userId The user id to be impersonated
   */
  public async getUser(accessToken: string, userId: string) {

    // Tries to get the impersonator user from database
    const oauth = await OAuthAccessToken.findOne({ accessToken, expires: { $gt: new Date() } });

    if (!oauth) {
      throw new InvalidRequestError('Unauthorized access token');
    }

    let user;
    const impersonator = await User.findOne({ _id: oauth.user });

    if (!impersonator) {
      throw new InvalidRequestError('Unauthorized access token: impersonator not found');
    }

    if (impersonator.profile === UserRole.ROOT) {
      // Impersonate any user using an Admin access token
      user = await User.findOne({ _id: userId });
    } else {
      throw new InvalidRequestError(
        `Unauthorized user role: cannot use this Grant Type with profile="${impersonator.role}"`,
      );
    }

    if (!user) {
      throw new InvalidRequestError(`Unauthorized user access: forbidden`);
    } else {
      return user;
    }
  }

  public async saveToken(user, client, scope) {
    const fns = [
      (this as any).validateScope(user, client, scope),
      (this as any).generateAccessToken(client, user, scope),
      (this as any).generateRefreshToken(client, user, scope),
      (this as any).getAccessTokenExpiresAt(),
      (this as any).getRefreshTokenExpiresAt(),
    ];

    return Bluebird.all(fns)
      .bind(this)
      .spread(function (scope, accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt) {
        const token = {
          accessToken,
          accessTokenExpiresAt,
          refreshToken,
          refreshTokenExpiresAt,
          scope,
        };
        return this.model.saveToken(token, client, user);
      });
  }

}
