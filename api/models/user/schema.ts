import * as Chance from "chance";
import * as moment from "moment";
import { BaseSchema } from "ts-framework-mongo";

/**
 * TODO: Move to config
 */
export const PHONE_CODE_EXPIRATION_MIN = 15;
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export enum UserRole {
  ROOT = "root",
  USER = "user"
}

/**
 * The User schema definition.
 */
export const UserSchema = new BaseSchema(
  {
    name: {
      required: true,
      type: String
    },
    phones: [
      {
        _id: false,
        number: {
          type: String,
          required: true
        },
        authorization: {
          required: true,
          type: BaseSchema.Types.ObjectId,
          ref: "phoneAuthorizationCode"
        }
      }
    ],
    role: {
      required: true,
      type: String,
      default: UserRole.USER,
      enum: [UserRole.ROOT, UserRole.USER]
    },
    status: {
      type: String,
      default: UserStatus.ACTIVE,
      enum: [UserStatus.ACTIVE, UserStatus.INACTIVE]
    },
    password: {
      salt: String,
      hash: String,
      secret: {
        token: String,
        expiresAt: Date
      },
      password: {
        salt: String,
        hash: String,
        secret: {
          token: String,
          expiresAt: Date
        }
      }
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);
