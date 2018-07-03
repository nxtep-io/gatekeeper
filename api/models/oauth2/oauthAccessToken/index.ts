import * as moment from "moment";
import { BaseEntity, Column, Entity, Index, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../../user";
import OAuthClient from "../oauthClient";

@Entity(OAuthAccessToken.tableName)
export default class OAuthAccessToken extends BaseEntity {
  private static readonly tableName = "oauth_access_token";

  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ nullable: false, unique: true })
  accessToken: string;

  @Column({ nullable: false })
  tokenType: string;

  @Column({ nullable: false })
  expires: Date;

  @ManyToOne(type => User, user => user.accessTokens)
  user: User;

  @ManyToOne(type => OAuthClient, client => client.accessTokens)
  client: OAuthClient;

  constructor(data: Partial<OAuthAccessToken> = {}) {
    super();
    this.id = data.id;
    this.accessToken = data.accessToken;
    this.tokenType = data.tokenType;
    this.expires = data.expires;
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
}
