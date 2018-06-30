import Validate, { Params } from 'ts-framework-validation';
import isValidUserRole from './isValidRole';
import isValidUserStatus from './isValidStatus';
import { UserRole, UserStatus } from '../../models';

export default {
  /****************************************************************************************/
  /*     Default validators                                                               */
  /****************************************************************************************/

  isValidId: Validate.middleware('id', Params.isValidId),

  isValidName: Validate.middleware('name', Params.isValidName),

  isValidDescription: Validate.middleware('description', Params.isValidName),

  isValidEmail: Validate.middleware('email', Params.isValidEmail),

  isValidPassword: Validate.middleware('password', Params.isValidPassword),

  /****************************************************************************************/
  /*     Custom validators                                                                */
  /****************************************************************************************/

  /**
   * Checks a user token.
   *
   * TODO: Better logic, maybe uuid.v4() ?.
   */
  isValidToken: Validate.middleware('password', async token => token && token.length >= 8),

  // tslint:disable-next-line:object-shorthand-properties-first
  isValidUserRole,

  // tslint:disable-next-line:object-shorthand-properties-first
  isValidUserStatus,
};
