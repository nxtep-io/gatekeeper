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
/**
 * Creates a pagination object in the request query attribute.
 *
 * Defaults to:
 *   skip: 0
 *   limit: 25
 *
 * @param req The express request
 * @param res The express response
 * @param next The express next middleware in chain
 */
function pagination(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const [skip, limit] = [req.param("skip"), req.param("limit")];
        if (skip && isNaN(skip)) {
            throw new ts_framework_1.HttpError('The param "skip" should be a valid integer', ts_framework_1.HttpCode.Client.BAD_REQUEST);
        }
        if (limit && isNaN(skip)) {
            throw new ts_framework_1.HttpError('The param "limit" should be a valid integer', ts_framework_1.HttpCode.Client.BAD_REQUEST);
        }
        req.query.pagination = {
            // TODO: Move defaults to config file
            skip: Number(req.query.skip) || 0,
            limit: Number(req.query.limit) || 25
        };
        next();
    });
}
exports.default = pagination;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwaS9maWx0ZXJzL3F1ZXJ5L3BhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUE4RTtBQUU5RTs7Ozs7Ozs7OztHQVVHO0FBQ0gsb0JBQXlDLEdBQWdCLEVBQUUsR0FBaUIsRUFBRSxJQUFnQjs7UUFDNUYsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRTlELElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixNQUFNLElBQUksd0JBQVMsQ0FBQyw0Q0FBNEMsRUFBRSx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNoRztRQUVELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4QixNQUFNLElBQUksd0JBQVMsQ0FBQyw2Q0FBNkMsRUFBRSx1QkFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNqRztRQUVELEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHO1lBQ3JCLHFDQUFxQztZQUNyQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNqQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtTQUNyQyxDQUFDO1FBRUYsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDO0NBQUE7QUFsQkQsNkJBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgSHR0cENvZGUsIEh0dHBFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgcGFnaW5hdGlvbiBvYmplY3QgaW4gdGhlIHJlcXVlc3QgcXVlcnkgYXR0cmlidXRlLlxuICpcbiAqIERlZmF1bHRzIHRvOlxuICogICBza2lwOiAwXG4gKiAgIGxpbWl0OiAyNVxuICpcbiAqIEBwYXJhbSByZXEgVGhlIGV4cHJlc3MgcmVxdWVzdFxuICogQHBhcmFtIHJlcyBUaGUgZXhwcmVzcyByZXNwb25zZVxuICogQHBhcmFtIG5leHQgVGhlIGV4cHJlc3MgbmV4dCBtaWRkbGV3YXJlIGluIGNoYWluXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHBhZ2luYXRpb24ocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6ICgpID0+IHZvaWQpIHtcbiAgY29uc3QgW3NraXAsIGxpbWl0XSA9IFtyZXEucGFyYW0oXCJza2lwXCIpLCByZXEucGFyYW0oXCJsaW1pdFwiKV07XG5cbiAgaWYgKHNraXAgJiYgaXNOYU4oc2tpcCkpIHtcbiAgICB0aHJvdyBuZXcgSHR0cEVycm9yKCdUaGUgcGFyYW0gXCJza2lwXCIgc2hvdWxkIGJlIGEgdmFsaWQgaW50ZWdlcicsIEh0dHBDb2RlLkNsaWVudC5CQURfUkVRVUVTVCk7XG4gIH1cblxuICBpZiAobGltaXQgJiYgaXNOYU4oc2tpcCkpIHtcbiAgICB0aHJvdyBuZXcgSHR0cEVycm9yKCdUaGUgcGFyYW0gXCJsaW1pdFwiIHNob3VsZCBiZSBhIHZhbGlkIGludGVnZXInLCBIdHRwQ29kZS5DbGllbnQuQkFEX1JFUVVFU1QpO1xuICB9XG5cbiAgcmVxLnF1ZXJ5LnBhZ2luYXRpb24gPSB7XG4gICAgLy8gVE9ETzogTW92ZSBkZWZhdWx0cyB0byBjb25maWcgZmlsZVxuICAgIHNraXA6IE51bWJlcihyZXEucXVlcnkuc2tpcCkgfHwgMCxcbiAgICBsaW1pdDogTnVtYmVyKHJlcS5xdWVyeS5saW1pdCkgfHwgMjVcbiAgfTtcblxuICBuZXh0KCk7XG59XG4iXX0=