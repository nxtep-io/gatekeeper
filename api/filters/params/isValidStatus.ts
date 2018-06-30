import Validate from "ts-framework-validation";
import { UserStatus } from "../../models";

/**
 * Checks a User status param.
 *
 * @param [optional] Defines if the status param is optional. Deafults to true.
 */
export default function isValidUserStatus(optional: boolean = true) {
  return Validate.middleware("status", async status => {
    if (status) {
      return Object.keys(UserStatus).includes(status);
    }
    return !status && optional;
  });
}
