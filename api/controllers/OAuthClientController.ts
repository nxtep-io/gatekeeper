import {
  Controller,
  Get, Post, Delete, Put,
  BaseRequest, BaseResponse,
  HttpError, HttpCode,
} from 'ts-framework';

import { OAuthClient, OAuthClientStatus } from './../models';
import { OAuth, Permissions, Query, Params } from '../filters';

export const DEFAULT_LIMIT = 25;

@Controller('/clients', [OAuth.token])
export default class OAuthClientController {

  @Get('/', [Permissions.isRoot, Query.pagination])
  public static async findAll(req: BaseRequest, res: BaseResponse) {
    const { status = OAuthClientStatus.ACTIVE } = req.query;
    const q = { status } as any;

    // Perform parallel queries
    const [results, count] = await Promise.all([
      OAuthClient.find(q, null, { limit: DEFAULT_LIMIT, ...req.query.pagination }),
      OAuthClient.count(q),
    ]);

    // Set pagination headers and return results
    res.set('X-Data-Length', count);
    res.set('X-Data-Skip', req.query.skip || 0);
    res.set('X-Data-Limit', req.query.limit || DEFAULT_LIMIT);

    // Return the results
    res.success(results);
  }

  @Get('/:id', [Permissions.isRoot, Params.isValidId])
  public static async findById(req: BaseRequest, res: BaseResponse) {
    const found = await OAuthClient.findOne({ _id: req.param('id') });
    if (found) {
      res.success(found);
    } else {
      throw new HttpError('OAuth Client not found', HttpCode.Client.NOT_FOUND);
    }
  }

  // TODO: Add validations to parameters
  @Post('/', [
    Permissions.isRoot,
  ])
  public static async create(req: BaseRequest, res: BaseResponse) {
    const client = await OAuthClient.create({
      platform: req.body.platform,
      clientId: req.body.clientId,
      clientSecret: req.body.clientSecret,
    });

    if (client) {
      res.success({ ...client.toJSON(), clientSecret: client.clientSecret });
    } else {
      throw new HttpError('Could not create OAuth Client, unknown error', HttpCode.Server.INTERNAL_SERVER_ERROR, { client });
    }
  }

  @Put('/:id', [Permissions.isRoot])
  public static async updateClient(req: BaseRequest, res: BaseResponse) {
    const changes = {} as any;
    const client = await OAuthClient.findOne({ _id: req.param('id') });

    if (!client) {
      throw new HttpError('OAuth Client not found', HttpCode.Client.NOT_FOUND);
    }

    if (req.body.clientSecret) {
      changes.clientSecret = req.body.clientSecret;
    }
    if (req.body.platform) {
      changes.platform = req.body.platform;
    }
    if (req.body.status) {
      changes.status = req.body.status;
    }

    res.success(
      await client.update({ $set: changes }, { runValidators: true, new: true }),
    );
  }

  @Delete('/:id', [Permissions.isRoot, Params.isValidId])
  public static async deleteClient(req: BaseRequest, res: BaseResponse) {
    let result;

    if (req.param('force')) {
      // Hard removal of the client, may lead to database corruption
      result = await OAuthClient.remove({ _id: req.param('id') });
    } else {
      // Soft removal of the client, safer method for disabling it
      result = await OAuthClient.findOneAndUpdate(
        { _id: req.param('id') },
        { $set: { status: OAuthClientStatus.INACTIVE } },
        { new: true },
      );
    }

    res.success(result);
  }
}
