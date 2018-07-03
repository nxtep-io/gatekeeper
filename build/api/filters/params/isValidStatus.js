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
 * Checks a User status param.
 *
 * @param [optional] Defines if the status param is optional. Deafults to true.
 */
function isValidUserStatus(optional = true) {
    return ts_framework_validation_1.default.middleware("status", (status) => __awaiter(this, void 0, void 0, function* () {
        if (status) {
            return Object.keys(models_1.UserStatus).includes(status);
        }
        return !status && optional;
    }));
}
exports.default = isValidUserStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNWYWxpZFN0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwaS9maWx0ZXJzL3BhcmFtcy9pc1ZhbGlkU3RhdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxRUFBK0M7QUFDL0MseUNBQTBDO0FBRTFDOzs7O0dBSUc7QUFDSCwyQkFBMEMsV0FBb0IsSUFBSTtJQUNoRSxPQUFPLGlDQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFNLE1BQU0sRUFBQyxFQUFFO1FBQ2xELElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakQ7UUFDRCxPQUFPLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQztJQUM3QixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVBELG9DQU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZhbGlkYXRlIGZyb20gXCJ0cy1mcmFtZXdvcmstdmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgVXNlclN0YXR1cyB9IGZyb20gXCIuLi8uLi9tb2RlbHNcIjtcblxuLyoqXG4gKiBDaGVja3MgYSBVc2VyIHN0YXR1cyBwYXJhbS5cbiAqXG4gKiBAcGFyYW0gW29wdGlvbmFsXSBEZWZpbmVzIGlmIHRoZSBzdGF0dXMgcGFyYW0gaXMgb3B0aW9uYWwuIERlYWZ1bHRzIHRvIHRydWUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzVmFsaWRVc2VyU3RhdHVzKG9wdGlvbmFsOiBib29sZWFuID0gdHJ1ZSkge1xuICByZXR1cm4gVmFsaWRhdGUubWlkZGxld2FyZShcInN0YXR1c1wiLCBhc3luYyBzdGF0dXMgPT4ge1xuICAgIGlmIChzdGF0dXMpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhVc2VyU3RhdHVzKS5pbmNsdWRlcyhzdGF0dXMpO1xuICAgIH1cbiAgICByZXR1cm4gIXN0YXR1cyAmJiBvcHRpb25hbDtcbiAgfSk7XG59XG4iXX0=