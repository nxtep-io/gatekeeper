import Config from './app.config';

export interface AppConfig {
  name: string;
}

export default {
  ...Config,
};
