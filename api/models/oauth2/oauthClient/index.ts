import { BaseEntity, Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "../../user";
import OAuthAccessToken from "../oauthAccessToken";

export enum OAuthClientPlatform {
  API = "api",
  WEB = "web"
}

export enum OAuthClientStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

@Entity(OAuthClient.tableName)
export default class OAuthClient extends BaseEntity {
  private static readonly tableName = "oauth_client";

  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ nullable: false, unique: true })
  clientId: string;

  @Column({ nullable: false })
  clientSecret: string;

  @Column({ nullable: false })
  platform: OAuthClientPlatform;

  @Column({ nullable: false })
  status: OAuthClientStatus;

  @OneToMany(type => OAuthAccessToken, token => token.client, { eager: false })
  accessTokens: OAuthAccessToken;

  constructor(data: Partial<OAuthClient> = {}) {
    super();
    this.id = data.id;
    this.clientId = data.clientId;
    this.clientSecret = data.clientSecret;
  }
}
