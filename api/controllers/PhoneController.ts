import * as Package from 'pjson';
import * as moment from 'moment';
import { Controller, Post, Get, HttpError, HttpCode, Logger } from 'ts-framework';
import { OAuth, Params } from '../filters';
import { User, PhoneAuthorizationCode } from '../models';
import { TextService } from '../services';

@Controller('/phone', [OAuth.token])
export default class OAuthPhoneController {

  /**
   * Generates a new Authorization ID and sends its Verification Code using 
   * a SMS gateway for verifying a phone number.
   * 
   * @param req The express request
   * @param res The express response
   */
  @Post('/authorize', [Params.isValidPhoneNumber])
  static async authorize(req, res) {
    const authorizationCode = await PhoneAuthorizationCode.generateCode(
      req.body.phone,
      req.user,
      res.locals.oauth.token.client,
    );

    // TODO: Get text template from config
    TextService.getInstance().send({
      to: req.body.phone,
      text: `Verification code for Gatekeeper: ${authorizationCode.code}`,
    });

    delete authorizationCode.code;

    // Return the authorization ID for the client confirmation
    res.success({ authorizationId: authorizationCode.authorizationId || authorizationCode.id });
  }

  /**
   * Verifies a phone number using a combination of the Authorization ID and its Verification Code.
   * 
   * @param req The express request
   * @param res The express response
   */
  @Post('/verify', [
    // TODO: Filter body to validate input
  ])
  static async verify(req, res) {
    const authorizationCode = await PhoneAuthorizationCode.verifyCode(
      req.body.authorizationId,
      req.body.authorizationCode,
      req.user,
    );

    if (authorizationCode) {
      await User.update({ _id: req.user.id }, {
        $push: {
          phones: {
            number: authorizationCode.phone,
            authorization: authorizationCode.id,
          }
        }
      });
      return res.success({ verified: true });
    }

    throw new HttpError('Invalid or expired authorization code', HttpCode.Client.FORBIDDEN);
  }
}
