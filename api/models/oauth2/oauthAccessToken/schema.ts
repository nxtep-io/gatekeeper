import * as moment from 'moment';
import { BaseSchema } from 'ts-framework-mongo';
import { UserModel } from '../../user';
import { OAuthClientModel } from '../oauthClient';

/**
 * The OAuthAccessToken schema definition.
 */
export const OAuthAccessTokenSchema = new BaseSchema({
  accessToken: {
    unique: true,
    type: String,
    required: true,
  },

  tokenType: {
    required: true,
    type: String,
    enum: ['Bearer'],
  },

  client: {
    required: true,
    type: BaseSchema.Types.ObjectId,
    ref: OAuthClientModel.modelName,
  },

  user: {
    required: true,
    type: BaseSchema.Types.ObjectId,
    ref: UserModel.modelName,
  },

  expires: {
    required: true,
    index: true,
    type: Date,
  },

  userAgent: {
    ip: { type: String },
    browser: { type: String },
    version: { type: String },
    os: { type: String },
    platform: { type: String },
    source: { type: String },
  },

  // TODO: Extra info
  // - ip
  // - device {}?
  // - location/timezone?
  // ...

},                                                   {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});
