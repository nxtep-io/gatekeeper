import * as Chance from "chance";
import * as moment from "moment";
import { ModelUpdateOptions, Query } from "mongoose";
import { BaseModel, BaseSchema, Model } from "ts-framework-mongo";
import MainDatabase from "../../MainDatabase";
import { PhoneAuthorizationCodeSchema } from "./schema";

@Model("phoneAuthorizationCode")
export class PhoneAuthorizationCodeModel extends BaseModel {
  /**
   * The Phone Authorization Code schema definition.
   */
  static Schema: BaseSchema = PhoneAuthorizationCodeSchema;

  /**
   * Revokes Authorization Codes based on specified conditions.
   *
   * @param conditions
   * @param options
   */
  public static revoke(conditions: Object, options: ModelUpdateOptions): Query<any> {
    const now = new Date();
    return this.update(
      { ...conditions, expires: { $gt: now } },
      {
        $set: { expires: now }
      },
      options
    );
  }

  /**
   * Generates a new Authorization Code and stores it in the database.
   *
   * @param phone The full international phone number
   */
  public static async generateCode(phone: string, user, client) {
    const chance = new Chance();

    // TODO: Move this to config
    const expires = moment()
      .add(30, "minutes")
      .toDate();

    // Generate new code and store it in database.
    const code = await this.create({
      phone,
      expires,
      user: user.id || user._id || user,
      client: client.id || client._id || client,
      code: chance.hash({ casing: "upper", length: 8 })
    });

    return code;
  }

  /**
   * Verify a valid Authorization Code.
   *
   * @param authorizationId The authorization id to holded by the client
   * @param authorizationCode The authorization code sent to the user safely
   * @param user The user ID or instancem for safety reasons
   */
  public static async verifyCode(
    authorizationId: string,
    authorizationCode: string,
    user
  ): Promise<false | PhoneAuthorizationCodeModel> {
    const code = await this.findOneAndUpdate(
      {
        _id: authorizationId,
        code: authorizationCode,
        user: user.id || user._id || user,
        expires: { $gt: new Date() },
        verifiedAt: { $exists: false }
      },
      { $set: { verifiedAt: new Date() } },
      { new: true }
    );

    if (code) {
      return code;
    }

    return false;
  }

  /**
   * Converts the token instance to a plain object.
   *
   * @returns {Object}
   */
  public toJSON(): Object {
    const obj = super.toJSON();
    if (obj.user && obj.user.toJSON) {
      obj.user = obj.user.toJSON();
    }
    if (obj.client && obj.client.toJSON) {
      obj.client = obj.client.toJSON();
    }
    return obj;
  }
}

export default MainDatabase.model(PhoneAuthorizationCodeModel);
