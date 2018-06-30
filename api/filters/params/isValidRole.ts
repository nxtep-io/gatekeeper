import Validate from 'ts-framework-validation';
import { UserRole } from '../../models';

/**
 * Checks a User role param.
 *
 * @param [optional] Defines if the role param is optional. Deafults to true.
 */
export default function isValidUserRole(optional: boolean = true) {
  return Validate.middleware('role', async (role) => {
    if (role) {
      return Object.values(UserRole).includes(role);
    } else if (!role && optional) {
      return true;
    }
    return false;
  });
}
