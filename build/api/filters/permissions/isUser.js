"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_framework_1 = require("ts-framework");
const user_1 = require("../../models/user");
/**
 * Ensures the user has a Root role.
 *
 * @param req The express request
 * @param res The express response
 * @param next The express next middleware in chain
 */
exports.default = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (req.user && req.user.role === user_1.UserRole.USER) {
        next();
    }
    else {
        throw new ts_framework_1.HttpError('Forbidden: user role should not be "root"', ts_framework_1.HttpCode.Client.FORBIDDEN);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNVc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vYXBpL2ZpbHRlcnMvcGVybWlzc2lvbnMvaXNVc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBbUQ7QUFDbkQsNENBQTZDO0FBRTdDOzs7Ozs7R0FNRztBQUNILGtCQUFlLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUN0QyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssZUFBUSxDQUFDLElBQUksRUFBRTtRQUMvQyxJQUFJLEVBQUUsQ0FBQztLQUNSO1NBQU07UUFDTCxNQUFNLElBQUksd0JBQVMsQ0FBQywyQ0FBMkMsRUFBRSx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM3RjtBQUNILENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENvZGUsIEh0dHBFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcbmltcG9ydCB7IFVzZXJSb2xlIH0gZnJvbSBcIi4uLy4uL21vZGVscy91c2VyXCI7XG5cbi8qKlxuICogRW5zdXJlcyB0aGUgdXNlciBoYXMgYSBSb290IHJvbGUuXG4gKlxuICogQHBhcmFtIHJlcSBUaGUgZXhwcmVzcyByZXF1ZXN0XG4gKiBAcGFyYW0gcmVzIFRoZSBleHByZXNzIHJlc3BvbnNlXG4gKiBAcGFyYW0gbmV4dCBUaGUgZXhwcmVzcyBuZXh0IG1pZGRsZXdhcmUgaW4gY2hhaW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGlmIChyZXEudXNlciAmJiByZXEudXNlci5yb2xlID09PSBVc2VyUm9sZS5VU0VSKSB7XG4gICAgbmV4dCgpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBIdHRwRXJyb3IoJ0ZvcmJpZGRlbjogdXNlciByb2xlIHNob3VsZCBub3QgYmUgXCJyb290XCInLCBIdHRwQ29kZS5DbGllbnQuRk9SQklEREVOKTtcbiAgfVxufTtcbiJdfQ==