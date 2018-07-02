import { BaseSchema } from "ts-framework-mongo";
import { UserModel } from "../user";
import { SettingsKeys } from "./enum";

/**
 * The Settings schema definition.
 */
export const SettingsSchema = new BaseSchema(
  {
    key: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      enum: [SettingsKeys.SERVER_LOGO, SettingsKeys.SERVER_NAME, SettingsKeys.USERS_SIGNUP_ENABLED]
    },
    value: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      required: true,
      ref: UserModel.modelName,
      type: BaseSchema.Types.ObjectId
    }
  },
  { timestamps: true }
);
