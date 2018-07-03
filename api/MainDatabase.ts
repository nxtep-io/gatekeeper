import { Logger } from "ts-framework";

import {
  Connection,
  createConnection,
  EntityManager,
  EntitySchema,
  getConnectionOptions,
  ObjectType,
  Repository
} from "typeorm";

import { EntityDatabase } from "ts-framework-sql";
import Config from "../config";
import * as Models from "./models";

export default class MainDatabase extends EntityDatabase {
  protected static readonly instance: MainDatabase = new MainDatabase({
    connectionOpts: {
      ...Config.database,
      entities: Object.values(Models)
    }
  } as any);

  /**
   * Gets the singleton database instance.
   */
  static getInstance(): any {
    return this.instance;
  }
}
