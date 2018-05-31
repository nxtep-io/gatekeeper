import Server, { BaseJob, ServerOptions } from 'ts-framework';
import { Logger } from 'ts-framework-mongo';
import MainDatabase from './MainDatabase';
import { EmailService } from './services';

// Prepare the database instance as soon as possible to prevent clashes in
// model registration. We can connect to the real database later.
const logger = new Logger({ level: 'silly' });
const database = MainDatabase.getInstance({ logger });

export interface MainServerOptions extends ServerOptions {
  env?: string;
  smtpUrl?: string;
  cacheUrl?: string;
  queueUrl?: string;
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

  constructor(options: MainServerOptions) {
    const { ...otherOptions } = options;

    super({
      logger,
      secret: 'PLEASE_CHANGE_ME',
      port: process.env.PORT as any || 3000,
      controllers: require('./controllers').default,
      oauth: {
        useErrorHandler: true,
        allowExtendedTokenAttributes: true,
        model: require('./models/oauth2/middleware').default,
        token: { allowExtendedTokenAttributes: true },
      },
      ...otherOptions,
    } as any);

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

    // Initialize server singleton services
    EmailService.getInstance({ connectionUrl: this.config.smtpUrl });

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
