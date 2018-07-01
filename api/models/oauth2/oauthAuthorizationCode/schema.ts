import * as moment from 'moment';
import { BaseSchema } from 'ts-framework-mongo';
import { UserModel } from '../../user';
import { OAuthClientModel } from '../oauthClient';

/**
 * The OAuthAuthorizationCode schema definition.
 */
export const OAuthAuthorizationCodeSchema = new BaseSchema({
  code: {
    unique: true,
    type: String,
    required: true,
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

}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});
