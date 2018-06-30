import * as moment from 'moment';
import { ModelUpdateOptions, Query } from 'mongoose';
import { BaseModel, BaseSchema, Model } from 'ts-framework-mongo';
import MainDatabase from '../../../MainDatabase';
import { OAuthAuthorizationCodeSchema } from './schema';

@Model('oauthAuthorizationCode')
export class OAuthAuthorizationCodeModel extends BaseModel {
  /**
   * The OAuth Access Token schema definition.
   */
  static Schema: BaseSchema = OAuthAuthorizationCodeSchema;

  /**
   * Revokes authorization codes based on specified conditions.
   * 
   * @param conditions 
   * @param options 
   */
  public static revoke(conditions: Object, options: ModelUpdateOptions): Query<any> {
    const now = new Date();
    return this.update({ ...conditions, expires: { $gt: now } }, {
      $set: { expires: now },
    }, options);

  }

  /**
   * Saves a new AuthorizationCode in the database according to the oauth 2.0 middleware.
   * 
   * @param code The code instance
   * @param client The client instance
   * @param user The user instance
   */
  static async saveAuthorizationCode(code, client, user) {
    const userId = user.id || user._id;
    const clientId = client.id || client._id || client;

    // Prepare the new authorizationCode instance
    const authorizationCode = await this.create({
      expires: code.expiresAt,
      code: code.authorizationCode || code.code,
      client: clientId,
      user: userId,
    });

    // Return the middleware expected output.
    return {
      user: userId,
      client: clientId,
      code: authorizationCode.code,
      expiresAt: authorizationCode.expiresAt,
      authorizationId: authorizationCode._id,
    };
  }

  /**
   * Converts the token instance to a plain object.
   * 
   * @returns {Object}
   */
  public toJSON(): Object {
    const obj = super.toJSON();
    if (obj.user && obj.user.toJSON) {
      obj.user = obj.user.toJSON();
    }
    if (obj.client && obj.client.toJSON) {
      obj.client = obj.client.toJSON();
    }
    return obj;
  }
}

export default MainDatabase.model(OAuthAuthorizationCodeModel);
