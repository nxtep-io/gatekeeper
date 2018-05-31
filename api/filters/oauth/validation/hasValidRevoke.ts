import { HttpError, HttpCode } from 'ts-framework';
import { Types } from 'mongoose';

/**
 * Checks if param is has a valid but optional access token.
 * 
 * @param {String} accessToken The param to be validated
 */
export default async function hasValidRevoke(req, res, next) {
  const accessToken = req.param('accessToken');

  if (accessToken && !accessToken.length) {
    throw new HttpError('The access token provided is not valid', HttpCode.Client.BAD_REQUEST);
  }

  req.query.accessToken = accessToken;
  next();
}
