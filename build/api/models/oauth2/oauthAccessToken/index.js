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
const moment = require("moment");
const typeorm_1 = require("typeorm");
const user_1 = require("../../user");
const oauthClient_1 = require("../oauthClient");
let OAuthAccessToken = OAuthAccessToken_1 = class OAuthAccessToken extends typeorm_1.BaseEntity {
    constructor(data = {}) {
        super();
        this.id = data.id;
        this.accessToken = data.accessToken;
        this.tokenType = data.tokenType;
        this.expires = data.expires;
        this.id = data.ip;
        this.browser = data.browser;
        this.version = data.version;
        this.os = data.os;
        this.platform = data.platform;
        this.source = data.source;
    }
    /**
       * Updates an access token setting its user agent stuff.
       *
       * @param accessToken The acess token to be updated
       * @param ip The client ip
       * @param userAgent The user agent information
       */
    static updateUserAgent(accessToken, ip, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const ua = {
                ip,
                browser: userAgent.browser,
                version: userAgent.version,
                os: userAgent.os,
                platform: userAgent.browser.platform,
                source: userAgent.source
            };
            yield this.update({ accessToken }, Object.assign({}, ua));
            return ua;
        });
    }
    /**
     * Revokes access tokens based on specified conditions.
     *
     * @param conditions
     * @param options
     */
    static revoke(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            return this.update(Object.assign({}, conditions, { expires: typeorm_1.MoreThan(now) }), { expires: now });
        });
    }
    /**
     * Saves a new access token in the database according to the oauth 2.0 middleware.
     *
     * @param token The token instance
     * @param client The client instance
     * @param user The user instance
     */
    static saveAccessToken(token, client, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = user.id || user._id;
            const clientId = client.id || client._id || client;
            // Prepare the new access token instance
            const accessToken = yield this.create({
                expires: token.accessTokenExpiresAt,
                accessToken: token.accessToken,
                tokenType: "Bearer",
                client: clientId,
                user: userId
            });
            // Return the middleware expected output.
            const result = {
                user: userId,
                client: clientId,
                accessToken: accessToken.accessToken,
                expires_in: moment(token.accessTokenExpiresAt).diff(moment(), "seconds") + 1,
                user_id: userId
            };
            if (user.virtual) {
                result.virtual = true;
            }
            return result;
        });
    }
};
OAuthAccessToken.tableName = "oauth_access_token";
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], OAuthAccessToken.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], OAuthAccessToken.prototype, "accessToken", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], OAuthAccessToken.prototype, "tokenType", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Date)
], OAuthAccessToken.prototype, "expires", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_1.default, user => user.accessTokens),
    __metadata("design:type", user_1.default)
], OAuthAccessToken.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => oauthClient_1.default, client => client.accessTokens),
    __metadata("design:type", oauthClient_1.default)
], OAuthAccessToken.prototype, "client", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], OAuthAccessToken.prototype, "ip", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], OAuthAccessToken.prototype, "browser", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], OAuthAccessToken.prototype, "version", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], OAuthAccessToken.prototype, "os", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], OAuthAccessToken.prototype, "platform", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], OAuthAccessToken.prototype, "source", void 0);
OAuthAccessToken = OAuthAccessToken_1 = __decorate([
    typeorm_1.Entity(OAuthAccessToken_1.tableName),
    __metadata("design:paramtypes", [Object])
], OAuthAccessToken);
exports.default = OAuthAccessToken;
var OAuthAccessToken_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcGkvbW9kZWxzL29hdXRoMi9vYXV0aEFjY2Vzc1Rva2VuL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBaUM7QUFDakMscUNBSWlCO0FBQ2pCLHFDQUE4QjtBQUM5QixnREFBeUM7QUFHekMsSUFBcUIsZ0JBQWdCLHdCQUFyQyxzQkFBc0MsU0FBUSxvQkFBVTtJQXVDdEQsWUFBWSxPQUFrQyxFQUFFO1FBQzlDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7O1NBTUs7SUFDRSxNQUFNLENBQU8sZUFBZSxDQUFDLFdBQW1CLEVBQUUsRUFBVSxFQUFFLFNBQWM7O1lBQ2pGLE1BQU0sRUFBRSxHQUFHO2dCQUNULEVBQUU7Z0JBQ0YsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFP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QkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztpREFDWDtBQUdoQjtJQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lEQUNYO0FBR2hCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NENBQ2hCO0FBR1g7SUFEQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztrREFDVjtBQUdqQjtJQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2dEQUNaO0FBckNJLGdCQUFnQjtJQURwQyxnQkFBTSxDQUFDLGtCQUFnQixDQUFDLFNBQVMsQ0FBQzs7R0FDZCxnQkFBZ0IsQ0F3SHBDO2tCQXhIb0IsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7IFxuICBCYXNlRW50aXR5LCBDb2x1bW4sIERlZXBQYXJ0aWFsLCBcbiAgRW50aXR5LCBJbmRleCwgTWFueVRvTWFueSwgXG4gIE1hbnlUb09uZSwgTW9yZVRoYW4sIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXG59IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vLi4vdXNlclwiO1xuaW1wb3J0IE9BdXRoQ2xpZW50IGZyb20gXCIuLi9vYXV0aENsaWVudFwiO1xuXG5ARW50aXR5KE9BdXRoQWNjZXNzVG9rZW4udGFibGVOYW1lKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0F1dGhBY2Nlc3NUb2tlbiBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSB0YWJsZU5hbWUgPSBcIm9hdXRoX2FjY2Vzc190b2tlblwiO1xuXG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKFwidXVpZFwiKVxuICBpZDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogZmFsc2UsIHVuaXF1ZTogdHJ1ZSB9KVxuICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogZmFsc2UgfSlcbiAgdG9rZW5UeXBlOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiBmYWxzZSB9KVxuICBleHBpcmVzOiBEYXRlO1xuXG4gIEBNYW55VG9PbmUodHlwZSA9PiBVc2VyLCB1c2VyID0+IHVzZXIuYWNjZXNzVG9rZW5zKVxuICB1c2VyOiBVc2VyO1xuXG4gIEBNYW55VG9PbmUodHlwZSA9PiBPQXV0aENsaWVudCwgY2xpZW50ID0+IGNsaWVudC5hY2Nlc3NUb2tlbnMpXG4gIGNsaWVudDogT0F1dGhDbGllbnQ7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGlwOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGJyb3dzZXI6IHN0cmluZztcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IHRydWUgfSlcbiAgdmVyc2lvbjogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBvczogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBwbGF0Zm9ybTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBzb3VyY2U6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPE9BdXRoQWNjZXNzVG9rZW4+ID0ge30pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBkYXRhLmFjY2Vzc1Rva2VuO1xuICAgIHRoaXMudG9rZW5UeXBlID0gZGF0YS50b2tlblR5cGU7XG4gICAgdGhpcy5leHBpcmVzID0gZGF0YS5leHBpcmVzO1xuICAgIHRoaXMuaWQgPSBkYXRhLmlwO1xuICAgIHRoaXMuYnJvd3NlciA9IGRhdGEuYnJvd3NlcjtcbiAgICB0aGlzLnZlcnNpb24gPSBkYXRhLnZlcnNpb247XG4gICAgdGhpcy5vcyA9IGRhdGEub3M7XG4gICAgdGhpcy5wbGF0Zm9ybSA9IGRhdGEucGxhdGZvcm07XG4gICAgdGhpcy5zb3VyY2UgPSBkYXRhLnNvdXJjZTtcbiAgfVxuXG4gIC8qKlxuICAgICAqIFVwZGF0ZXMgYW4gYWNjZXNzIHRva2VuIHNldHRpbmcgaXRzIHVzZXIgYWdlbnQgc3R1ZmYuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYWNjZXNzVG9rZW4gVGhlIGFjZXNzIHRva2VuIHRvIGJlIHVwZGF0ZWRcbiAgICAgKiBAcGFyYW0gaXAgVGhlIGNsaWVudCBpcFxuICAgICAqIEBwYXJhbSB1c2VyQWdlbnQgVGhlIHVzZXIgYWdlbnQgaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgcHVibGljIHN0YXRpYyBhc3luYyB1cGRhdGVVc2VyQWdlbnQoYWNjZXNzVG9rZW46IHN0cmluZywgaXA6IHN0cmluZywgdXNlckFnZW50OiBhbnkpIHtcbiAgICBjb25zdCB1YSA9IHtcbiAgICAgIGlwLFxuICAgICAgYnJvd3NlcjogdXNlckFnZW50LmJyb3dzZXIsXG4gICAgICB2ZXJzaW9uOiB1c2VyQWdlbnQudmVyc2lvbixcbiAgICAgIG9zOiB1c2VyQWdlbnQub3MsXG4gICAgICBwbGF0Zm9ybTogdXNlckFnZW50LmJyb3dzZXIucGxhdGZvcm0sXG4gICAgICBzb3VyY2U6IHVzZXJBZ2VudC5zb3VyY2VcbiAgICB9O1xuXG4gICAgYXdhaXQgdGhpcy51cGRhdGUoeyBhY2Nlc3NUb2tlbiB9LCB7IC4uLnVhIH0pO1xuICAgIHJldHVybiB1YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXZva2VzIGFjY2VzcyB0b2tlbnMgYmFzZWQgb24gc3BlY2lmaWVkIGNvbmRpdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBjb25kaXRpb25zXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIHJldm9rZShjb25kaXRpb25zOiBQYXJ0aWFsPE9BdXRoQWNjZXNzVG9rZW4+KSB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gdGhpcy51cGRhdGUoeyAuLi5jb25kaXRpb25zLCBleHBpcmVzOiBNb3JlVGhhbihub3cpIGFzIERlZXBQYXJ0aWFsPERhdGU+IH0sIHsgZXhwaXJlczogbm93IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmVzIGEgbmV3IGFjY2VzcyB0b2tlbiBpbiB0aGUgZGF0YWJhc2UgYWNjb3JkaW5nIHRvIHRoZSBvYXV0aCAyLjAgbWlkZGxld2FyZS5cbiAgICpcbiAgICogQHBhcmFtIHRva2VuIFRoZSB0b2tlbiBpbnN0YW5jZVxuICAgKiBAcGFyYW0gY2xpZW50IFRoZSBjbGllbnQgaW5zdGFuY2VcbiAgICogQHBhcmFtIHVzZXIgVGhlIHVzZXIgaW5zdGFuY2VcbiAgICovXG4gIHN0YXRpYyBhc3luYyBzYXZlQWNjZXNzVG9rZW4odG9rZW4sIGNsaWVudCwgdXNlcikge1xuICAgIGNvbnN0IHVzZXJJZCA9IHVzZXIuaWQgfHwgdXNlci5faWQ7XG4gICAgY29uc3QgY2xpZW50SWQgPSBjbGllbnQuaWQgfHwgY2xpZW50Ll9pZCB8fCBjbGllbnQ7XG5cbiAgICAvLyBQcmVwYXJlIHRoZSBuZXcgYWNjZXNzIHRva2VuIGluc3RhbmNlXG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCB0aGlzLmNyZWF0ZSh7XG4gICAgICBleHBpcmVzOiB0b2tlbi5hY2Nlc3NUb2tlbkV4cGlyZXNBdCxcbiAgICAgIGFjY2Vzc1Rva2VuOiB0b2tlbi5hY2Nlc3NUb2tlbixcbiAgICAgIHRva2VuVHlwZTogXCJCZWFyZXJcIixcbiAgICAgIGNsaWVudDogY2xpZW50SWQsXG4gICAgICB1c2VyOiB1c2VySWRcbiAgICB9KTtcblxuICAgIC8vIFJldHVybiB0aGUgbWlkZGxld2FyZSBleHBlY3RlZCBvdXRwdXQuXG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgdXNlcjogdXNlcklkLFxuICAgICAgY2xpZW50OiBjbGllbnRJZCxcbiAgICAgIGFjY2Vzc1Rva2VuOiBhY2Nlc3NUb2tlbi5hY2Nlc3NUb2tlbixcbiAgICAgIGV4cGlyZXNfaW46IG1vbWVudCh0b2tlbi5hY2Nlc3NUb2tlbkV4cGlyZXNBdCkuZGlmZihtb21lbnQoKSwgXCJzZWNvbmRzXCIpICsgMSxcbiAgICAgIHVzZXJfaWQ6IHVzZXJJZFxuICAgIH0gYXMgYW55O1xuXG4gICAgaWYgKHVzZXIudmlydHVhbCkge1xuICAgICAgcmVzdWx0LnZpcnR1YWwgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==