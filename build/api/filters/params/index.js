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
const isValidRole_1 = require("./isValidRole");
const isValidStatus_1 = require("./isValidStatus");
exports.default = {
    /****************************************************************************************/
    /*     Default validators                                                               */
    /****************************************************************************************/
    isValidId: ts_framework_validation_1.default.middleware("id", ts_framework_validation_1.Params.isValidId),
    isValidName: ts_framework_validation_1.default.middleware("name", ts_framework_validation_1.Params.isValidName),
    isValidDescription: ts_framework_validation_1.default.middleware("description", ts_framework_validation_1.Params.isValidName),
    isValidEmail: ts_framework_validation_1.default.middleware("email", ts_framework_validation_1.Params.isValidEmail),
    isValidPhoneNumber: ts_framework_validation_1.default.middleware("phone", ts_framework_validation_1.Params.isValidPhoneNumber),
    isValidPassword: ts_framework_validation_1.default.middleware("password", ts_framework_validation_1.Params.isValidPassword),
    /****************************************************************************************/
    /*     Custom validators                                                                */
    /****************************************************************************************/
    /**
     * Checks a user token.
     *
     * TODO: Better logic, maybe uuid.v4() ?.
     */
    isValidToken: ts_framework_validation_1.default.middleware("token", (token) => __awaiter(this, void 0, void 0, function* () { return token && token.length >= 8; })),
    // tslint:disable-next-line:object-shorthand-properties-first
    isValidUserRole: isValidRole_1.default,
    // tslint:disable-next-line:object-shorthand-properties-first
    isValidUserStatus: isValidStatus_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcGkvZmlsdGVycy9wYXJhbXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFFQUEyRDtBQUMzRCwrQ0FBNEM7QUFDNUMsbURBQWdEO0FBRWhELGtCQUFlO0lBQ2IsMEZBQTBGO0lBQzFGLDBGQUEwRjtJQUMxRiwwRkFBMEY7SUFFMUYsU0FBUyxFQUFFLGlDQUFRLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxnQ0FBTSxDQUFDLFNBQVMsQ0FBQztJQUV0RCxXQUFXLEVBQUUsaUNBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLGdDQUFNLENBQUMsV0FBVyxDQUFDO0lBRTVELGtCQUFrQixFQUFFLGlDQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxnQ0FBTSxDQUFDLFdBQVcsQ0FBQztJQUUxRSxZQUFZLEVBQUUsaUNBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLGdDQUFNLENBQUMsWUFBWSxDQUFDO0lBRS9ELGtCQUFrQixFQUFFLGlDQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxnQ0FBTSxDQUFDLGtCQUFrQixDQUFDO0lBRTNFLGVBQWUsRUFBRSxpQ0FBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsZ0NBQU0sQ0FBQyxlQUFlLENBQUM7SUFFeEUsMEZBQTBGO0lBQzFGLDBGQUEwRjtJQUMxRiwwRkFBMEY7SUFFMUY7Ozs7T0FJRztJQUNILFlBQVksRUFBRSxpQ0FBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBTSxLQUFLLEVBQUMsRUFBRSxnREFBQyxPQUFBLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQSxHQUFBLENBQUM7SUFFckYsNkRBQTZEO0lBQzdELGVBQWUsRUFBZixxQkFBZTtJQUVmLDZEQUE2RDtJQUM3RCxpQkFBaUIsRUFBakIsdUJBQWlCO0NBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFsaWRhdGUsIHsgUGFyYW1zIH0gZnJvbSBcInRzLWZyYW1ld29yay12YWxpZGF0aW9uXCI7XG5pbXBvcnQgaXNWYWxpZFVzZXJSb2xlIGZyb20gXCIuL2lzVmFsaWRSb2xlXCI7XG5pbXBvcnQgaXNWYWxpZFVzZXJTdGF0dXMgZnJvbSBcIi4vaXNWYWxpZFN0YXR1c1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvKiAgICAgRGVmYXVsdCB2YWxpZGF0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgaXNWYWxpZElkOiBWYWxpZGF0ZS5taWRkbGV3YXJlKFwiaWRcIiwgUGFyYW1zLmlzVmFsaWRJZCksXG5cbiAgaXNWYWxpZE5hbWU6IFZhbGlkYXRlLm1pZGRsZXdhcmUoXCJuYW1lXCIsIFBhcmFtcy5pc1ZhbGlkTmFtZSksXG5cbiAgaXNWYWxpZERlc2NyaXB0aW9uOiBWYWxpZGF0ZS5taWRkbGV3YXJlKFwiZGVzY3JpcHRpb25cIiwgUGFyYW1zLmlzVmFsaWROYW1lKSxcblxuICBpc1ZhbGlkRW1haWw6IFZhbGlkYXRlLm1pZGRsZXdhcmUoXCJlbWFpbFwiLCBQYXJhbXMuaXNWYWxpZEVtYWlsKSxcblxuICBpc1ZhbGlkUGhvbmVOdW1iZXI6IFZhbGlkYXRlLm1pZGRsZXdhcmUoXCJwaG9uZVwiLCBQYXJhbXMuaXNWYWxpZFBob25lTnVtYmVyKSxcblxuICBpc1ZhbGlkUGFzc3dvcmQ6IFZhbGlkYXRlLm1pZGRsZXdhcmUoXCJwYXNzd29yZFwiLCBQYXJhbXMuaXNWYWxpZFBhc3N3b3JkKSxcblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLyogICAgIEN1c3RvbSB2YWxpZGF0b3JzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8qKlxuICAgKiBDaGVja3MgYSB1c2VyIHRva2VuLlxuICAgKlxuICAgKiBUT0RPOiBCZXR0ZXIgbG9naWMsIG1heWJlIHV1aWQudjQoKSA/LlxuICAgKi9cbiAgaXNWYWxpZFRva2VuOiBWYWxpZGF0ZS5taWRkbGV3YXJlKFwidG9rZW5cIiwgYXN5bmMgdG9rZW4gPT4gdG9rZW4gJiYgdG9rZW4ubGVuZ3RoID49IDgpLFxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpvYmplY3Qtc2hvcnRoYW5kLXByb3BlcnRpZXMtZmlyc3RcbiAgaXNWYWxpZFVzZXJSb2xlLFxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpvYmplY3Qtc2hvcnRoYW5kLXByb3BlcnRpZXMtZmlyc3RcbiAgaXNWYWxpZFVzZXJTdGF0dXNcbn07XG4iXX0=