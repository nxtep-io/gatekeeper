import * as Package from 'pjson';
import * as moment from 'moment';
import { Controller, Post, Get, HttpError, HttpCode, Logger } from 'ts-framework';
import { OAuth, Params } from '../filters';
import { OAuthAuthorizationCode } from '../models';

@Controller('/phone', [OAuth.token])
export default class OAuthPhoneController {
  @Post('/authorize', [Params.isValidPhoneNumber])
  static async authorize(req, res) {
    const authorizationCode = await OAuthAuthorizationCode.generateCode(req.user, res.locals.oauth.token.client);

    // TODO: Send code using SMS
    Logger.warn(`PHONE: Generated phone verification code: ${authorizationCode.code}`);
    delete authorizationCode.code;

    // Return the authorization ID for the client confirmation
    res.success({ authorizationId: authorizationCode.authorizationId || authorizationCode.id });
  }
}
