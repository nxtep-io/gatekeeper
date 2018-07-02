import * as crypto from "crypto";
import * as moment from "moment";
import { BaseModel, Model } from "ts-framework-mongo";
import * as uuid from "uuid";
import MainDatabase from "./../../MainDatabase";
import { UserRole, UserSchema, UserStatus } from "./schema";

export { UserRole, UserStatus };

// TODO: Move this to a config file
const PASSWORD_SECRET_EXPIRES_IN_DAYS = 7;

export function genHash(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, new Buffer(salt, "hex"), 100000, 512, "sha512", (err, key) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(key.toString("hex"));
    });
  });
}

export function genPassword(password) {
  const salt = crypto.randomBytes(128).toString("hex");
  return genHash(password, salt).then(hash => ({ salt, hash }));
}

@Model("user")
export class UserModel extends BaseModel {
  /**
   * The User schema definition.
   */
  static Schema = UserSchema;

  /**
   * Create a new user instance.
   *
   * @param {Object} data The user information
   * @param {String} data.name The user name
   * @param {String} data.email The user email
   * @param {String} data.role The user role
   * @param {String} [data.password] The user password.
   */
  public static async create(data) {
    const { name, email, password, role } = data;

    // TODO: Ensure password or Social auth
    // TODO: Encrypt password information and ensure password min length
    const user = await super.create({ name, email, role });

    try {
      // Try to save password safely
      await user.savePassword(password);
    } catch (error) {
      // Remove user before continuing...
      await user.delete();
      throw error;
    }
    return user;
  }

  /**
   * Gets an User by a valid secret token.
   *
   * @param secretToken The password secret token
   */
  public static async getBySecretToken(secretToken: string) {
    return await this.findOne({
      "password.secret.token": secretToken,
      "password.secret.expiresAt": { $gt: new Date() }
    });
  }

  /**
   * Hashes and saves the user password.
   *
   * @param {String} password The new password
   *
   * @returns {Promise<any>}
   */
  protected async savePassword(password: string) {
    const { salt, hash } = await genPassword(password);
    this.password.salt = salt;
    this.password.hash = hash;
    return this.save();
  }

  /**
   * Validates if supplied password matches the currently saved one.
   *
   * @param {String} password
   *
   * @returns {Promise<any>}
   */
  public async validatePassword(password): Promise<boolean> {
    if (!password || !this.password || !this.password.salt || !this.password.hash) {
      return false;
    }
    return genHash(password, this.password.salt).then(newHash => newHash === this.password.hash);
  }

  /**
   * Generate a new secret token for a password reset request.
   */
  public async generateSecretToken(): Promise<{ secret: string; expiresAt: Date }> {
    const token = uuid.v4();
    const expiresAt = moment().add("days", PASSWORD_SECRET_EXPIRES_IN_DAYS);
    await this.update({ $set: { "password.secret": { token, expiresAt } } });
    return { secret: token, expiresAt: expiresAt.toDate() };
  }

  /**
   * Clears the user secret token.
   */
  public async clearSecretToken(): Promise<void> {
    return this.update({ $set: { "password.secret": {} } });
  }

  /**
   * Converts the user instance to a plain object.
   *
   * @returns {Object}
   */
  public toJSON(): Object {
    const obj = super.toJSON();
    if (obj.password) {
      delete obj.password;
    }
    return obj;
  }
}

export default MainDatabase.model(UserModel);
