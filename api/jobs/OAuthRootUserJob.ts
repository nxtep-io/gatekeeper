import { BaseJob, Logger } from "ts-framework";
import MainServer from "../MainServer";
import { User } from "../models";

export default class OAuthRootUserJob extends BaseJob {
  constructor(options = {}) {
    super("OAuthRootUserJob", options);
  }

  /**
   * Create the initial OAuth 2.0 root user instance.
   *
   * @param server The main server instance.
   */
  public async run(server: MainServer): Promise<void> {
    if ((await User.count({ where: { role: "root" } })) === 0) {
      Logger.debug(`OAuthRootUserJob: Database is empty, creating root user...`);
      await User.create({ role: "root", ...this.options.root });

      if (this.options.verbose) {
        Logger.info(
          "\n-------------------------------------------------------------\n" +
            "                                                               \n" +
            "              NOTICE: A root user was generated                \n" +
            "                                                               \n" +
            "                                                               \n" +
            `            Name:       ${this.options.root.name}             \n` +
            `            Email:      ${this.options.root.email}            \n` +
            `            Password:   ${this.options.root.password}         \n` +
            "                                                               \n" +
            "-------------------------------------------------------------"
        );
      }
    }
  }
}
