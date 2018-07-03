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
const typeorm_1 = require("typeorm");
const __1 = require("..");
const helpers_1 = require("./helpers");
/**
 * TODO: Move to config
 */
exports.EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["ROOT"] = "root";
    UserRole["USER"] = "user";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
let User = User_1 = class User extends typeorm_1.BaseEntity {
    constructor(data = {}) {
        super();
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.facebookId = data.facebookId;
        this.role = data.role || UserRole.USER;
        this.status = data.status || UserStatus.ACTIVE;
        // Private properties
        this.passwordHash = data.passwordHash;
        this.passwordSalt = data.passwordSalt;
        this.accessTokens = data.accessTokens;
    }
    /**
     * Validates if supplied password matches the currently saved one.
     *
     * @param password The password candidate that will be matched
     */
    validatePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password || !this.passwordHash || !this.passwordSalt || !this.passwordHash) {
                return false;
            }
            const newHash = yield helpers_1.genHash(password, this.passwordSalt);
            return newHash === this.passwordHash;
        });
    }
    /**
     * Hashes and saves the user password.
     *
     * @param password The new password
     */
    savePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { salt, hash } = yield helpers_1.genPassword(password);
            this.passwordSalt = salt;
            this.passwordHash = hash;
            return this.save();
        });
    }
    /**
     * Converts the instance to a JSON to be returned from the public API.
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            facebookId: this.facebookId,
            role: this.role,
            status: this.status
        };
    }
};
User.tableName = "user";
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "facebookId", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "passwordSalt", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    typeorm_1.OneToMany(type => __1.OAuthAccessToken, token => token.user),
    __metadata("design:type", __1.OAuthAccessToken)
], User.prototype, "accessTokens", void 0);
User = User_1 = __decorate([
    typeorm_1.Entity(User_1.tableName),
    __metadata("design:paramtypes", [Object])
], User);
exports.default = User;
var User_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9hcGkvbW9kZWxzL3VzZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFzSDtBQUN0SCwwQkFBc0M7QUFDdEMsdUNBQWlEO0FBRWpEOztHQUVHO0FBQ1UsUUFBQSxXQUFXLEdBQUcsK0NBQStDLENBQUM7QUFFM0UsSUFBWSxVQUdYO0FBSEQsV0FBWSxVQUFVO0lBQ3BCLCtCQUFpQixDQUFBO0lBQ2pCLG1DQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtBQUVELElBQVksUUFHWDtBQUhELFdBQVksUUFBUTtJQUNsQix5QkFBYSxDQUFBO0lBQ2IseUJBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUduQjtBQUdELElBQXFCLElBQUksWUFBekIsVUFBMEIsU0FBUSxvQkFBVTtJQThCMUMsWUFBWSxPQUFzQixFQUFFO1FBQ2xDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDO1FBRS9DLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLGdCQUFnQixDQUFDLFFBQVE7O1lBQ3BDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQy9FLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxNQUFNLE9BQU8sR0FBRyxNQUFNLGlCQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRCxPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxZQUFZLENBQUMsUUFBZ0I7O1lBQ3hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLE9BQU87WUFDTCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFsRnlCLGNBQVMsR0FBRyxNQUFNLENBQUM7QUFHM0M7SUFEQyxnQ0FBc0IsQ0FBQyxNQUFNLENBQUM7O2dDQUNwQjtBQUdYO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7a0NBQ2Y7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bUNBQzVCO0FBR2Q7SUFEQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7O3dDQUN2QjtBQUduQjtJQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7O29DQUNUO0FBR25CO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7a0NBQ2I7QUFHZjtJQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OzBDQUNQO0FBR3JCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7MENBQ1A7QUFHckI7SUFEQyxtQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQWdCLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzhCQUMzQyxvQkFBZ0I7MENBQUM7QUE1QlosSUFBSTtJQUR4QixnQkFBTSxDQUFDLE1BQUksQ0FBQyxTQUFTLENBQUM7O0dBQ0YsSUFBSSxDQW1GeEI7a0JBbkZvQixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUVudGl0eSwgQ29sdW1uLCBFbnRpdHksIEluZGV4LCBNYW55VG9NYW55LCBNYW55VG9PbmUsIE9uZVRvTWFueSwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiB9IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQgeyBPQXV0aEFjY2Vzc1Rva2VuIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBnZW5IYXNoLCBnZW5QYXNzd29yZCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxuLyoqXG4gKiBUT0RPOiBNb3ZlIHRvIGNvbmZpZ1xuICovXG5leHBvcnQgY29uc3QgRU1BSUxfUkVHRVggPSAvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsM30pKyQvO1xuXG5leHBvcnQgZW51bSBVc2VyU3RhdHVzIHtcbiAgQUNUSVZFID0gXCJhY3RpdmVcIixcbiAgSU5BQ1RJVkUgPSBcImluYWN0aXZlXCJcbn1cblxuZXhwb3J0IGVudW0gVXNlclJvbGUge1xuICBST09UID0gXCJyb290XCIsXG4gIFVTRVIgPSBcInVzZXJcIlxufVxuXG5ARW50aXR5KFVzZXIudGFibGVOYW1lKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSB0YWJsZU5hbWUgPSBcInVzZXJcIjtcblxuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbihcInV1aWRcIikgXG4gIGlkOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiBmYWxzZSB9KVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiBmYWxzZSwgdW5pcXVlOiB0cnVlIH0pXG4gIGVtYWlsOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiBmYWxzZSwgdW5pcXVlOiB0cnVlIH0pXG4gIGZhY2Vib29rSWQ6IHN0cmluZztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IGZhbHNlIH0pXG4gIHN0YXR1czogVXNlclN0YXR1cztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IGZhbHNlIH0pXG4gIHJvbGU6IFVzZXJSb2xlO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogZmFsc2UgfSlcbiAgcGFzc3dvcmRTYWx0OiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiBmYWxzZSB9KVxuICBwYXNzd29yZEhhc2g6IHN0cmluZztcblxuICBAT25lVG9NYW55KHR5cGUgPT4gT0F1dGhBY2Nlc3NUb2tlbiwgdG9rZW4gPT4gdG9rZW4udXNlcilcbiAgYWNjZXNzVG9rZW5zOiBPQXV0aEFjY2Vzc1Rva2VuO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8VXNlcj4gPSB7fSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuZW1haWwgPSBkYXRhLmVtYWlsO1xuICAgIHRoaXMuZmFjZWJvb2tJZCA9IGRhdGEuZmFjZWJvb2tJZDtcbiAgICB0aGlzLnJvbGUgPSBkYXRhLnJvbGUgfHwgVXNlclJvbGUuVVNFUjtcbiAgICB0aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzIHx8IFVzZXJTdGF0dXMuQUNUSVZFO1xuXG4gICAgLy8gUHJpdmF0ZSBwcm9wZXJ0aWVzXG4gICAgdGhpcy5wYXNzd29yZEhhc2ggPSBkYXRhLnBhc3N3b3JkSGFzaDtcbiAgICB0aGlzLnBhc3N3b3JkU2FsdCA9IGRhdGEucGFzc3dvcmRTYWx0O1xuICAgIHRoaXMuYWNjZXNzVG9rZW5zID0gZGF0YS5hY2Nlc3NUb2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIGlmIHN1cHBsaWVkIHBhc3N3b3JkIG1hdGNoZXMgdGhlIGN1cnJlbnRseSBzYXZlZCBvbmUuXG4gICAqXG4gICAqIEBwYXJhbSBwYXNzd29yZCBUaGUgcGFzc3dvcmQgY2FuZGlkYXRlIHRoYXQgd2lsbCBiZSBtYXRjaGVkXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdmFsaWRhdGVQYXNzd29yZChwYXNzd29yZCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICghcGFzc3dvcmQgfHwgIXRoaXMucGFzc3dvcmRIYXNoIHx8ICF0aGlzLnBhc3N3b3JkU2FsdCB8fCAhdGhpcy5wYXNzd29yZEhhc2gpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgbmV3SGFzaCA9IGF3YWl0IGdlbkhhc2gocGFzc3dvcmQsIHRoaXMucGFzc3dvcmRTYWx0KTtcbiAgICByZXR1cm4gbmV3SGFzaCA9PT0gdGhpcy5wYXNzd29yZEhhc2g7XG4gIH1cblxuICAvKipcbiAgICogSGFzaGVzIGFuZCBzYXZlcyB0aGUgdXNlciBwYXNzd29yZC5cbiAgICpcbiAgICogQHBhcmFtIHBhc3N3b3JkIFRoZSBuZXcgcGFzc3dvcmRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzYXZlUGFzc3dvcmQocGFzc3dvcmQ6IHN0cmluZykge1xuICAgIGNvbnN0IHsgc2FsdCwgaGFzaCB9ID0gYXdhaXQgZ2VuUGFzc3dvcmQocGFzc3dvcmQpO1xuICAgIHRoaXMucGFzc3dvcmRTYWx0ID0gc2FsdDtcbiAgICB0aGlzLnBhc3N3b3JkSGFzaCA9IGhhc2g7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBpbnN0YW5jZSB0byBhIEpTT04gdG8gYmUgcmV0dXJuZWQgZnJvbSB0aGUgcHVibGljIEFQSS5cbiAgICovXG4gIHB1YmxpYyB0b0pTT04oKTogUGFydGlhbDxVc2VyPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgZW1haWw6IHRoaXMuZW1haWwsXG4gICAgICBmYWNlYm9va0lkOiB0aGlzLmZhY2Vib29rSWQsXG4gICAgICByb2xlOiB0aGlzLnJvbGUsXG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzXG4gICAgfTtcbiAgfVxufVxuIl19