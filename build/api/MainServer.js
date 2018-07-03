"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const ts_framework_1 = require("ts-framework");
const ts_framework_sql_1 = require("ts-framework-sql");
const helpers_1 = require("./helpers");
const MainDatabase_1 = require("./MainDatabase");
const services_1 = require("./services");
// Prepare the database instance as soon as possible to prevent clashes in
// model registration. We can connect to the real database later.
const logger = new ts_framework_sql_1.Logger({ level: "silly" });
const database = MainDatabase_1.default.getInstance();
class MainServer extends ts_framework_1.default {
    constructor(config) {
        const otherOptions = __rest(config, []);
        const app = express();
        // Setup priority routes, before controller router
        app.get("/", (req, res) => res.redirect("/status"));
        // handle every other route with index.html, which will contain
        // a script tag to your application's JavaScript file(s).
        app.get("/ui/*", (request, response) => {
            response.sendFile(path.resolve(__dirname, "../ui/dist/index.html"));
        });
        super(Object.assign({ logger, 
            // TODO: Move this to the config files
            secret: "PLEASE_CHANGE_ME", port: process.env.PORT || 3000, controllers: require("./controllers").default, oauth: {
                useErrorHandler: true,
                allowExtendedTokenAttributes: true,
                model: require("./models/oauth2/middleware").default,
                token: {
                    allowExtendedTokenAttributes: true,
                    extendedGrantTypes: {
                        impersonate: helpers_1.ImpersonateGrantType
                    }
                }
            } }, otherOptions), app);
        this.database = database;
    }
    /**
     * Handles pre-startup routines, such as starting the database up.
     *
     * @returns {Promise<void>}
     */
    onStartup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect to database instance
                yield this.database.connect();
            }
            catch (error) {
                this.logger.error("Unknown database error: " + error.message, error);
                process.exit(-1);
                return;
            }
            // Initialize the email service
            if (this.config.smtp && this.config.smtp.connectionUrl) {
                services_1.EmailService.getInstance(Object.assign({}, this.config.smtp));
            }
            else {
                // TODO: Crash the API for safety or log email sendings in console
                this.logger.warn("MainServer: The Email service connection url is not available" +
                    ', set it using the SMTP_URL env variable or in the "config/smtp.ts" file');
                services_1.EmailService.getInstance(Object.assign({ from: "example@company.com" }, this.config.smtp));
            }
            // Run startup jobs
            try {
                yield this.runStartupJobs();
            }
            catch (error) {
                this.logger.error("Unknown startup error: " + error.message, error);
                process.exit(-1);
                return;
            }
            this.logger.info(`Server listening in port: ${this.config.port}`);
        });
    }
    /**
     * Execute all statup jobs in parallel.
     */
    runStartupJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = this.config.startup || {};
            const pipeline = jobs.pipeline || [];
            if (pipeline.length) {
                this.logger.debug("Running startup pipeline", { jobs: pipeline.map(p => p.name || "unknown") });
                yield Promise.all(jobs.pipeline.map(job => job.run(this)));
                this.logger.debug("Successfully ran all startup jobs");
                return;
            }
        });
    }
}
exports.default = MainServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpblNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2FwaS9NYWluU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBbUM7QUFDbkMsNkJBQTZCO0FBQzdCLCtDQUE4RDtBQUU5RCx1REFBMEM7QUFDMUMsdUNBQWlEO0FBQ2pELGlEQUEwQztBQUMxQyx5Q0FBdUQ7QUFFdkQsMEVBQTBFO0FBQzFFLGlFQUFpRTtBQUNqRSxNQUFNLE1BQU0sR0FBRyxJQUFJLHlCQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUM5QyxNQUFNLFFBQVEsR0FBRyxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBbUI1QyxnQkFBZ0MsU0FBUSxzQkFBTTtJQUk1QyxZQUFZLE1BQXlCO1FBQ25DLE1BQVEsaUNBQTBCLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFFdEIsa0RBQWtEO1FBQ2xELEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRXBELCtEQUErRDtRQUMvRCx5REFBeUQ7UUFDekQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDckMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQ0gsZ0JBQ0UsTUFBTTtZQUNOLHNDQUFzQztZQUN0QyxNQUFNLEVBQUUsa0JBQWtCLEVBQzFCLElBQUksRUFBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQVksSUFBSSxJQUFJLEVBQ3ZD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Q0FDRjtBQWhHRCw2QkFnR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgU2VydmVyLCB7IEJhc2VKb2IsIFNlcnZlck9wdGlvbnMgfSBmcm9tIFwidHMtZnJhbWV3b3JrXCI7XG5pbXBvcnQgeyBUZXh0R2F0ZXdheSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstbm90aWZpY2F0aW9uXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwidHMtZnJhbWV3b3JrLXNxbFwiO1xuaW1wb3J0IHsgSW1wZXJzb25hdGVHcmFudFR5cGUgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQgTWFpbkRhdGFiYXNlIGZyb20gXCIuL01haW5EYXRhYmFzZVwiO1xuaW1wb3J0IHsgRW1haWxTZXJ2aWNlLCBUZXh0U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzXCI7XG5cbi8vIFByZXBhcmUgdGhlIGRhdGFiYXNlIGluc3RhbmNlIGFzIHNvb24gYXMgcG9zc2libGUgdG8gcHJldmVudCBjbGFzaGVzIGluXG4vLyBtb2RlbCByZWdpc3RyYXRpb24uIFdlIGNhbiBjb25uZWN0IHRvIHRoZSByZWFsIGRhdGFiYXNlIGxhdGVyLlxuY29uc3QgbG9nZ2VyID0gbmV3IExvZ2dlcih7IGxldmVsOiBcInNpbGx5XCIgfSk7XG5jb25zdCBkYXRhYmFzZSA9IE1haW5EYXRhYmFzZS5nZXRJbnN0YW5jZSgpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1haW5TZXJ2ZXJPcHRpb25zIGV4dGVuZHMgU2VydmVyT3B0aW9ucyB7XG4gIGVudj86IHN0cmluZztcbiAgc210cD86IHtcbiAgICBmcm9tOiBzdHJpbmc7XG4gICAgY29ubmVjdGlvblVybD86IHN0cmluZztcbiAgfTtcbiAgc21zPzoge1xuICAgIGZyb206IHN0cmluZztcbiAgICBnYXRld2F5OiBUZXh0R2F0ZXdheTtcbiAgfTtcbiAgbmV3cmVsaWM/OiBzdHJpbmc7XG4gIHN0YXJ0dXA/OiB7XG4gICAgcGlwZWxpbmU6IEJhc2VKb2JbXTtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TZXJ2ZXIgZXh0ZW5kcyBTZXJ2ZXIge1xuICBkYXRhYmFzZTogTWFpbkRhdGFiYXNlO1xuICBjb25maWc6IE1haW5TZXJ2ZXJPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTWFpblNlcnZlck9wdGlvbnMpIHtcbiAgICBjb25zdCB7IC4uLm90aGVyT3B0aW9ucyB9ID0gY29uZmlnO1xuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuICAgIC8vIFNldHVwIHByaW9yaXR5IHJvdXRlcywgYmVmb3JlIGNvbnRyb2xsZXIgcm91dGVyXG4gICAgYXBwLmdldChcIi9cIiwgKHJlcSwgcmVzKSA9PiByZXMucmVkaXJlY3QoXCIvc3RhdHVzXCIpKTtcblxuICAgIC8vIGhhbmRsZSBldmVyeSBvdGhlciByb3V0ZSB3aXRoIGluZGV4Lmh0bWwsIHdoaWNoIHdpbGwgY29udGFpblxuICAgIC8vIGEgc2NyaXB0IHRhZyB0byB5b3VyIGFwcGxpY2F0aW9uJ3MgSmF2YVNjcmlwdCBmaWxlKHMpLlxuICAgIGFwcC5nZXQoXCIvdWkvKlwiLCAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgIHJlc3BvbnNlLnNlbmRGaWxlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vdWkvZGlzdC9pbmRleC5odG1sXCIpKTtcbiAgICB9KTtcblxuICAgIHN1cGVyKFxuICAgICAge1xuICAgICAgICBsb2dnZXIsXG4gICAgICAgIC8vIFRPRE86IE1vdmUgdGhpcyB0byB0aGUgY29uZmlnIGZpbGVzXG4gICAgICAgIHNlY3JldDogXCJQTEVBU0VfQ0hBTkdFX01FXCIsXG4gICAgICAgIHBvcnQ6IChwcm9jZXNzLmVudi5QT1JUIGFzIGFueSkgfHwgMzAwMCxcbiAgICAgICAgY29udHJvbGxlcnM6IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzXCIpLmRlZmF1bHQsXG4gICAgICAgIG9hdXRoOiB7XG4gICAgICAgICAgdXNlRXJyb3JIYW5kbGVyOiB0cnVlLFxuICAgICAgICAgIGFsbG93RXh0ZW5kZWRUb2tlbkF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgbW9kZWw6IHJlcXVpcmUoXCIuL21vZGVscy9vYXV0aDIvbWlkZGxld2FyZVwiKS5kZWZhdWx0LFxuICAgICAgICAgIHRva2VuOiB7XG4gICAgICAgICAgICBhbGxvd0V4dGVuZGVkVG9rZW5BdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgZXh0ZW5kZWRHcmFudFR5cGVzOiB7XG4gICAgICAgICAgICAgIGltcGVyc29uYXRlOiBJbXBlcnNvbmF0ZUdyYW50VHlwZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLi4ub3RoZXJPcHRpb25zXG4gICAgICB9IGFzIE1haW5TZXJ2ZXJPcHRpb25zLFxuICAgICAgYXBwXG4gICAgKTtcblxuICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHByZS1zdGFydHVwIHJvdXRpbmVzLCBzdWNoIGFzIHN0YXJ0aW5nIHRoZSBkYXRhYmFzZSB1cC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBhc3luYyBvblN0YXJ0dXAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIENvbm5lY3QgdG8gZGF0YWJhc2UgaW5zdGFuY2VcbiAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UuY29ubmVjdCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIlVua25vd24gZGF0YWJhc2UgZXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZSwgZXJyb3IpO1xuICAgICAgcHJvY2Vzcy5leGl0KC0xKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBlbWFpbCBzZXJ2aWNlXG4gICAgaWYgKHRoaXMuY29uZmlnLnNtdHAgJiYgdGhpcy5jb25maWcuc210cC5jb25uZWN0aW9uVXJsKSB7XG4gICAgICBFbWFpbFNlcnZpY2UuZ2V0SW5zdGFuY2UoeyAuLi50aGlzLmNvbmZpZy5zbXRwIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPOiBDcmFzaCB0aGUgQVBJIGZvciBzYWZldHkgb3IgbG9nIGVtYWlsIHNlbmRpbmdzIGluIGNvbnNvbGVcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgIFwiTWFpblNlcnZlcjogVGhlIEVtYWlsIHNlcnZpY2UgY29ubmVjdGlvbiB1cmwgaXMgbm90IGF2YWlsYWJsZVwiICtcbiAgICAgICAgICAnLCBzZXQgaXQgdXNpbmcgdGhlIFNNVFBfVVJMIGVudiB2YXJpYWJsZSBvciBpbiB0aGUgXCJjb25maWcvc210cC50c1wiIGZpbGUnXG4gICAgICApO1xuICAgICAgRW1haWxTZXJ2aWNlLmdldEluc3RhbmNlKHsgZnJvbTogXCJleGFtcGxlQGNvbXBhbnkuY29tXCIsIC4uLnRoaXMuY29uZmlnLnNtdHAgfSk7XG4gICAgfVxuXG4gICAgLy8gUnVuIHN0YXJ0dXAgam9ic1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLnJ1blN0YXJ0dXBKb2JzKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwiVW5rbm93biBzdGFydHVwIGVycm9yOiBcIiArIGVycm9yLm1lc3NhZ2UsIGVycm9yKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgtMSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5sb2dnZXIuaW5mbyhgU2VydmVyIGxpc3RlbmluZyBpbiBwb3J0OiAke3RoaXMuY29uZmlnLnBvcnR9YCk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZSBhbGwgc3RhdHVwIGpvYnMgaW4gcGFyYWxsZWwuXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgcnVuU3RhcnR1cEpvYnMoKSB7XG4gICAgY29uc3Qgam9icyA9IHRoaXMuY29uZmlnLnN0YXJ0dXAgfHwgKHt9IGFzIGFueSk7XG4gICAgY29uc3QgcGlwZWxpbmUgPSBqb2JzLnBpcGVsaW5lIHx8IFtdO1xuXG4gICAgaWYgKHBpcGVsaW5lLmxlbmd0aCkge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJSdW5uaW5nIHN0YXJ0dXAgcGlwZWxpbmVcIiwgeyBqb2JzOiBwaXBlbGluZS5tYXAocCA9PiBwLm5hbWUgfHwgXCJ1bmtub3duXCIpIH0pO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoam9icy5waXBlbGluZS5tYXAoam9iID0+IGpvYi5ydW4odGhpcykpKTtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiU3VjY2Vzc2Z1bGx5IHJhbiBhbGwgc3RhcnR1cCBqb2JzXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufVxuIl19