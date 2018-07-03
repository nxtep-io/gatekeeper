import { HttpCode, HttpError } from "ts-framework";
import { OAuthAccessToken, User, UserRole } from "../../models";

/**
 * The OAuth 2.0 authentication middleware.
 *
 * @param req The express request
 * @param res The express response
 * @param next The express next middleware in chain
 */
export default async function token(req, res, next) {
  return req.app.oauth.authenticate()(req, res, async () => {
    if (res.locals.oauth && res.locals.oauth.token) {
      // Go on with the request as soon as the user is available
      const user = res.locals.oauth.token.user;
      req.user = await User.findOne(user.id || user._id);
      next();

      // Asynchronously check for user agent information in token
      if (!res.locals.oauth.token.userAgent || !res.locals.oauth.token.userAgent.ip) {
        try {
          // Update user agent in the database
          const ua = await OAuthAccessToken.updateUserAgent(
            res.locals.oauth.token.accessToken,
            req.clientIp,
            req.useragent
          );
        } catch (error) {
          req.logger.error(error);
        }
      }
    } else {
      return res.error(
        new HttpError("Credentials missing or invalid", HttpCode.Client.UNAUTHORIZED, { code: "UNAUTHORIZED" })
      );
    }
  });
}
