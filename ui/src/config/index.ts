import Config from './app.config';
import WebServiceConfig from './ws.config';
import OAuthServiceConfig from './oauth.config';

export interface AppConfig {
  name: string;
  logo?: string;
  ws: {
    baseURL: string,
  };
  oauth: {
    baseURL: string,
    clientId: string,
    clientSecret: string,
  };
}

export default {
  ws: WebServiceConfig,
  oauth: OAuthServiceConfig,
  ...Config,
};
