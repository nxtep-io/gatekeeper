import * as Package from 'pjson';
import { MongoDatabase, MongoDatabaseOptions, BaseModel } from 'ts-framework-mongo';

export default class MainDatabase extends MongoDatabase {
  static instance: MainDatabase;

  /**
   * Gets singleton instance for the Main database.
   *
   * @param {DatabaseOptions} [options]
   */
  public static getInstance(options?: MongoDatabaseOptions) {
    if (!MainDatabase.instance) {
      MainDatabase.instance = new MainDatabase({
        ...options,
        url: process.env.MONGO_URL || `mongodb://localhost:27017/${Package.name}`,
      });
    }
    return MainDatabase.instance;
  }

  /**
   * Registers or gets a model in the singleton database instance.
   *
   * @param {String|BaseModel} name The name of the model to be fetch, or a class to be registered.
   *
   * @returns {BaseModel}
   */
  public static model(name: any): BaseModel {
    return MainDatabase.getInstance().model(name);
  }
}
