import { Controller, HttpCode, HttpError, Post } from "ts-framework";
import { OAuth } from "../filters";
import { OAuthAccessToken } from "../models";

@Controller("/oauth", [])
export default class OAuthController {
  @Post("/revoke", [OAuth.token, OAuth.hasValidRevoke])
  public static async revoke(req, res) {
    let response = { ok: false } as any;

    if (req.query.accessToken) {
      // Revoke a single access token specified in the body
      // Always ensure the token being revoked belongs to current user
      response = await OAuthAccessToken.revoke({
        user: req.user._id,
        accessToken: req.query.accessToken
      });
    } else {
      // Revoke all user's tokens in a single operation
      // Always ensure the token being revoked belongs to current user
      response = await OAuthAccessToken.revoke({ user: req.user._id }, { multi: true });

      // TODO: Handle cache for this case
    }

    // TODO: Remove all push notification tokens from user account
    if (!response.nModified) {
      throw new HttpError("No access tokens were found to revoke", HttpCode.Client.NOT_FOUND, {
        revoked: false,
        count: 0
      });
    } else {
      res.success({ revoked: true, count: response.nModified });
    }
  }
}
