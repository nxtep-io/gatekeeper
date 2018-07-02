import { BaseSchema } from "ts-framework-mongo";
import * as uuid from "uuid";

/* Schema constants */
const CLIENT_ID_MIN_LENGTH = 6;
const CLIENT_ID_MAX_LENGTH = 32;

export enum OAuthClientPlatform {
  API = "api",
  BOT = "bot",
  WEB = "web"
}

export enum OAuthClientStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

/**
 * The OAuth Client schema definition.
 */
export const OAuthClientSchema = new BaseSchema(
  {
    platform: {
      required: true,
      type: String,
      enum: [OAuthClientPlatform.API, OAuthClientPlatform.BOT, OAuthClientPlatform.WEB]
    },
    clientId: {
      unique: true,
      required: true,
      type: String,
      min: CLIENT_ID_MIN_LENGTH,
      max: CLIENT_ID_MAX_LENGTH
    },
    clientSecret: {
      type: String,
      index: true,
      default: uuid.v4()
    },
    status: {
      type: String,
      default: OAuthClientStatus.ACTIVE,
      enum: [OAuthClientStatus.ACTIVE, OAuthClientStatus.INACTIVE]
    }
  },
  { timestamps: true }
);
