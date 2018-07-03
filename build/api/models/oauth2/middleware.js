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
const bson_1 = require("bson");
const mongoose = require("mongoose");
const typeorm_1 = require("typeorm");
const config_1 = require("../../../config");
const user_1 = require("../user");
const oauthAccessToken_1 = require("./oauthAccessToken");
const index_1 = require("./oauthClient/index");
class OAuth2Middleware {
    /**
     * Gets an OAuth 2.0 Client instance from database.
     *
     * @param clientId The client id
     * @param clientSecret The client secret
     */
    static getClient(clientId, clientSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield index_1.default.findOne({ clientId, clientSecret });
            }
            catch (exception) {
                console.error(exception);
            }
            // Ensure that what come to here has the same secret
            if (client && client.clientSecret === clientSecret) {
                return Object.assign({ redirectUris: [], grants: config_1.default.oauth.grantTypes }, (client.toJSON ? client.toJSON() : client));
            }
            return client;
        });
    }
    /**
     * Gets an OAuth 2.0 Client instance from database.
     *
     * @param clientId The client id
     * @param clientSecret The client secret
     */
    static getClientById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield index_1.default.findOne(id);
            }
            catch (exception) {
                console.error(exception);
            }
            if (client) {
                // Ensure is a plain object with the secret
                client = Object.assign({ clientSecret: client.clientSecret }, (client.toJSON ? client.toJSON() : client));
            }
            return client;
        });
    }
    /**
     * Gets an user based on email and password credentials.
     *
     * @param email The user username or email
     * @param password The user password
     */
    static getUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ email, status: user_1.UserStatus.ACTIVE });
            if (user && (yield user.validatePassword(password))) {
                return user;
            }
            return null;
        });
    }
    /**
     * Gets an User instance from database.
     *
     * @param id The user id
     */
    static getUserById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield user_1.default.findOne(id);
            if (user) {
                // Ensure is a plain object with the secret
                user = user.toJSON ? user.toJSON() : user;
            }
            return user;
        });
    }
    /**
     * Gets a virtual user for a client credentials authentication.
     *
     * @param client The oauth client
     */
    static getUserFromClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = new mongoose.Types.ObjectId();
            return {
                _id,
                id: _id,
                virtual: true,
                clientId: client
            };
        });
    }
    /**
     * Saves a new access token on the database.
     *
     * @param token The token instance
     * @param client The client instance
     * @param user The user instance
     */
    static saveToken(token, client, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return oauthAccessToken_1.default.saveAccessToken(token, client, user);
        });
    }
    /**
     * Gets an OAuth 2.0 Access Token from the database.
     *
     * @param accessToken The access token
     */
    static getAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            // Gets instance from database ensuring its expiration
            const token = yield oauthAccessToken_1.default.findOne({
                where: {
                    accessToken,
                    expires: typeorm_1.MoreThan(now)
                }
            });
            if (token) {
                let clientId;
                // Handle client id types
                if (token.client instanceof bson_1.ObjectId) {
                    clientId = token.client.toString();
                }
                else if (typeof token.client.id === typeof "a") {
                    clientId = token.client.id;
                }
                else {
                    clientId = token.client;
                }
                // Populate token client instance
                token.client = yield this.getClientById({ id: clientId });
                // Prepare user instance
                if (token.user && !token.user.virtual) {
                    let userId;
                    // Handle user id types
                    if (token.user instanceof bson_1.ObjectId) {
                        userId = token.user.toString();
                    }
                    else if (typeof token.user.id === typeof "a") {
                        userId = token.user.id;
                    }
                    else {
                        userId = token.user;
                    }
                    token.user = (yield this.getUserById({ id: userId })) || {
                        id: token.user,
                        virtual: true,
                        client: token.client
                    };
                }
                // Prepare token expiration
                token.accessTokenExpiresAt = token.expires;
            }
            return Object.assign({}, token, { accessTokenExpiresAt: new Date(token.accessTokenExpiresAt) });
        });
    }
}
exports.default = OAuth2Middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwaS9tb2RlbHMvb2F1dGgyL21pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUFnQztBQUNoQyxxQ0FBcUM7QUFDckMscUNBQW1DO0FBQ25DLDRDQUFxQztBQUNyQyxrQ0FBMkM7QUFDM0MseURBQWtEO0FBQ2xELCtDQUE2RDtBQUU3RDtJQUNFOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFPLFNBQVMsQ0FBQyxRQUFnQixFQUFFLFlBQXFCOztZQUM1RCxJQUFJLE1BQU0sQ0FBQztZQUVYLElBQUk7Z0JBQ0YsTUFBTSxHQUFHLE1BQU0sZUFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO2FBQ2hFO1lBQUMsT0FBTyxTQUFTLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDMUI7WUFFRCxvREFBb0Q7WUFDcEQsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxZQUFZLEVBQUU7Z0JBQ2xELHVCQUNFLFlBQVksRUFBRSxFQUFFLEVBQ2hCLE1BQU0sRUFBRSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQzVCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFDN0M7YUFDSDtZQUVELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFPLGFBQWEsQ0FBQyxFQUFFLEVBQUUsRUFBRTs7WUFDL0IsSUFBSSxNQUFNLENBQUM7WUFFWCxJQUFJO2dCQUNGLE1BQU0sR0FBRyxNQUFNLGVBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEM7WUFBQyxPQUFP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QU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFFMUQsd0JBQXdCO2dCQUN4QixJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDckMsSUFBSSxNQUFNLENBQUM7b0JBRVgsdUJBQXVCO29CQUN2QixJQUFJLEtBQUssQ0FBQyxJQUFJLFlBQVksZUFBUSxFQUFFO3dCQUNsQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDaEM7eUJBQU0sSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQU8sR0FBRyxFQUFFO3dCQUM5QyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7cUJBQ3hCO3lCQUFNO3dCQUNMLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO3FCQUNyQjtvQkFFRCxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSTt3QkFDdkQsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJO3dCQUNkLE9BQU8sRUFBRSxJQUFJO3dCQUNiLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtxQkFDckIsQ0FBQztpQkFDSDtnQkFFRCwyQkFBMkI7Z0JBQzNCLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQzVDO1lBRUQseUJBQVksS0FBSyxJQUFFLG9CQUFvQixFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFHO1FBQ2xGLENBQUM7S0FBQTtDQUNGO0FBeEtELG1DQXdLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9iamVjdElkIH0gZnJvbSBcImJzb25cIjtcbmltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuaW1wb3J0IHsgTW9yZVRoYW4gfSBmcm9tIFwidHlwZW9ybVwiO1xuaW1wb3J0IENvbmZpZyBmcm9tIFwiLi4vLi4vLi4vY29uZmlnXCI7XG5pbXBvcnQgVXNlciwgeyBVc2VyU3RhdHVzIH0gZnJvbSBcIi4uL3VzZXJcIjtcbmltcG9ydCBPQXV0aEFjY2Vzc1Rva2VuIGZyb20gXCIuL29hdXRoQWNjZXNzVG9rZW5cIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgT0F1dGhDbGllbnQgfSBmcm9tIFwiLi9vYXV0aENsaWVudC9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQXV0aDJNaWRkbGV3YXJlIHtcbiAgLyoqXG4gICAqIEdldHMgYW4gT0F1dGggMi4wIENsaWVudCBpbnN0YW5jZSBmcm9tIGRhdGFiYXNlLlxuICAgKlxuICAgKiBAcGFyYW0gY2xpZW50SWQgVGhlIGNsaWVudCBpZFxuICAgKiBAcGFyYW0gY2xpZW50U2VjcmV0IFRoZSBjbGllbnQgc2VjcmV0XG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0Q2xpZW50KGNsaWVudElkOiBzdHJpbmcsIGNsaWVudFNlY3JldD86IHN0cmluZykge1xuICAgIGxldCBjbGllbnQ7XG5cbiAgICB0cnkge1xuICAgICAgY2xpZW50ID0gYXdhaXQgT0F1dGhDbGllbnQuZmluZE9uZSh7IGNsaWVudElkLCBjbGllbnRTZWNyZXQgfSk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGV4Y2VwdGlvbik7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIHRoYXQgd2hhdCBjb21lIHRvIGhlcmUgaGFzIHRoZSBzYW1lIHNlY3JldFxuICAgIGlmIChjbGllbnQgJiYgY2xpZW50LmNsaWVudFNlY3JldCA9PT0gY2xpZW50U2VjcmV0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZWRpcmVjdFVyaXM6IFtdLFxuICAgICAgICBncmFudHM6IENvbmZpZy5vYXV0aC5ncmFudFR5cGVzLFxuICAgICAgICAuLi4oY2xpZW50LnRvSlNPTiA/IGNsaWVudC50b0pTT04oKSA6IGNsaWVudClcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIE9BdXRoIDIuMCBDbGllbnQgaW5zdGFuY2UgZnJvbSBkYXRhYmFzZS5cbiAgICpcbiAgICogQHBhcmFtIGNsaWVudElkIFRoZSBjbGllbnQgaWRcbiAgICogQHBhcmFtIGNsaWVudFNlY3JldCBUaGUgY2xpZW50IHNlY3JldFxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldENsaWVudEJ5SWQoeyBpZCB9KSB7XG4gICAgbGV0IGNsaWVudDtcblxuICAgIHRyeSB7XG4gICAgICBjbGllbnQgPSBhd2FpdCBPQXV0aENsaWVudC5maW5kT25lKGlkKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXhjZXB0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoY2xpZW50KSB7XG4gICAgICAvLyBFbnN1cmUgaXMgYSBwbGFpbiBvYmplY3Qgd2l0aCB0aGUgc2VjcmV0XG4gICAgICBjbGllbnQgPSB7XG4gICAgICAgIGNsaWVudFNlY3JldDogY2xpZW50LmNsaWVudFNlY3JldCxcbiAgICAgICAgLi4uKGNsaWVudC50b0pTT04gPyBjbGllbnQudG9KU09OKCkgOiBjbGllbnQpXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBjbGllbnQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiB1c2VyIGJhc2VkIG9uIGVtYWlsIGFuZCBwYXNzd29yZCBjcmVkZW50aWFscy5cbiAgICpcbiAgICogQHBhcmFtIGVtYWlsIFRoZSB1c2VyIHVzZXJuYW1lIG9yIGVtYWlsXG4gICAqIEBwYXJhbSBwYXNzd29yZCBUaGUgdXNlciBwYXNzd29yZFxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldFVzZXIoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbCwgc3RhdHVzOiBVc2VyU3RhdHVzLkFDVElWRSB9KTtcbiAgICBpZiAodXNlciAmJiAoYXdhaXQgdXNlci52YWxpZGF0ZVBhc3N3b3JkKHBhc3N3b3JkKSkpIHtcbiAgICAgIHJldHVybiB1c2VyO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIFVzZXIgaW5zdGFuY2UgZnJvbSBkYXRhYmFzZS5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSB1c2VyIGlkXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0VXNlckJ5SWQoeyBpZCB9KSB7XG4gICAgbGV0IHVzZXI6IGFueSA9IGF3YWl0IFVzZXIuZmluZE9uZShpZCk7XG5cbiAgICBpZiAodXNlcikge1xuICAgICAgLy8gRW5zdXJlIGlzIGEgcGxhaW4gb2JqZWN0IHdpdGggdGhlIHNlY3JldFxuICAgICAgdXNlciA9IHVzZXIudG9KU09OID8gdXNlci50b0pTT04oKSA6IHVzZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVzZXI7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIHZpcnR1YWwgdXNlciBmb3IgYSBjbGllbnQgY3JlZGVudGlhbHMgYXV0aGVudGljYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBjbGllbnQgVGhlIG9hdXRoIGNsaWVudFxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldFVzZXJGcm9tQ2xpZW50KGNsaWVudDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBfaWQgPSBuZXcgbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBfaWQsXG4gICAgICBpZDogX2lkLFxuICAgICAgdmlydHVhbDogdHJ1ZSxcbiAgICAgIGNsaWVudElkOiBjbGllbnRcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmVzIGEgbmV3IGFjY2VzcyB0b2tlbiBvbiB0aGUgZGF0YWJhc2UuXG4gICAqXG4gICAqIEBwYXJhbSB0b2tlbiBUaGUgdG9rZW4gaW5zdGFuY2VcbiAgICogQHBhcmFtIGNsaWVudCBUaGUgY2xpZW50IGluc3RhbmNlXG4gICAqIEBwYXJhbSB1c2VyIFRoZSB1c2VyIGluc3RhbmNlXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgc2F2ZVRva2VuKHRva2VuLCBjbGllbnQsIHVzZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gT0F1dGhBY2Nlc3NUb2tlbi5zYXZlQWNjZXNzVG9rZW4odG9rZW4sIGNsaWVudCwgdXNlcik7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBPQXV0aCAyLjAgQWNjZXNzIFRva2VuIGZyb20gdGhlIGRhdGFiYXNlLlxuICAgKlxuICAgKiBAcGFyYW0gYWNjZXNzVG9rZW4gVGhlIGFjY2VzcyB0b2tlblxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldEFjY2Vzc1Rva2VuKGFjY2Vzc1Rva2VuKTogUHJvbWlzZTxPQXV0aEFjY2Vzc1Rva2VuPiB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIC8vIEdldHMgaW5zdGFuY2UgZnJvbSBkYXRhYmFzZSBlbnN1cmluZyBpdHMgZXhwaXJhdGlvblxuICAgIGNvbnN0IHRva2VuOiBhbnkgPSBhd2FpdCBPQXV0aEFjY2Vzc1Rva2VuLmZpbmRPbmUoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgYWNjZXNzVG9rZW4sXG4gICAgICAgIGV4cGlyZXM6IE1vcmVUaGFuKG5vdylcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0b2tlbikge1xuICAgICAgbGV0IGNsaWVudElkO1xuXG4gICAgICAvLyBIYW5kbGUgY2xpZW50IGlkIHR5cGVzXG4gICAgICBpZiAodG9rZW4uY2xpZW50IGluc3RhbmNlb2YgT2JqZWN0SWQpIHtcbiAgICAgICAgY2xpZW50SWQgPSB0b2tlbi5jbGllbnQudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRva2VuLmNsaWVudC5pZCA9PT0gdHlwZW9mIFwiYVwiKSB7XG4gICAgICAgIGNsaWVudElkID0gdG9rZW4uY2xpZW50LmlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xpZW50SWQgPSB0b2tlbi5jbGllbnQ7XG4gICAgICB9XG5cbiAgICAgIC8vIFBvcHVsYXRlIHRva2VuIGNsaWVudCBpbnN0YW5jZVxuICAgICAgdG9rZW4uY2xpZW50ID0gYXdhaXQgdGhpcy5nZXRDbGllbnRCeUlkKHsgaWQ6IGNsaWVudElkIH0pO1xuXG4gICAgICAvLyBQcmVwYXJlIHVzZXIgaW5zdGFuY2VcbiAgICAgIGlmICh0b2tlbi51c2VyICYmICF0b2tlbi51c2VyLnZpcnR1YWwpIHtcbiAgICAgICAgbGV0IHVzZXJJZDtcblxuICAgICAgICAvLyBIYW5kbGUgdXNlciBpZCB0eXBlc1xuICAgICAgICBpZiAodG9rZW4udXNlciBpbnN0YW5jZW9mIE9iamVjdElkKSB7XG4gICAgICAgICAgdXNlcklkID0gdG9rZW4udXNlci50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0b2tlbi51c2VyLmlkID09PSB0eXBlb2YgXCJhXCIpIHtcbiAgICAgICAgICB1c2VySWQgPSB0b2tlbi51c2VyLmlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVzZXJJZCA9IHRva2VuLnVzZXI7XG4gICAgICAgIH1cblxuICAgICAgICB0b2tlbi51c2VyID0gKGF3YWl0IHRoaXMuZ2V0VXNlckJ5SWQoeyBpZDogdXNlcklkIH0pKSB8fCB7XG4gICAgICAgICAgaWQ6IHRva2VuLnVzZXIsXG4gICAgICAgICAgdmlydHVhbDogdHJ1ZSxcbiAgICAgICAgICBjbGllbnQ6IHRva2VuLmNsaWVudFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRva2VuIGV4cGlyYXRpb25cbiAgICAgIHRva2VuLmFjY2Vzc1Rva2VuRXhwaXJlc0F0ID0gdG9rZW4uZXhwaXJlcztcbiAgICB9XG5cbiAgICByZXR1cm4geyAuLi50b2tlbiwgYWNjZXNzVG9rZW5FeHBpcmVzQXQ6IG5ldyBEYXRlKHRva2VuLmFjY2Vzc1Rva2VuRXhwaXJlc0F0KSB9O1xuICB9XG59XG4iXX0=