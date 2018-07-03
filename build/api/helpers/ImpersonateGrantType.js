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
const Bluebird = require("bluebird");
const InvalidArgumentError = require("oauth2-server/lib/errors/invalid-argument-error");
const InvalidRequestError = require("oauth2-server/lib/errors/invalid-request-error");
const AbstractGrantType = require("oauth2-server/lib/grant-types/abstract-grant-type");
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
class ImpersonateGrantType extends AbstractGrantType {
    handle(request, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request) {
                throw new InvalidArgumentError("Missing parameter: `request`");
            }
            if (!client) {
                throw new InvalidArgumentError("Missing parameter: `client`");
            }
            if (!request.body.access_token) {
                throw new InvalidRequestError("Missing parameter: `access_token`");
            }
            if (!request.body.user_id) {
                throw new InvalidRequestError("Missing parameter: `user_id`");
            }
            // Gets user instance from database
            const userClient = yield this.getUser(request.body.access_token, request.body.user_id);
            return this.saveToken(userClient, client, undefined);
        });
    }
    /**
     * Gets the user instance to be impersonated, validating the impersonator permissions.
     *
     * @param accessToken The access token of the impersonator
     * @param userId The user id to be impersonated
     */
    getUser(accessToken, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Tries to get the impersonator user from database
            const oauth = yield models_1.OAuthAccessToken.findOne({
                where: { accessToken, expires: typeorm_1.MoreThan(new Date()) },
            });
            if (!oauth) {
                throw new InvalidRequestError("Unauthorized access token");
            }
            let user;
            const impersonator = yield models_1.User.findOne(oauth.user);
            if (!impersonator) {
                throw new InvalidRequestError("Unauthorized access token: impersonator not found");
            }
            if (impersonator.role === models_1.UserRole.ROOT) {
                // Impersonate any user using an Admin access token
                user = yield models_1.User.findOne(userId);
            }
            else {
                throw new InvalidRequestError(`Unauthorized user role: cannot use this Grant Type with profile="${impersonator.role}"`);
            }
            if (!user) {
                throw new InvalidRequestError(`Unauthorized user access: forbidden`);
            }
            else {
                return user;
            }
        });
    }
    saveToken(user, client, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            const fns = [
                this.validateScope(user, client, scope),
                this.generateAccessToken(client, user, scope),
                this.generateRefreshToken(client, user, scope),
                this.getAccessTokenExpiresAt(),
                this.getRefreshTokenExpiresAt()
            ];
            return Bluebird.all(fns)
                .bind(this)
                .spread(function (scope, accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt) {
                const token = {
                    accessToken,
                    accessTokenExpiresAt,
                    refreshToken,
                    refreshTokenExpiresAt,
                    scope
                };
                return this.model.saveToken(token, client, user);
            });
        });
    }
}
exports.default = ImpersonateGrantType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1wZXJzb25hdGVHcmFudFR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcGkvaGVscGVycy9JbXBlcnNvbmF0ZUdyYW50VHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLHdGQUF3RjtBQUN4RixzRkFBc0Y7QUFDdEYsdUZBQXVGO0FBRXZGLHFDQUFtQztBQUVuQyxzQ0FBNkQ7QUFFN0QsMEJBQTBDLFNBQVEsaUJBQWlCO0lBQ3BELE1BQU0sQ0FBQyxPQUFvQixFQUFFLE1BQU07O1lBQzlDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osTUFBTSxJQUFJLG9CQUFvQixDQUFDLDhCQUE4QixDQUFDLENBQUM7YUFDaEU7WUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBQy9EO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUM5QixNQUFNLElBQUksbUJBQW1CLENBQUMsbUNBQW1DLENBQUMsQ0FBQzthQUNwRTtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDekIsTUFBTSxJQUFJLG1CQUFtQixDQUFDLDhCQUE4QixDQUFDLENBQUM7YUFDL0Q7WUFFRCxtQ0FBbUM7WUFDbkMsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkYsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkQsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxPQUFPLENBQUMsV0FBbUIsRUFBRSxNQUFjOztZQUN0RCxtREFBbUQ7WUFDbkQsTUFBTSxLQUFLLEdBQUcsTUFBTSx5QkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQzNDLEtBQUssRUFBRSxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsa0JBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEVBQUU7YUFDckQsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixNQUFNLElBQUksbUJBQW1CLENBQUMsMkJBQTJCLENBQUMsQ0FBQzthQUM1RDtZQUVELElBQUksSUFBSSxDQUFDO1lBQ1QsTUFBTSxZQUFZLEdBQUcsTUFBTSxhQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVwRCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNqQixNQUFNLElBQUksbUJBQW1CLENBQUMsbURBQW1ELENBQUMsQ0FBQzthQUNwRjtZQUVELElBQUksWUFBWSxDQUFDLElBQUksS0FBSyxpQkFBUSxDQUFDLElBQUksRUFBRTtnQkFDdkMsbURBQW1EO2dCQUNuRCxJQUFJLEdBQUcsTUFBTSxhQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ25DO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxtQkFBbUIsQ0FDM0Isb0VBQW9FLFlBQVksQ0FBQyxJQUFJLEdBQUcsQ0FDekYsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxNQUFNLElBQUksbUJBQW1CLENBQUMscUNBQXFDLENBQUMsQ0FBQzthQUN0RTtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQztLQUFBO0lBRVksU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSzs7WUFDeEMsTUFBTSxHQUFHLEdBQUc7Z0JBQ1QsSUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDL0MsSUFBWSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDO2dCQUNyRCxJQUFZLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7Z0JBQ3RELElBQVksQ0FBQyx1QkFBdUIsRUFBRTtnQkFDdEMsSUFBWSxDQUFDLHdCQUF3QixFQUFFO2FBQ3pDLENBQUM7WUFFRixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2lCQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNWLE1BQU0sQ0FBQyxVQUFVLEtBQUssRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLHFCQUFxQjtnQkFDN0YsTUFBTSxLQUFLLEdBQUc7b0JBQ1osV0FBVztvQkFDWCxvQkFBb0I7b0JBQ3BCLFlBQVk7b0JBQ1oscUJBQXFCO29CQUNyQixLQUFLO2lCQUNOLENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0Y7QUFqRkQsdUNBaUZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQmx1ZWJpcmQgZnJvbSBcImJsdWViaXJkXCI7XG5pbXBvcnQgKiBhcyBJbnZhbGlkQXJndW1lbnRFcnJvciBmcm9tIFwib2F1dGgyLXNlcnZlci9saWIvZXJyb3JzL2ludmFsaWQtYXJndW1lbnQtZXJyb3JcIjtcbmltcG9ydCAqIGFzIEludmFsaWRSZXF1ZXN0RXJyb3IgZnJvbSBcIm9hdXRoMi1zZXJ2ZXIvbGliL2Vycm9ycy9pbnZhbGlkLXJlcXVlc3QtZXJyb3JcIjtcbmltcG9ydCAqIGFzIEFic3RyYWN0R3JhbnRUeXBlIGZyb20gXCJvYXV0aDItc2VydmVyL2xpYi9ncmFudC10eXBlcy9hYnN0cmFjdC1ncmFudC10eXBlXCI7XG5pbXBvcnQgeyBCYXNlUmVxdWVzdCB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcbmltcG9ydCB7IE1vcmVUaGFuIH0gZnJvbSBcInR5cGVvcm1cIjtcblxuaW1wb3J0IHsgT0F1dGhBY2Nlc3NUb2tlbiwgVXNlciwgVXNlclJvbGUgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltcGVyc29uYXRlR3JhbnRUeXBlIGV4dGVuZHMgQWJzdHJhY3RHcmFudFR5cGUge1xuICBwdWJsaWMgYXN5bmMgaGFuZGxlKHJlcXVlc3Q6IEJhc2VSZXF1ZXN0LCBjbGllbnQpIHtcbiAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkQXJndW1lbnRFcnJvcihcIk1pc3NpbmcgcGFyYW1ldGVyOiBgcmVxdWVzdGBcIik7XG4gICAgfVxuICAgIGlmICghY2xpZW50KSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZEFyZ3VtZW50RXJyb3IoXCJNaXNzaW5nIHBhcmFtZXRlcjogYGNsaWVudGBcIik7XG4gICAgfVxuICAgIGlmICghcmVxdWVzdC5ib2R5LmFjY2Vzc190b2tlbikge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRSZXF1ZXN0RXJyb3IoXCJNaXNzaW5nIHBhcmFtZXRlcjogYGFjY2Vzc190b2tlbmBcIik7XG4gICAgfVxuICAgIGlmICghcmVxdWVzdC5ib2R5LnVzZXJfaWQpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkUmVxdWVzdEVycm9yKFwiTWlzc2luZyBwYXJhbWV0ZXI6IGB1c2VyX2lkYFwiKTtcbiAgICB9XG5cbiAgICAvLyBHZXRzIHVzZXIgaW5zdGFuY2UgZnJvbSBkYXRhYmFzZVxuICAgIGNvbnN0IHVzZXJDbGllbnQgPSBhd2FpdCB0aGlzLmdldFVzZXIocmVxdWVzdC5ib2R5LmFjY2Vzc190b2tlbiwgcmVxdWVzdC5ib2R5LnVzZXJfaWQpO1xuICAgIHJldHVybiB0aGlzLnNhdmVUb2tlbih1c2VyQ2xpZW50LCBjbGllbnQsIHVuZGVmaW5lZCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdXNlciBpbnN0YW5jZSB0byBiZSBpbXBlcnNvbmF0ZWQsIHZhbGlkYXRpbmcgdGhlIGltcGVyc29uYXRvciBwZXJtaXNzaW9ucy5cbiAgICpcbiAgICogQHBhcmFtIGFjY2Vzc1Rva2VuIFRoZSBhY2Nlc3MgdG9rZW4gb2YgdGhlIGltcGVyc29uYXRvclxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSB1c2VyIGlkIHRvIGJlIGltcGVyc29uYXRlZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFVzZXIoYWNjZXNzVG9rZW46IHN0cmluZywgdXNlcklkOiBzdHJpbmcpIHtcbiAgICAvLyBUcmllcyB0byBnZXQgdGhlIGltcGVyc29uYXRvciB1c2VyIGZyb20gZGF0YWJhc2VcbiAgICBjb25zdCBvYXV0aCA9IGF3YWl0IE9BdXRoQWNjZXNzVG9rZW4uZmluZE9uZSh7IFxuICAgICAgd2hlcmU6IHthY2Nlc3NUb2tlbiwgZXhwaXJlczogTW9yZVRoYW4obmV3IERhdGUoKSkgfSxcbiAgICB9KTtcblxuICAgIGlmICghb2F1dGgpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkUmVxdWVzdEVycm9yKFwiVW5hdXRob3JpemVkIGFjY2VzcyB0b2tlblwiKTtcbiAgICB9XG5cbiAgICBsZXQgdXNlcjtcbiAgICBjb25zdCBpbXBlcnNvbmF0b3IgPSBhd2FpdCBVc2VyLmZpbmRPbmUob2F1dGgudXNlcik7XG5cbiAgICBpZiAoIWltcGVyc29uYXRvcikge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRSZXF1ZXN0RXJyb3IoXCJVbmF1dGhvcml6ZWQgYWNjZXNzIHRva2VuOiBpbXBlcnNvbmF0b3Igbm90IGZvdW5kXCIpO1xuICAgIH1cblxuICAgIGlmIChpbXBlcnNvbmF0b3Iucm9sZSA9PT0gVXNlclJvbGUuUk9PVCkge1xuICAgICAgLy8gSW1wZXJzb25hdGUgYW55IHVzZXIgdXNpbmcgYW4gQWRtaW4gYWNjZXNzIHRva2VuXG4gICAgICB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHVzZXJJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkUmVxdWVzdEVycm9yKFxuICAgICAgICBgVW5hdXRob3JpemVkIHVzZXIgcm9sZTogY2Fubm90IHVzZSB0aGlzIEdyYW50IFR5cGUgd2l0aCBwcm9maWxlPVwiJHtpbXBlcnNvbmF0b3Iucm9sZX1cImBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFJlcXVlc3RFcnJvcihgVW5hdXRob3JpemVkIHVzZXIgYWNjZXNzOiBmb3JiaWRkZW5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVzZXI7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNhdmVUb2tlbih1c2VyLCBjbGllbnQsIHNjb3BlKSB7XG4gICAgY29uc3QgZm5zID0gW1xuICAgICAgKHRoaXMgYXMgYW55KS52YWxpZGF0ZVNjb3BlKHVzZXIsIGNsaWVudCwgc2NvcGUpLFxuICAgICAgKHRoaXMgYXMgYW55KS5nZW5lcmF0ZUFjY2Vzc1Rva2VuKGNsaWVudCwgdXNlciwgc2NvcGUpLFxuICAgICAgKHRoaXMgYXMgYW55KS5nZW5lcmF0ZVJlZnJlc2hUb2tlbihjbGllbnQsIHVzZXIsIHNjb3BlKSxcbiAgICAgICh0aGlzIGFzIGFueSkuZ2V0QWNjZXNzVG9rZW5FeHBpcmVzQXQoKSxcbiAgICAgICh0aGlzIGFzIGFueSkuZ2V0UmVmcmVzaFRva2VuRXhwaXJlc0F0KClcbiAgICBdO1xuXG4gICAgcmV0dXJuIEJsdWViaXJkLmFsbChmbnMpXG4gICAgICAuYmluZCh0aGlzKVxuICAgICAgLnNwcmVhZChmdW5jdGlvbiAoc2NvcGUsIGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4sIGFjY2Vzc1Rva2VuRXhwaXJlc0F0LCByZWZyZXNoVG9rZW5FeHBpcmVzQXQpIHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSB7XG4gICAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmVzQXQsXG4gICAgICAgICAgcmVmcmVzaFRva2VuLFxuICAgICAgICAgIHJlZnJlc2hUb2tlbkV4cGlyZXNBdCxcbiAgICAgICAgICBzY29wZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5zYXZlVG9rZW4odG9rZW4sIGNsaWVudCwgdXNlcik7XG4gICAgICB9KTtcbiAgfVxufVxuIl19