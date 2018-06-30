import * as Package from 'pjson';
import * as Chance from 'chance';
import * as moment from 'moment';
import { Controller, Post, Get, HttpError, HttpCode, Logger } from 'ts-framework';
import { OAuth, Params } from '../filters';
import { OAuthAuthorizationCode } from '../models';

/**
 * TODO: Move to config
 * 
 * The default timeout in minutes for the code expiration.
 */
export const PHONE_CODE_EXPIRATION_MIN = 15;

@Controller('/phone', [OAuth.token])
export default class OAuthPhoneController {
  @Post('/authorize', [Params.isValidPhoneNumber])
  static async authorize(req, res) {
    // TODO: Move to filters
    if (!req.param('response_type')) {
      throw new HttpError('The param `response_type` should be equal to "code"', HttpCode.Client.BAD_REQUEST);
    }

    const chance = new Chance();
    const code = chance.hash({ casing: 'upper', length: 8 });
    const authorizationCode = await OAuthAuthorizationCode.saveAuthorizationCode({
      code,
      expiresAt: moment().add(PHONE_CODE_EXPIRATION_MIN, 'minutes'),
    }, res.locals.oauth.token.client, req.user);

    // TODO: Send code using SMS
    Logger.warn(`PHONE: Generated phone verification code: ${code}`);
    delete authorizationCode.code;

    // Return the authorization ID for the client confirmation
    res.success({ authorizationId: authorizationCode.authorizationId || authorizationCode.id });
  }
}
