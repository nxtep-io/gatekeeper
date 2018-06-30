import { Logger, BaseJob } from 'ts-framework';
import { OAuthClient } from '../models';
import MainServer from '../MainServer';

export default class OAuthClientJob extends BaseJob {
  constructor(options = {}) {
    super('OAuthClientJob', options);
  }

  /**
   * Create the initial OAuth 2.0 client instances.
   *
   * @param server The main server instance.
   */
  public async run(server: MainServer): Promise<void> {
    if (await OAuthClient.count({}) === 0) {
      const count = (this.options.clients || []).length;
      Logger.debug('OAuthClientJob: Database is empty, creating initial OAuth 2.0 clients from seed', { count });

      // Prepare model instances for database insertion
      const models = this.options.clients.map(model => new OAuthClient(model));

      // Insert all in a single operation
      await OAuthClient.insertMany(models);
    }
  }
}
