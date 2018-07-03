import { BaseEntity, Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OAuthAccessToken } from "..";
import { genHash, genPassword } from "./helpers";

/**
 * TODO: Move to config
 */
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export enum UserRole {
  ROOT = "root",
  USER = "user"
}

@Entity(User.tableName)
export default class User extends BaseEntity {
  private static readonly tableName = "user";

  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  facebookId: string;

  @Column({ nullable: false })
  status: UserStatus;

  @Column({ nullable: false })
  role: UserRole;

  @Column({ nullable: false })
  passwordSalt: string;

  @Column({ nullable: false })
  passwordHash: string;

  @OneToMany(type => OAuthAccessToken, token => token.user)
  accessTokens: OAuthAccessToken;

  constructor(data: Partial<User> = {}) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.facebookId = data.facebookId;
    this.role = data.role || UserRole.USER;
    this.status = data.status || UserStatus.ACTIVE;

    // Private properties
    this.passwordHash = data.passwordHash;
    this.passwordSalt = data.passwordSalt;
    this.accessTokens = data.accessTokens;
  }

  /**
   * Validates if supplied password matches the currently saved one.
   *
   * @param {String} password
   *
   * @returns {Promise<any>}
   */
  public async validatePassword(password): Promise<boolean> {
    if (!password || !this.passwordHash || !this.passwordSalt || !this.passwordHash) {
      return false;
    }
    const newHash = await genHash(password, this.passwordSalt);
    return newHash === this.passwordHash;
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
    this.passwordSalt = salt;
    this.passwordHash = hash;
    return this.save();
  }

  /**
   * Converts the instance to a JSON to be returned from the public API.
   */
  public toJSON(): Partial<User> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      facebookId: this.facebookId,
      role: this.role,
      status: this.status
    };
  }
}
