import * as moment from "moment";
import { BaseSchema } from "ts-framework-mongo";
import { OAuthClientModel } from "../oauth2/oauthClient";
import { UserModel } from "../user";

/**
 * The PhoneAuthorizationCode schema definition.
 */
export const PhoneAuthorizationCodeSchema = new BaseSchema(
  {
    phone: {
      required: true,
      type: String
    },

    code: {
      unique: true,
      type: String,
      required: true
    },

    client: {
      required: true,
      type: BaseSchema.Types.ObjectId,
      ref: OAuthClientModel.modelName
    },

    user: {
      required: true,
      type: BaseSchema.Types.ObjectId,
      ref: UserModel.modelName
    },

    expires: {
      required: true,
      index: true,
      type: Date
    },

    verifiedAt: {
      type: Date
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);
