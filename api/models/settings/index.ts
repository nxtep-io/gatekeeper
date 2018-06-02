import { BaseModel, Model } from 'ts-framework-mongo';
import { SettingsSchema } from './schema';
import MainDatabase from './../../MainDatabase';


@Model('settings')
export class SettingsModel extends BaseModel {
  /**
   * The Settings schema definition.
   */
  static Schema = SettingsSchema;
}

export default MainDatabase.model(SettingsModel);
