import * as Chance from 'chance';
import * as moment from 'moment';
import { ModelUpdateOptions, Query } from 'mongoose';
import { BaseModel, BaseSchema, Model } from 'ts-framework-mongo';
import MainDatabase from '../../../MainDatabase';
import { OAuthAuthorizationCodeSchema } from './schema';

@Model('oauthAuthorizationCode')
export class OAuthAuthorizationCodeModel extends BaseModel {
  /**
   * The OAuth Authorization Code schema definition.
   */
  static Schema: BaseSchema = OAuthAuthorizationCodeSchema;

  /**
   * Revokes Authorization Codes based on specified conditions.
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
   * Generates a new Authorization Code and stores it in the database.
   */
  public static async generateCode(user, client) {
    const chance = new Chance();
    const userId = user.id || user._id || user;
    const clientId = client.id || client._id || client;

    // Generate new code and store it in database. 
    const code = await this.create({
      user: userId,
      client: clientId,
      code: chance.hash({ casing: 'upper', length: 8 }),
      // TODO: Move this to config
      expires: moment().add(30, 'minutes').toDate(),
    });

    return code;
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
