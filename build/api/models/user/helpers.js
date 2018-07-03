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
const crypto = require("crypto");
// TODO: Move this to a config file
const PASSWORD_SECRET_EXPIRES_IN_DAYS = 7;
function genHash(password, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, new Buffer(salt, "hex"), 100000, 512, "sha512", (err, key) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(key.toString("hex"));
        });
    });
}
exports.genHash = genHash;
function genPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = crypto.randomBytes(128).toString("hex");
        return { salt, hash: yield genHash(password, salt) };
    });
}
exports.genPassword = genPassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwaS9tb2RlbHMvdXNlci9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpQ0FBaUM7QUFFakMsbUNBQW1DO0FBQ25DLE1BQU0sK0JBQStCLEdBQUcsQ0FBQyxDQUFDO0FBRTFDLGlCQUF3QixRQUFRLEVBQUUsSUFBSTtJQUNwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNuRixJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1osT0FBTzthQUNSO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVZELDBCQVVDO0FBRUQscUJBQWtDLFFBQWdCOztRQUNoRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0NBQUE7QUFIRCxrQ0FHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNyeXB0byBmcm9tIFwiY3J5cHRvXCI7XG5cbi8vIFRPRE86IE1vdmUgdGhpcyB0byBhIGNvbmZpZyBmaWxlXG5jb25zdCBQQVNTV09SRF9TRUNSRVRfRVhQSVJFU19JTl9EQVlTID0gNztcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkhhc2gocGFzc3dvcmQsIHNhbHQpOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNyeXB0by5wYmtkZjIocGFzc3dvcmQsIG5ldyBCdWZmZXIoc2FsdCwgXCJoZXhcIiksIDEwMDAwMCwgNTEyLCBcInNoYTUxMlwiLCAoZXJyLCBrZXkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoa2V5LnRvU3RyaW5nKFwiaGV4XCIpKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5QYXNzd29yZChwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTx7IHNhbHQ6IHN0cmluZzsgaGFzaDogc3RyaW5nIH0+IHtcbiAgY29uc3Qgc2FsdCA9IGNyeXB0by5yYW5kb21CeXRlcygxMjgpLnRvU3RyaW5nKFwiaGV4XCIpO1xuICByZXR1cm4geyBzYWx0LCBoYXNoOiBhd2FpdCBnZW5IYXNoKHBhc3N3b3JkLCBzYWx0KSB9O1xufVxuIl19