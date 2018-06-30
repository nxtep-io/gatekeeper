import { BaseRequest, BaseResponse, Controller, Delete, Get, HttpCode, HttpError, Post, Put } from "ts-framework";

import { OAuth, Params, Permissions, Query } from "../filters";
import { Settings } from "./../models";

export const DEFAULT_LIMIT = 25;

@Controller("/settings", [])
export default class SerringsController {
  @Get("/", [OAuth.token, Permissions.isRoot, Query.pagination])
  public static async findAll(req: BaseRequest, res: BaseResponse) {
    // Perform parallel queries
    const [results, count] = await Promise.all([
      Settings.find({}, null, { limit: DEFAULT_LIMIT, ...req.query.pagination }),
      Settings.count({})
    ]);

    // Set pagination headers and return results
    res.set("X-Data-Length", count);
    res.set("X-Data-Skip", req.query.skip as number || 0);
    res.set("X-Data-Limit", req.query.limit as number || DEFAULT_LIMIT);

    // Return the results
    res.success(results);
  }

  // TODO: Add validations to parameters
  @Post("/", [OAuth.token, Permissions.isRoot])
  public static async create(req: BaseRequest, res: BaseResponse) {
    const setting = await Settings.create({
      key: req.body.key,
      value: req.body.value,
      createdBy: req.user
    });

    if (setting) {
      res.success(setting);
    } else {
      throw new HttpError("Could not create setting, unknown error", HttpCode.Server.INTERNAL_SERVER_ERROR, {
        setting
      });
    }
  }
}
