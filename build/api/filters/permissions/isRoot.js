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
    if (req.user && req.user.role === user_1.UserRole.ROOT) {
        // User client
        next();
    }
    else if (req.user && req.user.virtual && req.user.client && req.user.client.platform === "api") {
        // API Client
        next();
    }
    else {
        throw new ts_framework_1.HttpError('Forbidden: user role should be "root"', ts_framework_1.HttpCode.Client.FORBIDDEN);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNSb290LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vYXBpL2ZpbHRlcnMvcGVybWlzc2lvbnMvaXNSb290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBbUQ7QUFDbkQsNENBQTZDO0FBRTdDOzs7Ozs7R0FNRztBQUNILGtCQUFlLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUN0QyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssZUFBUSxDQUFDLElBQUksRUFBRTtRQUMvQyxjQUFjO1FBQ2QsSUFBSSxFQUFFLENBQUM7S0FDUjtTQUFNLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1FBQ2hHLGFBQWE7UUFDYixJQUFJLEVBQUUsQ0FBQztLQUNSO1NBQU07UUFDTCxNQUFNLElBQUksd0JBQVMsQ0FBQyx1Q0FBdUMsRUFBRSx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN6RjtBQUNILENBQUMsQ0FBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENvZGUsIEh0dHBFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcbmltcG9ydCB7IFVzZXJSb2xlIH0gZnJvbSBcIi4uLy4uL21vZGVscy91c2VyXCI7XG5cbi8qKlxuICogRW5zdXJlcyB0aGUgdXNlciBoYXMgYSBSb290IHJvbGUuXG4gKlxuICogQHBhcmFtIHJlcSBUaGUgZXhwcmVzcyByZXF1ZXN0XG4gKiBAcGFyYW0gcmVzIFRoZSBleHByZXNzIHJlc3BvbnNlXG4gKiBAcGFyYW0gbmV4dCBUaGUgZXhwcmVzcyBuZXh0IG1pZGRsZXdhcmUgaW4gY2hhaW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGlmIChyZXEudXNlciAmJiByZXEudXNlci5yb2xlID09PSBVc2VyUm9sZS5ST09UKSB7XG4gICAgLy8gVXNlciBjbGllbnRcbiAgICBuZXh0KCk7XG4gIH0gZWxzZSBpZiAocmVxLnVzZXIgJiYgcmVxLnVzZXIudmlydHVhbCAmJiByZXEudXNlci5jbGllbnQgJiYgcmVxLnVzZXIuY2xpZW50LnBsYXRmb3JtID09PSBcImFwaVwiKSB7XG4gICAgLy8gQVBJIENsaWVudFxuICAgIG5leHQoKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgSHR0cEVycm9yKCdGb3JiaWRkZW46IHVzZXIgcm9sZSBzaG91bGQgYmUgXCJyb290XCInLCBIdHRwQ29kZS5DbGllbnQuRk9SQklEREVOKTtcbiAgfVxufTtcbiJdfQ==