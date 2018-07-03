"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jobs_1 = require("../api/jobs");
const oauth_1 = require("./oauth");
const smtp_1 = require("./smtp");
exports.default = {
    cors: true,
    userAgent: true,
    smtp: smtp_1.default,
    newrelic: process.env.NEW_RELIC_KEY,
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    sentry: process.env.SENTRY_DSN ? { dsn: process.env.SENTRY_DSN } : undefined,
    startup: {
        pipeline: [
            /* Create the OAuth 2.0 clients for authentication */
            new jobs_1.OAuthClientJob({ clients: oauth_1.default.clients }),
            /* Create the root Admin user */
            new jobs_1.OAuthRootUserJob({ verbose: true, root: oauth_1.default.root })
        ]
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29uZmlnL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRDtBQUMvRCxtQ0FBa0M7QUFDbEMsaUNBQWdDO0FBRWhDLGtCQUFlO0lBQ2IsSUFBSSxFQUFFLElBQUk7SUFDVixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksRUFBRSxjQUFVO0lBQ2hCLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWE7SUFDbkMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWE7SUFDMUMsSUFBSSxFQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBWSxJQUFJLElBQUk7SUFDdkMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQzVFLE9BQU8sRUFBRTtRQUNQLFFBQVEsRUFBRTtZQUNSLHFEQUFxRDtZQUNyRCxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BELGdDQUFnQztZQUNoQyxJQUFJLHVCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBVyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2hFO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT0F1dGhDbGllbnRKb2IsIE9BdXRoUm9vdFVzZXJKb2IgfSBmcm9tIFwiLi4vYXBpL2pvYnNcIjtcbmltcG9ydCBPQXV0aENvbmZpZyBmcm9tIFwiLi9vYXV0aFwiO1xuaW1wb3J0IFNtdHBDb25maWcgZnJvbSBcIi4vc210cFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvcnM6IHRydWUsXG4gIHVzZXJBZ2VudDogdHJ1ZSxcbiAgc210cDogU210cENvbmZpZyxcbiAgbmV3cmVsaWM6IHByb2Nlc3MuZW52Lk5FV19SRUxJQ19LRVksXG4gIGVudjogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgXCJkZXZlbG9wbWVudFwiLFxuICBwb3J0OiAocHJvY2Vzcy5lbnYuUE9SVCBhcyBhbnkpIHx8IDMwMDAsXG4gIHNlbnRyeTogcHJvY2Vzcy5lbnYuU0VOVFJZX0RTTiA/IHsgZHNuOiBwcm9jZXNzLmVudi5TRU5UUllfRFNOIH0gOiB1bmRlZmluZWQsXG4gIHN0YXJ0dXA6IHtcbiAgICBwaXBlbGluZTogW1xuICAgICAgLyogQ3JlYXRlIHRoZSBPQXV0aCAyLjAgY2xpZW50cyBmb3IgYXV0aGVudGljYXRpb24gKi9cbiAgICAgIG5ldyBPQXV0aENsaWVudEpvYih7IGNsaWVudHM6IE9BdXRoQ29uZmlnLmNsaWVudHMgfSksXG4gICAgICAvKiBDcmVhdGUgdGhlIHJvb3QgQWRtaW4gdXNlciAqL1xuICAgICAgbmV3IE9BdXRoUm9vdFVzZXJKb2IoeyB2ZXJib3NlOiB0cnVlLCByb290OiBPQXV0aENvbmZpZy5yb290IH0pXG4gICAgXVxuICB9XG59O1xuIl19