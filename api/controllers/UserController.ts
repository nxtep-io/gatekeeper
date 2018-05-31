import {
  Controller,
  Get, Post, Delete, Put,
  BaseRequest, BaseResponse,
  HttpError, HttpCode,
} from 'ts-framework';

import { User, UserStatus } from './../models';
import { OAuth, Permissions, Query, Params } from '../filters';

@Controller('/users', [OAuth.token])
export default class UserController {

  @Get('/', [
    Permissions.isRoot,
    Query.pagination,
    Params.isValidUserRole(true),
  ])
  public static async findAll(req: BaseRequest, res: BaseResponse) {
    const { role, status = UserStatus.ACTIVE } = req.query;
    const q = { status } as any;

    if (role) {
      q.role = role;
    }

    res.success(await User.find(q, null, req.query.pagination));
  }

  @Get('/me', [])
  public static async current(req: BaseRequest, res: BaseResponse) {
    res.success(req.user);
  }

  @Get('/:id', [Permissions.isRoot, Params.isValidId])
  public static async findById(req: BaseRequest, res: BaseResponse) {
    const found = await User.findOne({ _id: req.param('id') });
    if (found) {
      res.success(found);
    } else {
      throw new HttpError('User not found', HttpCode.Client.NOT_FOUND);
    }
  }

  // TODO: Add validations to parameters
  @Post('/', [
    Permissions.isRoot,
    Params.isValidEmail,
    Params.isValidName,
    Params.isValidPassword,
    Params.isValidUserRole(),
    Params.isValidUserStatus(),
  ])
  public static async create(req: BaseRequest, res: BaseResponse) {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      status: req.body.status,
    });

    if (user) {
      res.success(user);
    } else {
      throw new HttpError('Could not create user, unknown error', HttpCode.Server.INTERNAL_SERVER_ERROR, { user });
    }
  }

  @Put('/:id', [Permissions.isRoot])
  public static async updateUser(req: BaseRequest, res: BaseResponse) {
    const changes = {} as any;
    const user = await User.findOne({ _id: req.param('id') });

    if (!user) {
      throw new HttpError('User not found', HttpCode.Client.NOT_FOUND);
    }

    if (req.body.password) {
      await user.savePassword(req.body.password);
    }

    if (req.body.name) {
      changes.name = req.body.name;
    }
    if (req.body.email) {
      changes.email = req.body.email;
    }
    if (req.body.role) {
      changes.role = req.body.role;
    }
    if (req.body.status) {
      changes.status = req.body.status;
    }

    res.success(
      await user.update({ $set: changes }, { runValidators: true, new: true }),
    );
  }

  @Delete('/:id', [Permissions.isRoot, Params.isValidId])
  public static async deleteUser(req: BaseRequest, res: BaseResponse) {
    let result;

    if (req.param('force')) {
      // Hard removal of the user, may lead to database corruption
      result = await User.remove({ _id: req.param('id') });
    } else {
      // Soft removal of the user, safer method for disabling it
      result = await User.findOneAndUpdate(
        { _id: req.param('id') },
        { $set: { status: UserStatus.INACTIVE } },
        { new: true },
      );
    }

    res.success(result);
  }
}
