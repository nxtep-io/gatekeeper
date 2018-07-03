import { BaseRequest, BaseResponse, Controller, Delete, Get, HttpCode, HttpError, Post, Put } from "ts-framework";

import { OAuth, Params, Permissions, Query } from "../filters";
import { User, UserRole, UserStatus } from "./../models";

export const DEFAULT_LIMIT = "25";

@Controller("/users", [])
export default class UserController {
  @Get("/", [OAuth.token, Permissions.isRoot, Query.pagination, Params.isValidUserRole(true)])
  public static async findAll(req: BaseRequest, res: BaseResponse) {
    const { role, status = UserStatus.ACTIVE } = req.query;
    const q = { status } as any;

    if (role) {
      q.role = role;
    }

    // Perform parallel queries
    // TODO: Pagination
    const [results, count]: [User[], any] = await User.findAndCount({
      where: q,
      skip: req.query.skip,
      take: req.query.limit
    });

    // Set pagination headers and return results
    res.set("X-Data-Length", count);
    res.set("X-Data-Skip", req.query.skip || "0");
    res.set("X-Data-Limit", req.query.limit || DEFAULT_LIMIT);

    // Return the results
    res.success(results);
  }

  @Get("/me", [OAuth.token])
  public static async current(req: BaseRequest, res: BaseResponse) {
    res.success(req.user);
  }

  @Get("/:id", [OAuth.token, Permissions.isRoot, Params.isValidId])
  public static async findById(req: BaseRequest, res: BaseResponse) {
    const found = await User.findOne(req.param("id"));
    if (found) {
      res.success(found);
    } else {
      throw new HttpError("User not found", HttpCode.Client.NOT_FOUND);
    }
  }

  // TODO: Add validations to parameters
  @Post("/", [
    Params.isValidEmail,
    Params.isValidName,
    Params.isValidPassword,
    Params.isValidUserRole(true),
    Params.isValidUserStatus(true)
  ])
  public static async create(req: BaseRequest, res: BaseResponse) {
    // TODO: Disable public user creation based on setting

    const user = await User.create({
      // Basic user info
      name: req.body.name,
      email: req.body.email,
      // The fields below should not be input by a simple user
      status: req.user && req.user.role === UserRole.ROOT ? req.body.status : UserStatus.ACTIVE,
      role: req.user && req.user.role === UserRole.ROOT ? req.body.role : UserRole.USER
    });

    if (user) {
      await user.savePassword(req.body.password);
      res.success(user);
    } else {
      throw new HttpError("Could not create user, unknown error", HttpCode.Server.INTERNAL_SERVER_ERROR, { user });
    }
  }

  @Put("/:id", [OAuth.token])
  public static async updateUser(req: BaseRequest, res: BaseResponse) {
    const changes = {} as any;
    const user = await User.findOne(req.param("id"));

    if (!user) {
      throw new HttpError("User not found", HttpCode.Client.NOT_FOUND);
    } else if (user.id !== req.user.id && req.user.role !== UserRole.ROOT) {
      throw new HttpError("Forbidden", HttpCode.Client.FORBIDDEN);
    }

    if (req.body.password) {
      await user.savePassword(req.body.password);
    }
    if (req.body.name) {
      changes.name = req.body.name;
    }

    // Only root users should change this stuff below
    if (req.user.role === UserRole.ROOT) {
      if (req.body.email) {
        changes.email = req.body.email;
      }
      if (req.body.role) {
        changes.role = req.body.role;
      }
      if (req.body.status) {
        changes.status = req.body.status;
      }
    }

    res.success(await User.update({ id: user.id }, { ...changes }));
  }

  @Delete("/:id", [OAuth.token, Permissions.isRoot, Params.isValidId])
  public static async deleteUser(req: BaseRequest, res: BaseResponse) {
    let result;

    if (req.param("force")) {
      // Hard removal of the user, may lead to database corruption
      result = await User.remove(req.param("id"));
    } else {
      // Soft removal of the user, safer method for disabling it
      result = await User.update({ id: req.param("id") }, { status: UserStatus.INACTIVE });
    }

    res.success(result);
  }
}
