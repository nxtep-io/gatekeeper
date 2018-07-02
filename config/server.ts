import SmsConfig from './sms';
import SmtpConfig from './smtp';
import OAuthConfig from './oauth';
import { OAuthClientJob, OAuthRootUserJob } from '../api/jobs';

export default {
  cors: true,
  userAgent: true,
  smtp: SmtpConfig,
  sms: SmsConfig,
  newrelic: process.env.NEW_RELIC_KEY,
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT as any || 3000,
  sentry: process.env.SENTRY_DSN ? { dsn: process.env.SENTRY_DSN } : undefined,
  startup: {
    pipeline: [
      /* Create the OAuth 2.0 clients for authentication */
      new OAuthClientJob({ clients: OAuthConfig.clients }),
      /* Create the root Admin user */
      new OAuthRootUserJob({ verbose: true, root: OAuthConfig.root }),
    ],
  },
};
