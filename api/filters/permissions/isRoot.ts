import { UserRole } from '../../models/user';
import { HttpError, HttpCode } from 'ts-framework';

/**
 * Ensures the user has a Root role.
 *
 * @param req The express request
 * @param res The express response
 * @param next The express next middleware in chain
 */
export default async (req, res, next) => {
  if (req.user && req.user.role === UserRole.ROOT) {
    // User client
    next();
  } else if (req.user && req.user.virtual && req.user.client && req.user.client.platform === 'api') {
    // API Client
    next();
  } else {
    throw new HttpError('Forbidden: user role should be "root"', HttpCode.Client.FORBIDDEN);
  }
};
