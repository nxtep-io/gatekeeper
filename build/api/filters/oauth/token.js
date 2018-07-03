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
const models_1 = require("../../models");
/**
 * The OAuth 2.0 authentication middleware.
 *
 * @param req The express request
 * @param res The express response
 * @param next The express next middleware in chain
 */
function token(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return req.app.oauth.authenticate()(req, res, () => __awaiter(this, void 0, void 0, function* () {
            if (res.locals.oauth && res.locals.oauth.token) {
                // Go on with the request as soon as the user is available
                const user = res.locals.oauth.token.user;
                req.user = yield models_1.User.findOne(user.id || user._id);
                next();
                // Asynchronously check for user agent information in token
                if (!res.locals.oauth.token.userAgent || !res.locals.oauth.token.userAgent.ip) {
                    try {
                        // Update user agent in the database
                        const ua = yield models_1.OAuthAccessToken.updateUserAgent(res.locals.oauth.token.accessToken, req.clientIp, req.useragent);
                    }
                    catch (error) {
                        req.logger.error(error);
                    }
                }
            }
            else {
                return res.error(new ts_framework_1.HttpError("Credentials missing or invalid", ts_framework_1.HttpCode.Client.UNAUTHORIZED, { code: "UNAUTHORIZED" }));
            }
        }));
    });
}
exports.default = token;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcGkvZmlsdGVycy9vYXV0aC90b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQW1EO0FBQ25ELHlDQUFnRTtBQUVoRTs7Ozs7O0dBTUc7QUFDSCxlQUFvQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7O1FBQ2hELE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFTLEVBQUU7WUFDdkQsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQzlDLDBEQUEwRDtnQkFDMUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDekMsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLGFBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25ELElBQUksRUFBRSxDQUFDO2dCQUVQLDJEQUEyRDtnQkFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtvQkFDN0UsSUFBSTt3QkFDRixvQ0FBb0M7d0JBQ3BDLE1BQU0sRUFBRSxHQUFHLE1BQU0seUJBQWdCLENBQUMsZUFBZSxDQUMvQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUNsQyxHQUFHLENBQUMsUUFBUSxFQUNaLEdBQUcsQ0FBQyxTQUFTLENBQ2QsQ0FBQztxQkFDSDtvQkFBQyxPQUFPLEtBQUssRUFBRTt3QkFDZCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDekI7aUJBQ0Y7YUFDRjtpQkFBTTtnQkFDTCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQ2QsSUFBSSx3QkFBUyxDQUFDLGdDQUFnQyxFQUFFLHVCQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUN4RyxDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUFBO0FBM0JELHdCQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDb2RlLCBIdHRwRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrXCI7XG5pbXBvcnQgeyBPQXV0aEFjY2Vzc1Rva2VuLCBVc2VyLCBVc2VyUm9sZSB9IGZyb20gXCIuLi8uLi9tb2RlbHNcIjtcblxuLyoqXG4gKiBUaGUgT0F1dGggMi4wIGF1dGhlbnRpY2F0aW9uIG1pZGRsZXdhcmUuXG4gKlxuICogQHBhcmFtIHJlcSBUaGUgZXhwcmVzcyByZXF1ZXN0XG4gKiBAcGFyYW0gcmVzIFRoZSBleHByZXNzIHJlc3BvbnNlXG4gKiBAcGFyYW0gbmV4dCBUaGUgZXhwcmVzcyBuZXh0IG1pZGRsZXdhcmUgaW4gY2hhaW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gdG9rZW4ocmVxLCByZXMsIG5leHQpIHtcbiAgcmV0dXJuIHJlcS5hcHAub2F1dGguYXV0aGVudGljYXRlKCkocmVxLCByZXMsIGFzeW5jICgpID0+IHtcbiAgICBpZiAocmVzLmxvY2Fscy5vYXV0aCAmJiByZXMubG9jYWxzLm9hdXRoLnRva2VuKSB7XG4gICAgICAvLyBHbyBvbiB3aXRoIHRoZSByZXF1ZXN0IGFzIHNvb24gYXMgdGhlIHVzZXIgaXMgYXZhaWxhYmxlXG4gICAgICBjb25zdCB1c2VyID0gcmVzLmxvY2Fscy5vYXV0aC50b2tlbi51c2VyO1xuICAgICAgcmVxLnVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUodXNlci5pZCB8fCB1c2VyLl9pZCk7XG4gICAgICBuZXh0KCk7XG5cbiAgICAgIC8vIEFzeW5jaHJvbm91c2x5IGNoZWNrIGZvciB1c2VyIGFnZW50IGluZm9ybWF0aW9uIGluIHRva2VuXG4gICAgICBpZiAoIXJlcy5sb2NhbHMub2F1dGgudG9rZW4udXNlckFnZW50IHx8ICFyZXMubG9jYWxzLm9hdXRoLnRva2VuLnVzZXJBZ2VudC5pcCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFVwZGF0ZSB1c2VyIGFnZW50IGluIHRoZSBkYXRhYmFzZVxuICAgICAgICAgIGNvbnN0IHVhID0gYXdhaXQgT0F1dGhBY2Nlc3NUb2tlbi51cGRhdGVVc2VyQWdlbnQoXG4gICAgICAgICAgICByZXMubG9jYWxzLm9hdXRoLnRva2VuLmFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgcmVxLmNsaWVudElwLFxuICAgICAgICAgICAgcmVxLnVzZXJhZ2VudFxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgcmVxLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcy5lcnJvcihcbiAgICAgICAgbmV3IEh0dHBFcnJvcihcIkNyZWRlbnRpYWxzIG1pc3Npbmcgb3IgaW52YWxpZFwiLCBIdHRwQ29kZS5DbGllbnQuVU5BVVRIT1JJWkVELCB7IGNvZGU6IFwiVU5BVVRIT1JJWkVEXCIgfSlcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==