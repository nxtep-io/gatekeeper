"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const filters_1 = require("../filters");
const models_1 = require("../models");
let OAuthController = class OAuthController {
    static revoke(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = { ok: false };
            if (req.query.accessToken) {
                // Revoke a single access token specified in the body
                // Always ensure the token being revoked belongs to current user
                response = yield models_1.OAuthAccessToken.revoke({
                    user: req.user._id,
                    accessToken: req.query.accessToken
                });
            }
            else {
                // Revoke all user's tokens in a single operation
                // Always ensure the token being revoked belongs to current user
                response = yield models_1.OAuthAccessToken.revoke({ user: req.user._id });
                // TODO: Handle cache for this case
            }
            // TODO: Remove all push notification tokens from user account
            if (!response.nModified) {
                throw new ts_framework_1.HttpError("No access tokens were found to revoke", ts_framework_1.HttpCode.Client.NOT_FOUND, {
                    revoked: false,
                    count: 0
                });
            }
            else {
                res.success({ revoked: true, count: response.nModified });
            }
        });
    }
};
__decorate([
    ts_framework_1.Post("/revoke", [filters_1.OAuth.token, filters_1.OAuth.hasValidRevoke]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthController, "revoke", null);
OAuthController = __decorate([
    ts_framework_1.Controller("/oauth", [])
], OAuthController);
exports.default = OAuthController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBpL2NvbnRyb2xsZXJzL09BdXRoQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQXFFO0FBQ3JFLHdDQUFtQztBQUNuQyxzQ0FBNkM7QUFHN0MsSUFBcUIsZUFBZSxHQUFwQztJQUVTLE1BQU0sQ0FBTyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUc7O1lBQ2pDLElBQUksUUFBUSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBUyxDQUFDO1lBRXBDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7Z0JBQ3pCLHFEQUFxRDtnQkFDckQsZ0VBQWdFO2dCQUNoRSxRQUFRLEdBQUcsTUFBTSx5QkFBZ0IsQ0FBQyxNQUFNLENBQUM7b0JBQ3ZDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ2xCLFdBQVcsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVc7aUJBQ25DLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLGlEQUFpRDtnQkFDakQsZ0VBQWdFO2dCQUNoRSxRQUFRLEdBQUcsTUFBTSx5QkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUVqRSxtQ0FBbUM7YUFDcEM7WUFFRCw4REFBOEQ7WUFDOUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSx3QkFBUyxDQUFDLHVDQUF1QyxFQUFFLHVCQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtvQkFDdEYsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsS0FBSyxFQUFFLENBQUM7aUJBQ1QsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2FBQzNEO1FBQ0gsQ0FBQztLQUFBO0NBQ0YsQ0FBQTtBQTVCQztJQURDLG1CQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsZUFBSyxDQUFDLEtBQUssRUFBRSxlQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7bUNBNEJwRDtBQTdCa0IsZUFBZTtJQURuQyx5QkFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7R0FDSixlQUFlLENBOEJuQztrQkE5Qm9CLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sbGVyLCBIdHRwQ29kZSwgSHR0cEVycm9yLCBQb3N0IH0gZnJvbSBcInRzLWZyYW1ld29ya1wiO1xuaW1wb3J0IHsgT0F1dGggfSBmcm9tIFwiLi4vZmlsdGVyc1wiO1xuaW1wb3J0IHsgT0F1dGhBY2Nlc3NUb2tlbiB9IGZyb20gXCIuLi9tb2RlbHNcIjtcblxuQENvbnRyb2xsZXIoXCIvb2F1dGhcIiwgW10pXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQXV0aENvbnRyb2xsZXIge1xuICBAUG9zdChcIi9yZXZva2VcIiwgW09BdXRoLnRva2VuLCBPQXV0aC5oYXNWYWxpZFJldm9rZV0pXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgcmV2b2tlKHJlcSwgcmVzKSB7XG4gICAgbGV0IHJlc3BvbnNlID0geyBvazogZmFsc2UgfSBhcyBhbnk7XG5cbiAgICBpZiAocmVxLnF1ZXJ5LmFjY2Vzc1Rva2VuKSB7XG4gICAgICAvLyBSZXZva2UgYSBzaW5nbGUgYWNjZXNzIHRva2VuIHNwZWNpZmllZCBpbiB0aGUgYm9keVxuICAgICAgLy8gQWx3YXlzIGVuc3VyZSB0aGUgdG9rZW4gYmVpbmcgcmV2b2tlZCBiZWxvbmdzIHRvIGN1cnJlbnQgdXNlclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCBPQXV0aEFjY2Vzc1Rva2VuLnJldm9rZSh7XG4gICAgICAgIHVzZXI6IHJlcS51c2VyLl9pZCxcbiAgICAgICAgYWNjZXNzVG9rZW46IHJlcS5xdWVyeS5hY2Nlc3NUb2tlblxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJldm9rZSBhbGwgdXNlcidzIHRva2VucyBpbiBhIHNpbmdsZSBvcGVyYXRpb25cbiAgICAgIC8vIEFsd2F5cyBlbnN1cmUgdGhlIHRva2VuIGJlaW5nIHJldm9rZWQgYmVsb25ncyB0byBjdXJyZW50IHVzZXJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgT0F1dGhBY2Nlc3NUb2tlbi5yZXZva2UoeyB1c2VyOiByZXEudXNlci5faWQgfSk7XG5cbiAgICAgIC8vIFRPRE86IEhhbmRsZSBjYWNoZSBmb3IgdGhpcyBjYXNlXG4gICAgfVxuXG4gICAgLy8gVE9ETzogUmVtb3ZlIGFsbCBwdXNoIG5vdGlmaWNhdGlvbiB0b2tlbnMgZnJvbSB1c2VyIGFjY291bnRcbiAgICBpZiAoIXJlc3BvbnNlLm5Nb2RpZmllZCkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcihcIk5vIGFjY2VzcyB0b2tlbnMgd2VyZSBmb3VuZCB0byByZXZva2VcIiwgSHR0cENvZGUuQ2xpZW50Lk5PVF9GT1VORCwge1xuICAgICAgICByZXZva2VkOiBmYWxzZSxcbiAgICAgICAgY291bnQ6IDBcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMuc3VjY2Vzcyh7IHJldm9rZWQ6IHRydWUsIGNvdW50OiByZXNwb25zZS5uTW9kaWZpZWQgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=