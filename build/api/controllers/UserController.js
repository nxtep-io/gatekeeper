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
const models_1 = require("./../models");
exports.DEFAULT_LIMIT = "25";
let UserController = class UserController {
    static findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role, status = models_1.UserStatus.ACTIVE } = req.query;
            const q = { status };
            if (role) {
                q.role = role;
            }
            // Perform parallel queries
            // TODO: Pagination
            const [results, count] = yield models_1.User.findAndCount({
                where: q,
                skip: req.query.skip,
                take: req.query.limit,
            });
            // Set pagination headers and return results
            res.set("X-Data-Length", count);
            res.set("X-Data-Skip", req.query.skip || "0");
            res.set("X-Data-Limit", req.query.limit || exports.DEFAULT_LIMIT);
            // Return the results
            res.success(results);
        });
    }
    static current(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.success(req.user);
        });
    }
    static findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield models_1.User.findOne(req.param("id"));
            if (found) {
                res.success(found);
            }
            else {
                throw new ts_framework_1.HttpError("User not found", ts_framework_1.HttpCode.Client.NOT_FOUND);
            }
        });
    }
    // TODO: Add validations to parameters
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Disable public user creation based on setting
            const user = yield models_1.User.create({
                // Basic user info
                name: req.body.name,
                email: req.body.email,
                // The fields below should not be input by a simple user
                status: req.user && req.user.role === models_1.UserRole.ROOT ? req.body.status : models_1.UserStatus.ACTIVE,
                role: req.user && req.user.role === models_1.UserRole.ROOT ? req.body.role : models_1.UserRole.USER
            });
            if (user) {
                yield user.savePassword(req.body.password);
                res.success(user);
            }
            else {
                throw new ts_framework_1.HttpError("Could not create user, unknown error", ts_framework_1.HttpCode.Server.INTERNAL_SERVER_ERROR, { user });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const changes = {};
            const user = yield models_1.User.findOne(req.param("id"));
            if (!user) {
                throw new ts_framework_1.HttpError("User not found", ts_framework_1.HttpCode.Client.NOT_FOUND);
            }
            else if (user.id !== req.user.id && req.user.role !== models_1.UserRole.ROOT) {
                throw new ts_framework_1.HttpError("Forbidden", ts_framework_1.HttpCode.Client.FORBIDDEN);
            }
            if (req.body.password) {
                yield user.savePassword(req.body.password);
            }
            if (req.body.name) {
                changes.name = req.body.name;
            }
            // Only root users should change this stuff below
            if (req.user.role === models_1.UserRole.ROOT) {
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
            res.success(yield models_1.User.update({ id: user.id }, Object.assign({}, changes)));
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            if (req.param("force")) {
                // Hard removal of the user, may lead to database corruption
                result = yield models_1.User.remove(req.param("id"));
            }
            else {
                // Soft removal of the user, safer method for disabling it
                result = yield models_1.User.update({ id: req.param("id") }, { status: models_1.UserStatus.INACTIVE });
            }
            res.success(result);
        });
    }
};
__decorate([
    ts_framework_1.Get("/", [filters_1.OAuth.token, filters_1.Permissions.isRoot, filters_1.Query.pagination, filters_1.Params.isValidUserRole(true)]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController, "findAll", null);
__decorate([
    ts_framework_1.Get("/me", [filters_1.OAuth.token]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController, "current", null);
__decorate([
    ts_framework_1.Get("/:id", [filters_1.OAuth.token, filters_1.Permissions.isRoot, filters_1.Params.isValidId]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController, "findById", null);
__decorate([
    ts_framework_1.Post("/", [
        filters_1.Params.isValidEmail,
        filters_1.Params.isValidName,
        filters_1.Params.isValidPassword,
        filters_1.Params.isValidUserRole(true),
        filters_1.Params.isValidUserStatus(true)
    ]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController, "create", null);
__decorate([
    ts_framework_1.Put("/:id", [filters_1.OAuth.token]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController, "updateUser", null);
__decorate([
    ts_framework_1.Delete("/:id", [filters_1.OAuth.token, filters_1.Permissions.isRoot, filters_1.Params.isValidId]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController, "deleteUser", null);
UserController = __decorate([
    ts_framework_1.Controller("/users", [])
], UserController);
exports.default = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcGkvY29udHJvbGxlcnMvVXNlckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFrSDtBQUVsSCx3Q0FBK0Q7QUFDL0Qsd0NBQXlEO0FBRTVDLFFBQUEsYUFBYSxHQUFHLElBQUksQ0FBQztBQUdsQyxJQUFxQixjQUFjLEdBQW5DO0lBRVMsTUFBTSxDQUFPLE9BQU8sQ0FBQyxHQUFnQixFQUFFLEdBQWlCOztZQUM3RCxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBRyxtQkFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDdkQsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQVMsQ0FBQztZQUU1QixJQUFJLElBQUksRUFBRTtnQkFDUixDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNmO1lBRUQsMkJBQTJCO1lBQzNCLG1CQUFtQjtZQUNuQixNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxHQUFrQixNQUFNLGFBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQzlELEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUk7Z0JBQ3BCLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUs7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsNENBQTRDO1lBQzVDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLHFC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LHFCQUFXLENBQUMsTUFBTSxFQUFFLGdCQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7c0NBZ0JuRTtBQXhIa0IsY0FBYztJQURsQyx5QkFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7R0FDSixjQUFjLENBeUhsQztrQkF6SG9CLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlUmVxdWVzdCwgQmFzZVJlc3BvbnNlLCBDb250cm9sbGVyLCBEZWxldGUsIEdldCwgSHR0cENvZGUsIEh0dHBFcnJvciwgUG9zdCwgUHV0IH0gZnJvbSBcInRzLWZyYW1ld29ya1wiO1xuXG5pbXBvcnQgeyBPQXV0aCwgUGFyYW1zLCBQZXJtaXNzaW9ucywgUXVlcnkgfSBmcm9tIFwiLi4vZmlsdGVyc1wiO1xuaW1wb3J0IHsgVXNlciwgVXNlclJvbGUsIFVzZXJTdGF0dXMgfSBmcm9tIFwiLi8uLi9tb2RlbHNcIjtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElNSVQgPSBcIjI1XCI7XG5cbkBDb250cm9sbGVyKFwiL3VzZXJzXCIsIFtdKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNvbnRyb2xsZXIge1xuICBAR2V0KFwiL1wiLCBbT0F1dGgudG9rZW4sIFBlcm1pc3Npb25zLmlzUm9vdCwgUXVlcnkucGFnaW5hdGlvbiwgUGFyYW1zLmlzVmFsaWRVc2VyUm9sZSh0cnVlKV0pXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgZmluZEFsbChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkge1xuICAgIGNvbnN0IHsgcm9sZSwgc3RhdHVzID0gVXNlclN0YXR1cy5BQ1RJVkUgfSA9IHJlcS5xdWVyeTtcbiAgICBjb25zdCBxID0geyBzdGF0dXMgfSBhcyBhbnk7XG5cbiAgICBpZiAocm9sZSkge1xuICAgICAgcS5yb2xlID0gcm9sZTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIHBhcmFsbGVsIHF1ZXJpZXNcbiAgICAvLyBUT0RPOiBQYWdpbmF0aW9uXG4gICAgY29uc3QgW3Jlc3VsdHMsIGNvdW50XTogW1VzZXJbXSwgYW55XSA9IGF3YWl0IFVzZXIuZmluZEFuZENvdW50KHtcbiAgICAgIHdoZXJlOiBxLFxuICAgICAgc2tpcDogcmVxLnF1ZXJ5LnNraXAsXG4gICAgICB0YWtlOiByZXEucXVlcnkubGltaXQsXG4gICAgfSk7XG5cbiAgICAvLyBTZXQgcGFnaW5hdGlvbiBoZWFkZXJzIGFuZCByZXR1cm4gcmVzdWx0c1xuICAgIHJlcy5zZXQoXCJYLURhdGEtTGVuZ3RoXCIsIGNvdW50KTtcbiAgICByZXMuc2V0KFwiWC1EYXRhLVNraXBcIiwgcmVxLnF1ZXJ5LnNraXAgfHwgXCIwXCIpO1xuICAgIHJlcy5zZXQoXCJYLURhdGEtTGltaXRcIiwgcmVxLnF1ZXJ5LmxpbWl0IHx8IERFRkFVTFRfTElNSVQpO1xuXG4gICAgLy8gUmV0dXJuIHRoZSByZXN1bHRzXG4gICAgcmVzLnN1Y2Nlc3MocmVzdWx0cyk7XG4gIH1cblxuICBAR2V0KFwiL21lXCIsIFtPQXV0aC50b2tlbl0pXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgY3VycmVudChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkge1xuICAgIHJlcy5zdWNjZXNzKHJlcS51c2VyKTtcbiAgfVxuXG4gIEBHZXQoXCIvOmlkXCIsIFtPQXV0aC50b2tlbiwgUGVybWlzc2lvbnMuaXNSb290LCBQYXJhbXMuaXNWYWxpZElkXSlcbiAgcHVibGljIHN0YXRpYyBhc3luYyBmaW5kQnlJZChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkge1xuICAgIGNvbnN0IGZvdW5kID0gYXdhaXQgVXNlci5maW5kT25lKHJlcS5wYXJhbShcImlkXCIpKTtcbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIHJlcy5zdWNjZXNzKGZvdW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFcnJvcihcIlVzZXIgbm90IGZvdW5kXCIsIEh0dHBDb2RlLkNsaWVudC5OT1RfRk9VTkQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IEFkZCB2YWxpZGF0aW9ucyB0byBwYXJhbWV0ZXJzXG4gIEBQb3N0KFwiL1wiLCBbXG4gICAgUGFyYW1zLmlzVmFsaWRFbWFpbCxcbiAgICBQYXJhbXMuaXNWYWxpZE5hbWUsXG4gICAgUGFyYW1zLmlzVmFsaWRQYXNzd29yZCxcbiAgICBQYXJhbXMuaXNWYWxpZFVzZXJSb2xlKHRydWUpLFxuICAgIFBhcmFtcy5pc1ZhbGlkVXNlclN0YXR1cyh0cnVlKVxuICBdKVxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGNyZWF0ZShyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkge1xuICAgIC8vIFRPRE86IERpc2FibGUgcHVibGljIHVzZXIgY3JlYXRpb24gYmFzZWQgb24gc2V0dGluZ1xuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKHtcbiAgICAgIC8vIEJhc2ljIHVzZXIgaW5mb1xuICAgICAgbmFtZTogcmVxLmJvZHkubmFtZSxcbiAgICAgIGVtYWlsOiByZXEuYm9keS5lbWFpbCxcbiAgICAgIC8vIFRoZSBmaWVsZHMgYmVsb3cgc2hvdWxkIG5vdCBiZSBpbnB1dCBieSBhIHNpbXBsZSB1c2VyXG4gICAgICBzdGF0dXM6IHJlcS51c2VyICYmIHJlcS51c2VyLnJvbGUgPT09IFVzZXJSb2xlLlJPT1QgPyByZXEuYm9keS5zdGF0dXMgOiBVc2VyU3RhdHVzLkFDVElWRSxcbiAgICAgIHJvbGU6IHJlcS51c2VyICYmIHJlcS51c2VyLnJvbGUgPT09IFVzZXJSb2xlLlJPT1QgPyByZXEuYm9keS5yb2xlIDogVXNlclJvbGUuVVNFUlxuICAgIH0pO1xuXG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGF3YWl0IHVzZXIuc2F2ZVBhc3N3b3JkKHJlcS5ib2R5LnBhc3N3b3JkKTtcbiAgICAgIHJlcy5zdWNjZXNzKHVzZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKFwiQ291bGQgbm90IGNyZWF0ZSB1c2VyLCB1bmtub3duIGVycm9yXCIsIEh0dHBDb2RlLlNlcnZlci5JTlRFUk5BTF9TRVJWRVJfRVJST1IsIHsgdXNlciB9KTtcbiAgICB9XG4gIH1cblxuICBAUHV0KFwiLzppZFwiLCBbT0F1dGgudG9rZW5dKVxuICBwdWJsaWMgc3RhdGljIGFzeW5jIHVwZGF0ZVVzZXIocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UpIHtcbiAgICBjb25zdCBjaGFuZ2VzID0ge30gYXMgYW55O1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUocmVxLnBhcmFtKFwiaWRcIikpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKFwiVXNlciBub3QgZm91bmRcIiwgSHR0cENvZGUuQ2xpZW50Lk5PVF9GT1VORCk7XG4gICAgfSBlbHNlIGlmICh1c2VyLmlkICE9PSByZXEudXNlci5pZCAmJiByZXEudXNlci5yb2xlICE9PSBVc2VyUm9sZS5ST09UKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKFwiRm9yYmlkZGVuXCIsIEh0dHBDb2RlLkNsaWVudC5GT1JCSURERU4pO1xuICAgIH1cblxuICAgIGlmIChyZXEuYm9keS5wYXNzd29yZCkge1xuICAgICAgYXdhaXQgdXNlci5zYXZlUGFzc3dvcmQocmVxLmJvZHkucGFzc3dvcmQpO1xuICAgIH1cbiAgICBpZiAocmVxLmJvZHkubmFtZSkge1xuICAgICAgY2hhbmdlcy5uYW1lID0gcmVxLmJvZHkubmFtZTtcbiAgICB9XG5cbiAgICAvLyBPbmx5IHJvb3QgdXNlcnMgc2hvdWxkIGNoYW5nZSB0aGlzIHN0dWZmIGJlbG93XG4gICAgaWYgKHJlcS51c2VyLnJvbGUgPT09IFVzZXJSb2xlLlJPT1QpIHtcbiAgICAgIGlmIChyZXEuYm9keS5lbWFpbCkge1xuICAgICAgICBjaGFuZ2VzLmVtYWlsID0gcmVxLmJvZHkuZW1haWw7XG4gICAgICB9XG4gICAgICBpZiAocmVxLmJvZHkucm9sZSkge1xuICAgICAgICBjaGFuZ2VzLnJvbGUgPSByZXEuYm9keS5yb2xlO1xuICAgICAgfVxuICAgICAgaWYgKHJlcS5ib2R5LnN0YXR1cykge1xuICAgICAgICBjaGFuZ2VzLnN0YXR1cyA9IHJlcS5ib2R5LnN0YXR1cztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXMuc3VjY2Vzcyhhd2FpdCBVc2VyLnVwZGF0ZSh7IGlkOiB1c2VyLmlkIH0sIHsgLi4uY2hhbmdlcyB9KSk7XG4gIH1cblxuICBARGVsZXRlKFwiLzppZFwiLCBbT0F1dGgudG9rZW4sIFBlcm1pc3Npb25zLmlzUm9vdCwgUGFyYW1zLmlzVmFsaWRJZF0pXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgZGVsZXRlVXNlcihyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBpZiAocmVxLnBhcmFtKFwiZm9yY2VcIikpIHtcbiAgICAgIC8vIEhhcmQgcmVtb3ZhbCBvZiB0aGUgdXNlciwgbWF5IGxlYWQgdG8gZGF0YWJhc2UgY29ycnVwdGlvblxuICAgICAgcmVzdWx0ID0gYXdhaXQgVXNlci5yZW1vdmUocmVxLnBhcmFtKFwiaWRcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb2Z0IHJlbW92YWwgb2YgdGhlIHVzZXIsIHNhZmVyIG1ldGhvZCBmb3IgZGlzYWJsaW5nIGl0XG4gICAgICByZXN1bHQgPSBhd2FpdCBVc2VyLnVwZGF0ZShcbiAgICAgICAgeyBpZDogcmVxLnBhcmFtKFwiaWRcIikgfSxcbiAgICAgICAgeyBzdGF0dXM6IFVzZXJTdGF0dXMuSU5BQ1RJVkUgfSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmVzLnN1Y2Nlc3MocmVzdWx0KTtcbiAgfVxufVxuIl19