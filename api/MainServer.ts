import * as express from "express";
import * as path from "path";
import Server, { BaseJob, ServerOptions } from "ts-framework";
import { Logger } from "ts-framework-mongo";
import { TextGateway } from "ts-framework-notification";
import { ImpersonateGrantType } from "./helpers";
import MainDatabase from "./MainDatabase";
import { EmailService, TextService } from "./services";

// Prepare the database instance as soon as possible to prevent clashes in
// model registration. We can connect to the real database later.
const logger = new Logger({ level: "silly" });
const database = MainDatabase.getInstance({ logger });

export interface MainServerOptions extends ServerOptions {
  env?: string;
  smtp?: {
    from: string;
    connectionUrl?: string;
  };
  sms?: {
    from: string;
    gateway: TextGateway;
  };
  newrelic?: string;
  startup?: {
    pipeline: BaseJob[];
    [key: string]: any;
  };
}

export default class MainServer extends Server {
  database: MainDatabase;
  config: MainServerOptions;

  constructor(config: MainServerOptions) {
    const { ...otherOptions } = config;
    const app = express();

    // Setup priority routes, before controller router
    app.get("/", (req, res) => res.redirect("/status"));

    // handle every other route with index.html, which will contain
    // a script tag to your application's JavaScript file(s).
    app.get("/ui/*", (request, response) => {
      response.sendFile(path.resolve(__dirname, "../ui/dist/index.html"));
    });

    super(
      {
        logger,
        // TODO: Move this to the config files
        secret: "PLEASE_CHANGE_ME",
        port: (process.env.PORT as any) || 3000,
        controllers: require("./controllers").default,
        oauth: {
          useErrorHandler: true,
          allowExtendedTokenAttributes: true,
          model: require("./models/oauth2/middleware").default,
          token: {
            allowExtendedTokenAttributes: true,
            extendedGrantTypes: {
              impersonate: ImpersonateGrantType
            }
          }
        },
        ...otherOptions
      } as MainServerOptions,
      app
    );

    this.database = database;
  }

  /**
   * Handles pre-startup routines, such as starting the database up.
   *
   * @returns {Promise<void>}
   */
  async onStartup(): Promise<void> {
    try {
      // Connect to database instance
      await this.database.connect();
    } catch (error) {
      this.logger.error("Unknown database error: " + error.message, error);
      process.exit(-1);
      return;
    }

    // Initialize the email service
    if (this.config.smtp && this.config.smtp.connectionUrl) {
      EmailService.getInstance({ ...this.config.smtp });
    } else {
      // TODO: Crash the API for safety or log email sendings in console
      this.logger.warn(
        "MainServer: The Email service connection url is not available" +
          ', set it using the SMTP_URL env variable or in the "config/smtp.ts" file'
      );
      EmailService.getInstance({ from: "example@company.com", ...this.config.smtp });
    }

    // Initialize the sms service
    if (this.config.sms) {
      TextService.getInstance({ ...this.config.sms });
    } else {
      // TODO: Crash the API for safety or log email sendings in console
      this.logger.warn('MainServer: The SMS gateway is unavailable, configure it using the "config/sms.ts" file');
      TextService.getInstance({ from: "", gateway: TextGateway.DEBUG });
    }

    // Run startup jobs
    try {
      await this.runStartupJobs();
    } catch (error) {
      this.logger.error("Unknown startup error: " + error.message, error);
      process.exit(-1);
      return;
    }

    this.logger.info(`Server listening in port: ${this.config.port}`);
  }

  /**
   * Execute all statup jobs in parallel.
   */
  protected async runStartupJobs() {
    const jobs = this.config.startup || ({} as any);
    const pipeline = jobs.pipeline || [];

    if (pipeline.length) {
      this.logger.debug("Running startup pipeline", { jobs: pipeline.map(p => p.name || "unknown") });
      await Promise.all(jobs.pipeline.map(job => job.run(this)));
      this.logger.debug("Successfully ran all startup jobs");
      return;
    }
  }
}
