import { ObjectId } from "bson";
import * as mongoose from "mongoose";
import Config from "../../../config";
import User, { UserModel, UserStatus } from "../user";
import OAuthAccessToken, { OAuthAccessTokenModel } from "./oauthAccessToken";
import { default as OAuthClient } from "./oauthClient/index";

export default class OAuth2Middleware {
  /**
   * Gets an OAuth 2.0 Client instance from database.
   *
   * @param clientId The client id
   * @param clientSecret The client secret
   */
  static async getClient(clientId: string, clientSecret?: string) {
    let client;

    try {
      client = await OAuthClient.findOne({ clientId, clientSecret });
    } catch (exception) {
      console.error(exception);
    }

    // Ensure that what come to here has the same secret
    if (client && client.clientSecret === clientSecret) {
      return {
        redirectUris: [],
        grants: Config.oauth.grantTypes,
        ...(client.toJSON ? client.toJSON() : client)
      };
    }

    return client;
  }

  /**
   * Gets an OAuth 2.0 Client instance from database.
   *
   * @param clientId The client id
   * @param clientSecret The client secret
   */
  static async getClientById({ id }) {
    let client;

    try {
      client = await OAuthClient.findOne({ _id: id });
    } catch (exception) {
      console.error(exception);
    }

    if (client) {
      // Ensure is a plain object with the secret
      client = {
        clientSecret: client.clientSecret,
        ...(client.toJSON ? client.toJSON() : client)
      };
    }

    return client;
  }

  /**
   * Gets an user based on email and password credentials.
   *
   * @param email The user username or email
   * @param password The user password
   */
  static async getUser(email: string, password: string): Promise<UserModel> {
    const user = (await User.findOne({ email, status: UserStatus.ACTIVE })) as UserModel;
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }

  /**
   * Gets an User instance from database.
   *
   * @param id The user id
   */
  static async getUserById({ id }) {
    let user = await User.findOne({ _id: id });

    if (user) {
      // Ensure is a plain object with the secret
      user = user.toJSON ? user.toJSON() : user;
    }

    return user;
  }

  /**
   * Gets a virtual user for a client credentials authentication.
   *
   * @param client The oauth client
   */
  static async getUserFromClient(client: string): Promise<any> {
    const _id = new mongoose.Types.ObjectId();

    return {
      _id,
      id: _id,
      virtual: true,
      clientId: client
    };
  }

  /**
   * Saves a new access token on the database.
   *
   * @param token The token instance
   * @param client The client instance
   * @param user The user instance
   */
  static async saveToken(token, client, user): Promise<boolean> {
    return OAuthAccessToken.saveAccessToken(token, client, user);
  }

  /**
   * Gets an OAuth 2.0 Access Token from the database.
   *
   * @param accessToken The access token
   */
  static async getAccessToken(accessToken): Promise<OAuthAccessTokenModel> {
    const now = new Date();

    // Gets instance from database ensuring its expiration
    let token = await OAuthAccessToken.findOne({ accessToken, expires: { $gt: now } });

    if (token) {
      let clientId;

      // Ensure is a plain object
      token = token.toJSON ? token.toJSON() : token;

      // Handle client id types
      if (token.client instanceof ObjectId) {
        clientId = token.client.toString();
      } else if (typeof token.client.id === typeof "a") {
        clientId = token.client.id;
      } else {
        clientId = token.client;
      }

      // Populate token client instance
      token.client = await this.getClientById({ id: clientId });

      // Prepare user instance
      if (token.user && !token.user.virtual) {
        let userId;

        // Handle user id types
        if (token.user instanceof ObjectId) {
          userId = token.user.toString();
        } else if (typeof token.user.id === typeof "a") {
          userId = token.user.id;
        } else {
          userId = token.user;
        }

        token.user = (await this.getUserById({ id: userId })) || {
          id: token.user,
          virtual: true,
          client: token.client
        };
      }

      // Prepare token expiration
      token.accessTokenExpiresAt = token.expires;
    }

    return { ...token, accessTokenExpiresAt: new Date(token.accessTokenExpiresAt) };
  }
}
