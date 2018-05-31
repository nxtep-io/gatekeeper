import SmtpConfig from './smtp';
import { OAuthClientJob, OAuthRootUserJob } from '../api/jobs';

export default {
  cors: true,
  userAgent: true,
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT as any || 3000,
  newrelic: process.env.NEW_RELIC_KEY,
  smtp: SmtpConfig,
  sentry: process.env.SENTRY_DSN ? { dsn: process.env.SENTRY_DSN } : undefined,
  startup: {
    pipeline: [
      /* Create the OAuth 2.0 clients for authentication */
      new OAuthClientJob({
        clients: [
          { platform: 'api', clientId: 'root', clientSecret: 'root' },
        ],
      }),

      /* Create the root Admin user */
      new OAuthRootUserJob({
        verbose: true,
        root: {
          name: 'John Connor',
          email: 'gatekeeper@nxtep.io',
          password: 'ec23729f-2bf3-4d3d-ade9-fd6e80baea79',
        },
      }),
    ] as any[],
  },
};
