import * as path from 'path';
import * as express from 'express';
import Server, { BaseJob, ServerOptions } from 'ts-framework';
import { Logger } from 'ts-framework-mongo';
import MainDatabase from './MainDatabase';
import { EmailService } from './services';
import { ImpersonateGrantType } from './helpers';

// Prepare the database instance as soon as possible to prevent clashes in
// model registration. We can connect to the real database later.
const logger = new Logger({ level: 'silly' });
const database = MainDatabase.getInstance({ logger });

export interface MainServerOptions extends ServerOptions {
  env?: string;
  smtp: {
    from: string;
    connectionUrl?: string;
  };
  newrelic?: string;
  socket: {
    redisUrl?: string,
  };
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
    app.use('/', express.static(path.join(__dirname, '../ui/dist')));

    super({
      logger,
      secret: 'PLEASE_CHANGE_ME',
      port: process.env.PORT as any || 3000,
      controllers: require('./controllers').default,
      oauth: {
        useErrorHandler: true,
        allowExtendedTokenAttributes: true,
        model: require('./models/oauth2/middleware').default,
        token: {
          allowExtendedTokenAttributes: true,
          extendedGrantTypes: {
            impersonate: ImpersonateGrantType,
          },
        },
      },
      ...otherOptions,
    } as MainServerOptions, app);

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
      this.logger.error('Unknown database error: ' + error.message, error);
      process.exit(-1);
      return;
    }

    // Initialize the singleton services
    if (this.config.smtp && this.config.smtp.connectionUrl) {
      EmailService.getInstance({ ...this.config.smtp });
    } else {
      // TODO: Crash the API for safety or log email sendings in console
      this.logger.warn(
        'MainServer: Error in startup, the email connection url is not available' +
        '. Set it using the SMTP_URL env variable.',
      );
      EmailService.getInstance({ from: 'example@company.com', ...this.config.smtp, });
    }

    // Run startup jobs
    try {
      await this.runStartupJobs();
    } catch (error) {
      this.logger.error('Unknown startup error: ' + error.message, error);
      process.exit(-1);
      return;
    }

    this.logger.info(`Server listening in port: ${this.config.port}`);
  }

  /** 
   * Execute all statup jobs in parallel.
   */
  protected async runStartupJobs() {
    const jobs = this.config.startup || {} as any;
    const pipeline = jobs.pipeline || [];

    if (pipeline.length) {
      this.logger.debug('Running startup pipeline', { jobs: pipeline.map(p => p.name || 'unknown') });
      await Promise.all(jobs.pipeline.map(job => job.run(this)));
      this.logger.debug('Successfully ran all startup jobs');
      return;
    }
  }
}
