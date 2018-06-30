import { BaseModel, Model } from 'ts-framework-mongo';
import { SettingsSchema } from './schema';
import MainDatabase from './../../MainDatabase';

@Model('settings')
export class SettingsModel extends BaseModel {
  /**
   * The Settings schema definition.
   */
  static Schema = SettingsSchema;

  /**
   * Converts the settings instance to a plain object.
   *
   * @returns {Object}
   */
  public toJSON(): Object {
    const obj = super.toJSON();
    if (obj.createdBy) {
      obj.createdBy = obj.createdBy.toJSON ? obj.createdBy.toJSON() : obj.createdBy;
    }
    return obj;
  }
}

export default MainDatabase.model(SettingsModel);
