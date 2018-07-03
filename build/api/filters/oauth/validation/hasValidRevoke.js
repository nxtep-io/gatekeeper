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
 * Checks if param is has a valid but optional access token.
 *
 * @param {String} accessToken The param to be validated
 */
function hasValidRevoke(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = req.param("accessToken");
        if (accessToken && !accessToken.length) {
            throw new ts_framework_1.HttpError("The access token provided is not valid", ts_framework_1.HttpCode.Client.BAD_REQUEST);
        }
        req.query.accessToken = accessToken;
        next();
    });
}
exports.default = hasValidRevoke;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzVmFsaWRSZXZva2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcGkvZmlsdGVycy9vYXV0aC92YWxpZGF0aW9uL2hhc1ZhbGlkUmV2b2tlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBbUQ7QUFFbkQ7Ozs7R0FJRztBQUNILHdCQUE2QyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7O1FBQ3pELE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFN0MsSUFBSSxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3RDLE1BQU0sSUFBSSx3QkFBUyxDQUFDLHdDQUF3QyxFQUFFLHVCQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzVGO1FBRUQsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ3BDLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztDQUFBO0FBVEQsaUNBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ29kZSwgSHR0cEVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29ya1wiO1xuXG4vKipcbiAqIENoZWNrcyBpZiBwYXJhbSBpcyBoYXMgYSB2YWxpZCBidXQgb3B0aW9uYWwgYWNjZXNzIHRva2VuLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2Nlc3NUb2tlbiBUaGUgcGFyYW0gdG8gYmUgdmFsaWRhdGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhc1ZhbGlkUmV2b2tlKHJlcSwgcmVzLCBuZXh0KSB7XG4gIGNvbnN0IGFjY2Vzc1Rva2VuID0gcmVxLnBhcmFtKFwiYWNjZXNzVG9rZW5cIik7XG5cbiAgaWYgKGFjY2Vzc1Rva2VuICYmICFhY2Nlc3NUb2tlbi5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgSHR0cEVycm9yKFwiVGhlIGFjY2VzcyB0b2tlbiBwcm92aWRlZCBpcyBub3QgdmFsaWRcIiwgSHR0cENvZGUuQ2xpZW50LkJBRF9SRVFVRVNUKTtcbiAgfVxuXG4gIHJlcS5xdWVyeS5hY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2VuO1xuICBuZXh0KCk7XG59XG4iXX0=