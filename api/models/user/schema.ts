import { BaseSchema } from "ts-framework-mongo";

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
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        message: "Please enter a valid email address",
        validator: (email: string) => EMAIL_REGEX.test(email)
      }
    },
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
      }
    }
  },
  { timestamps: true }
);
