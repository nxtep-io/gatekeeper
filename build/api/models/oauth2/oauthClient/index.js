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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const oauthAccessToken_1 = require("../oauthAccessToken");
var OAuthClientPlatform;
(function (OAuthClientPlatform) {
    OAuthClientPlatform["API"] = "api";
    OAuthClientPlatform["WEB"] = "web";
})(OAuthClientPlatform = exports.OAuthClientPlatform || (exports.OAuthClientPlatform = {}));
var OAuthClientStatus;
(function (OAuthClientStatus) {
    OAuthClientStatus["ACTIVE"] = "active";
    OAuthClientStatus["INACTIVE"] = "inactive";
})(OAuthClientStatus = exports.OAuthClientStatus || (exports.OAuthClientStatus = {}));
let OAuthClient = OAuthClient_1 = class OAuthClient extends typeorm_1.BaseEntity {
    constructor(data = {}) {
        super();
        this.id = data.id;
        this.clientId = data.clientId;
        this.clientSecret = data.clientSecret;
    }
};
OAuthClient.tableName = "oauth_client";
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], OAuthClient.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], OAuthClient.prototype, "clientId", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], OAuthClient.prototype, "clientSecret", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], OAuthClient.prototype, "platform", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], OAuthClient.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany(type => oauthAccessToken_1.default, token => token.client, { eager: false }),
    __metadata("design:type", oauthAccessToken_1.default)
], OAuthClient.prototype, "accessTokens", void 0);
OAuthClient = OAuthClient_1 = __decorate([
    typeorm_1.Entity(OAuthClient_1.tableName),
    __metadata("design:paramtypes", [Object])
], OAuthClient);
exports.default = OAuthClient;
var OAuthClient_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcGkvbW9kZWxzL29hdXRoMi9vYXV0aENsaWVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQUFzSDtBQUV0SCwwREFBbUQ7QUFFbkQsSUFBWSxtQkFHWDtBQUhELFdBQVksbUJBQW1CO0lBQzdCLGtDQUFXLENBQUE7SUFDWCxrQ0FBVyxDQUFBO0FBQ2IsQ0FBQyxFQUhXLG1CQUFtQixHQUFuQiwyQkFBbUIsS0FBbkIsMkJBQW1CLFFBRzlCO0FBRUQsSUFBWSxpQkFHWDtBQUhELFdBQVksaUJBQWlCO0lBQzNCLHNDQUFpQixDQUFBO0lBQ2pCLDBDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFIVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQUc1QjtBQUdELElBQXFCLFdBQVcsbUJBQWhDLGlCQUFpQyxTQUFRLG9CQUFVO0lBcUJqRCxZQUFZLE9BQTZCLEVBQUU7UUFDekMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUN4QyxDQUFDO0NBQ0YsQ0FBQTtBQTFCeUIscUJBQVMsR0FBRyxjQUFjLENBQUM7QUFHbkQ7SUFEQyxnQ0FBc0IsQ0FBQyxNQUFNLENBQUM7O3VDQUNwQjtBQUdYO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzs2Q0FDekI7QUFHakI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOztpREFDUDtBQUdyQjtJQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OzZDQUNFO0FBRzlCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7MkNBQ0Y7QUFHMUI7SUFEQyxtQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsMEJBQWdCLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDOzhCQUMvRCwwQkFBZ0I7aURBQUM7QUFuQlosV0FBVztJQUQvQixnQkFBTSxDQUFDLGFBQVcsQ0FBQyxTQUFTLENBQUM7O0dBQ1QsV0FBVyxDQTJCL0I7a0JBM0JvQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUVudGl0eSwgQ29sdW1uLCBFbnRpdHksIEluZGV4LCBNYW55VG9NYW55LCBNYW55VG9PbmUsIE9uZVRvTWFueSwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiB9IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vLi4vdXNlclwiO1xuaW1wb3J0IE9BdXRoQWNjZXNzVG9rZW4gZnJvbSBcIi4uL29hdXRoQWNjZXNzVG9rZW5cIjtcblxuZXhwb3J0IGVudW0gT0F1dGhDbGllbnRQbGF0Zm9ybSB7XG4gIEFQSSA9IFwiYXBpXCIsXG4gIFdFQiA9IFwid2ViXCJcbn1cblxuZXhwb3J0IGVudW0gT0F1dGhDbGllbnRTdGF0dXMge1xuICBBQ1RJVkUgPSBcImFjdGl2ZVwiLFxuICBJTkFDVElWRSA9IFwiaW5hY3RpdmVcIlxufVxuXG5ARW50aXR5KE9BdXRoQ2xpZW50LnRhYmxlTmFtZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9BdXRoQ2xpZW50IGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHRhYmxlTmFtZSA9IFwib2F1dGhfY2xpZW50XCI7XG5cbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oXCJ1dWlkXCIpIFxuICBpZDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogZmFsc2UsIHVuaXF1ZTogdHJ1ZSB9KVxuICBjbGllbnRJZDogc3RyaW5nO1xuXG4gIEBDb2x1bW4oeyBudWxsYWJsZTogZmFsc2UgfSlcbiAgY2xpZW50U2VjcmV0OiBzdHJpbmc7XG5cbiAgQENvbHVtbih7IG51bGxhYmxlOiBmYWxzZSB9KVxuICBwbGF0Zm9ybTogT0F1dGhDbGllbnRQbGF0Zm9ybTtcblxuICBAQ29sdW1uKHsgbnVsbGFibGU6IGZhbHNlIH0pXG4gIHN0YXR1czogT0F1dGhDbGllbnRTdGF0dXM7XG5cbiAgQE9uZVRvTWFueSh0eXBlID0+IE9BdXRoQWNjZXNzVG9rZW4sIHRva2VuID0+IHRva2VuLmNsaWVudCwgeyBlYWdlcjogZmFsc2UgfSlcbiAgYWNjZXNzVG9rZW5zOiBPQXV0aEFjY2Vzc1Rva2VuO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8T0F1dGhDbGllbnQ+ID0ge30pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgIHRoaXMuY2xpZW50SWQgPSBkYXRhLmNsaWVudElkO1xuICAgIHRoaXMuY2xpZW50U2VjcmV0ID0gZGF0YS5jbGllbnRTZWNyZXQ7XG4gIH1cbn1cbiJdfQ==