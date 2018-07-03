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
const ts_framework_validation_1 = require("ts-framework-validation");
const models_1 = require("../../models");
/**
 * Checks a User role param.
 *
 * @param [optional] Defines if the role param is optional. Deafults to true.
 */
function isValidUserRole(optional = true) {
    return ts_framework_validation_1.default.middleware("role", (role) => __awaiter(this, void 0, void 0, function* () {
        if (role) {
            return Object.values(models_1.UserRole).includes(role);
        }
        return !role && optional;
    }));
}
exports.default = isValidUserRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNWYWxpZFJvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcGkvZmlsdGVycy9wYXJhbXMvaXNWYWxpZFJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFFQUErQztBQUMvQyx5Q0FBd0M7QUFFeEM7Ozs7R0FJRztBQUNILHlCQUF3QyxXQUFvQixJQUFJO0lBQzlELE9BQU8saUNBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQU0sSUFBSSxFQUFDLEVBQUU7UUFDOUMsSUFBSSxJQUFJLEVBQUU7WUFDUixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDO0lBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDO0FBUEQsa0NBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFsaWRhdGUgZnJvbSBcInRzLWZyYW1ld29yay12YWxpZGF0aW9uXCI7XG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gXCIuLi8uLi9tb2RlbHNcIjtcblxuLyoqXG4gKiBDaGVja3MgYSBVc2VyIHJvbGUgcGFyYW0uXG4gKlxuICogQHBhcmFtIFtvcHRpb25hbF0gRGVmaW5lcyBpZiB0aGUgcm9sZSBwYXJhbSBpcyBvcHRpb25hbC4gRGVhZnVsdHMgdG8gdHJ1ZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNWYWxpZFVzZXJSb2xlKG9wdGlvbmFsOiBib29sZWFuID0gdHJ1ZSkge1xuICByZXR1cm4gVmFsaWRhdGUubWlkZGxld2FyZShcInJvbGVcIiwgYXN5bmMgcm9sZSA9PiB7XG4gICAgaWYgKHJvbGUpIHtcbiAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKFVzZXJSb2xlKS5pbmNsdWRlcyhyb2xlKTtcbiAgICB9XG4gICAgcmV0dXJuICFyb2xlICYmIG9wdGlvbmFsO1xuICB9KTtcbn1cbiJdfQ==