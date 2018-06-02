import {
  Controller,
  Get, Post, Delete, Put,
  BaseRequest, BaseResponse,
  HttpError, HttpCode,
} from 'ts-framework';

import { OAuthAccessToken } from './../models';
import { OAuth, Permissions, Query, Params } from '../filters';

export const DEFAULT_LIMIT = 25;

@Controller('/tokens', [OAuth.token])
export default class OAuthAccessTokenController {

  @Get('/', [Permissions.isRoot, Query.pagination])
  public static async findAll(req: BaseRequest, res: BaseResponse) {
    const q: any = {};

    // Query for tokens from a specific user
    if (req.param('user')) {
      q.user = req.param('user');
    }

    // Perform parallel queries
    const [count, results] = await Promise.all([
      OAuthAccessToken.count(q),
      OAuthAccessToken
        .find(q, null, { 
          limit: DEFAULT_LIMIT, 
          sort: { createdAt: -1 },
          ...req.query.pagination
        })
        .populate('user')
        .populate('client')
    ]);

    // Set pagination headers and return results
    res.set('X-Data-Length', count);
    res.set('X-Data-Skip', req.query.skip || 0);
    res.set('X-Data-Limit', req.query.limit || DEFAULT_LIMIT);

    // Return the results
    res.success(results.map(token => {
      // TODO: Maybe show tokens for root users?
      delete token.acessToken;
      return token;
    }));
  }
}
