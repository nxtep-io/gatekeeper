import * as util from 'util';
import { HttpError, HttpCode, BaseRequest, BaseResponse } from 'ts-framework';

/**
 * Creates a pagination object in the request query attribute.
 *
 * Defaults to:
 *   skip: 0
 *   limit: 25
 * 
 * @param req The express request
 * @param res The express response
 * @param next The express next middleware in chain
 */
export default async function pagination(req: BaseRequest, res: BaseResponse, next: () => void) {
  const [skip, limit] = [req.param('skip'), req.param('limit')];

  if (skip && isNaN(skip)) {
    throw new HttpError('The param "skip" should be a valid integer', HttpCode.Client.BAD_REQUEST);
  }

  if (limit && isNaN(skip)) {
    throw new HttpError('The param "limit" should be a valid integer', HttpCode.Client.BAD_REQUEST);
  }

  req.query.pagination = {
    // TODO: Move defaults to config file
    skip: Number(req.query.skip) || 0,
    limit: Number(req.query.limit) || 25,
  };
  
  next();
}
