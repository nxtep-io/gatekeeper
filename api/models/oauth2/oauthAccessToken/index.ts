import * as moment from "moment";
import {
  BaseEntity,
  Column,
  DeepPartial,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  MoreThan,
  PrimaryGeneratedColumn
} from "typeorm";
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

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  browser: string;

  @Column({ nullable: true })
  version: string;

  @Column({ nullable: true })
  os: string;

  @Column({ nullable: true })
  platform: string;

  @Column({ nullable: true })
  source: string;

  constructor(data: Partial<OAuthAccessToken> = {}) {
    super();
    this.id = data.id;
    this.accessToken = data.accessToken;
    this.tokenType = data.tokenType;
    this.expires = data.expires;
    this.id = data.ip;
    this.browser = data.browser;
    this.version = data.version;
    this.os = data.os;
    this.platform = data.platform;
    this.source = data.source;
  }

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

    await this.update({ accessToken }, { ...ua });
    return ua;
  }

  /**
   * Revokes access tokens based on specified conditions.
   *
   * @param conditions
   * @param options
   */
  public static async revoke(conditions: Partial<OAuthAccessToken>) {
    const now = new Date();
    return this.update({ ...conditions, expires: MoreThan(now) as DeepPartial<Date> }, { expires: now });
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
