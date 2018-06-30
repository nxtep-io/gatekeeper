import * as moment from "moment";
import { ModelUpdateOptions, Query } from "mongoose";
import { BaseModel, BaseSchema, Model } from "ts-framework-mongo";
import MainDatabase from "../../../MainDatabase";
import { OAuthAccessTokenSchema } from "./schema";

@Model("oauthAccessToken")
export class OAuthAccessTokenModel extends BaseModel {
  /**
   * The OAuth Access Token schema definition.
   */
  static Schema: BaseSchema = OAuthAccessTokenSchema;

  /**
   * Updates an access token setting its user agent stuff.
   *
   * @param accessToken The acess token to be updated
   * @param ip The client ip
   * @param userAgent The user agent information
   */
  public static async updateUserAgent(accessToken: string, ip: string, userAgent: any) {
    const ua = {
      ip,
      browser: userAgent.browser,
      version: userAgent.version,
      os: userAgent.os,
      platform: userAgent.browser.platform,
      source: userAgent.source
    };

    await this.update(
      { accessToken },
      {
        $set: {
          userAgent: ua
        }
      }
    );

    return ua;
  }

  /**
   * Revokes access tokens based on specified conditions.
   *
   * @param conditions
   * @param options
   */
  public static revoke(conditions: Object, options: ModelUpdateOptions): Query<any> {
    const now = new Date();
    return this.update(
      { ...conditions, expires: { $gt: now } },
      {
        $set: { expires: now }
      },
      options
    );
  }

  /**
   * Saves a new access token in the database according to the oauth 2.0 middleware.
   *
   * @param token The token instance
   * @param client The client instance
   * @param user The user instance
   */
  static async saveAccessToken(token, client, user) {
    const userId = user.id || user._id;
    const clientId = client.id || client._id || client;

    // Prepare the new access token instance
    const accessToken = await this.create({
      expires: token.accessTokenExpiresAt,
      accessToken: token.accessToken,
      tokenType: "Bearer",
      client: clientId,
      user: userId
    });

    // Return the middleware expected output.
    const result = {
      user: userId,
      client: clientId,
      accessToken: accessToken.accessToken,
      expires_in: moment(token.accessTokenExpiresAt).diff(moment(), "seconds") + 1,
      user_id: userId
    } as any;

    if (user.virtual) {
      result.virtual = true;
    }

    return result;
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

export default MainDatabase.model(OAuthAccessTokenModel);
