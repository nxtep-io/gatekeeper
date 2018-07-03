import { BaseRequest, BaseResponse, Controller, HttpCode, HttpError, Post } from "ts-framework";

import Config from "../../config";
import { Params } from "../filters";
import { User } from "../models";
import { EmailService } from "../services";

@Controller("/users", [])
export default class PasswordController {
  @Post("/reset", [Params.isValidEmail])
  public static async resetPassword(req: BaseRequest, res: BaseResponse) {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      throw new HttpError("User not found", HttpCode.Client.NOT_FOUND);
    }

    const token = await user.generateSecretToken();
    const emailService = EmailService.getInstance();

    // Send an email with instructions
    await emailService.send({
      to: user.email,
      subject: Config.user.resetPassword.subject,
      locals: {
        title: "Recover your credentials",
        preview: "Here are the credentials you asked for in the Gatekeeper platform",
        body: `
        You requested a link to access the your account in the Gatekeeper plaftorm. <br/><br/>
        Please update your account with a brand new password clicking in the button below.`,
        button: {
          label: "Set a new password",
          url: Config.user.resetPassword.url.replace(new RegExp(":token", "ig"), token.secret)
        },
        section: {
          title: "",
          body: `
          If you did not ask for this credentials, ignore this e-mail or
          <a href="https://nxtep.io" style="color: dodgerblue">contact the support</a>.`
        }
      }
    });

    res.success({ email: true });
  }

  @Post("/password", [Params.isValidPassword, Params.isValidToken])
  public static async renewPassword(req: BaseRequest, res: BaseResponse) {
    const user = await User.getBySecretToken(req.body.token);

    if (!user) {
      throw new HttpError("Unauthorized: password reset token invalid or expired", HttpCode.Client.UNAUTHORIZED);
    }

    await user.clearSecretToken();
    await user.savePassword(req.body.password);
    return res.success({ reset: true });
  }
}
