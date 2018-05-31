require('source-map-support').install();

// Initialize new relic if enabled
if (process.env.NEW_RELIC_KEY) {
  require('newrelic');
}

import MainServer from './api/MainServer';
import configs from './config/server';

const server = new MainServer(configs as any);

// Start listening for requests...
server.listen().catch((error) => {
  console.error(error);
  process.exit(1);
});
