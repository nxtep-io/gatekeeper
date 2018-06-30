import { HttpCode, HttpError } from "ts-framework";
import { UserRole } from "../../models/user";

/**
 * Ensures the user has a Root role.
 *
 * @param req The express request
 * @param res The express response
 * @param next The express next middleware in chain
 */
export default async (req, res, next) => {
  if (req.user && req.user.role === UserRole.USER) {
    next();
  } else {
    throw new HttpError('Forbidden: user role should not be "root"', HttpCode.Client.FORBIDDEN);
  }
};
