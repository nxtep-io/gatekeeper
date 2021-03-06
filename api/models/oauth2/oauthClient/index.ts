import { BaseModel, BaseSchema, Model } from "ts-framework-mongo";
import MainDatabase from "../../../MainDatabase";
import { OAuthClientSchema, OAuthClientStatus } from "./schema";

export { OAuthClientStatus };

@Model("oauthClient")
export class OAuthClientModel extends BaseModel {
  /**
   * The OAuth Client schema definition.
   */
  static Schema: BaseSchema = OAuthClientSchema;

  /**
   * Converts the client instance to a plain object.
   *
   * @returns {Object}
   */
  public toJSON(): Object {
    const obj = super.toJSON();
    if (obj.clientSecret) {
      delete obj.clientSecret;
    }
    return obj;
  }
}

export default MainDatabase.model(OAuthClientModel) as any;
