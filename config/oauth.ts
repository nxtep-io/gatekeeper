import * as uuid from 'uuid';

export default {
  grantTypes: [
    'password',
    'client_credentials',
  ],
  clients: [
    { platform: 'api', clientId: 'root', clientSecret: 'root' },
  ],
  root: {
    name: 'John Connor',
    email: 'gatekeeper@nxtep.io',
    password: uuid.v4(),
  },
};
