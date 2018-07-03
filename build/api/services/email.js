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
const ts_framework_notification_1 = require("ts-framework-notification");
class EmailService extends ts_framework_notification_1.Email {
    /**
     * Gets the singleton email service.
     *
     * @param options The service options
     */
    static getInstance(options) {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService(Object.assign({ debug: !(options && options.connectionUrl) }, options));
        }
        return EmailService.instance;
    }
    /**
     * Sends an email message.
     *
     * @param options The message options
     */
    send(options) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            const { locals } = options, otherOptions = __rest(options, ["locals"]);
            return _super("send").call(this, new ts_framework_notification_1.EmailMessage(Object.assign({ from: "noreply@nxtep.io", locals: Object.assign({}, EmailService.baseLocals, locals) }, otherOptions)));
        });
    }
}
/**
 * The base locals to all email messages, can be overriden in method locals.
 */
EmailService.baseLocals = {
    logo: "https://i.imgur.com/QTYUAxG.png",
    footer: '<div style="text-align:center">nxtep.io</div>',
    company: {
        title: "gatekeeper",
        subtitle: '<a href="https://www.nxtep.io" style="color: white">www.nxtep.io</a>'
    }
};
exports.EmailService = EmailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcGkvc2VydmljZXMvZW1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUFxRjtBQUdyRixrQkFBMEIsU0FBUSxpQ0FBSztJQWtCckM7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBNkI7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDMUIsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLFlBQVksaUJBQ3RDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFDdkMsT0FBTyxFQUNWLENBQUM7U0FDSjtRQUNELE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLElBQUksQ0FBQyxPQUEyQjs7O1lBQzNDLE1BQU0sRUFBRSxNQUFNLEtBQXNCLE9BQU8sRUFBM0IsMENBQTJCLENBQUM7WUFFNUMsT0FBTyxjQUFVLFlBQ2YsSUFBSSx3Q0FBWSxpQkFDZCxJQUFJLEVBQUUsa0JBQWtCLEVBQ3hCLE1BQU0sb0JBQ0QsWUFBWSxDQUFDLFVBQVUsRUFDdkIsTUFBTSxLQUVSLFlBQVksRUFDZixFQUNGO1FBQ0osQ0FBQztLQUFBOztBQTdDRDs7R0FFRztBQUNjLHVCQUFVLEdBQUc7SUFDNUIsSUFBSSxFQUFFLGlDQUFpQztJQUN2QyxNQUFNLEVBQUUsK0NBQStDO0lBQ3ZELE9BQU8sRUFBRTtRQUNQLEtBQUssRUFBRSxZQUFZO1FBQ25CLFFBQVEsRUFBRSxzRUFBc0U7S0FDakY7Q0FDRixDQUFDO0FBaEJKLG9DQW9EQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtYWlsLCBFbWFpbE1lc3NhZ2UsIEVtYWlsU2VydmljZU9wdGlvbnMgfSBmcm9tIFwidHMtZnJhbWV3b3JrLW5vdGlmaWNhdGlvblwiO1xuaW1wb3J0IHsgRW1haWxNZXNzYWdlU2NoZW1hIH0gZnJvbSBcInRzLWZyYW1ld29yay1ub3RpZmljYXRpb24vZGlzdC90eXBlcy9lbWFpbFwiO1xuXG5leHBvcnQgY2xhc3MgRW1haWxTZXJ2aWNlIGV4dGVuZHMgRW1haWwge1xuICAvKipcbiAgICogVGhlIHNpbmdsZXRvbiBzZXJ2aWNlIGluc3RhbmNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogRW1haWxTZXJ2aWNlO1xuXG4gIC8qKlxuICAgKiBUaGUgYmFzZSBsb2NhbHMgdG8gYWxsIGVtYWlsIG1lc3NhZ2VzLCBjYW4gYmUgb3ZlcnJpZGVuIGluIG1ldGhvZCBsb2NhbHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhdGljIGJhc2VMb2NhbHMgPSB7XG4gICAgbG9nbzogXCJodHRwczovL2kuaW1ndXIuY29tL1FUWVVBeEcucG5nXCIsXG4gICAgZm9vdGVyOiAnPGRpdiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCI+bnh0ZXAuaW88L2Rpdj4nLFxuICAgIGNvbXBhbnk6IHtcbiAgICAgIHRpdGxlOiBcImdhdGVrZWVwZXJcIixcbiAgICAgIHN1YnRpdGxlOiAnPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm54dGVwLmlvXCIgc3R5bGU9XCJjb2xvcjogd2hpdGVcIj53d3cubnh0ZXAuaW88L2E+J1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGVtYWlsIHNlcnZpY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBzZXJ2aWNlIG9wdGlvbnNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2Uob3B0aW9ucz86IEVtYWlsU2VydmljZU9wdGlvbnMpOiBFbWFpbFNlcnZpY2Uge1xuICAgIGlmICghRW1haWxTZXJ2aWNlLmluc3RhbmNlKSB7XG4gICAgICBFbWFpbFNlcnZpY2UuaW5zdGFuY2UgPSBuZXcgRW1haWxTZXJ2aWNlKHtcbiAgICAgICAgZGVidWc6ICEob3B0aW9ucyAmJiBvcHRpb25zLmNvbm5lY3Rpb25VcmwpLFxuICAgICAgICAuLi5vcHRpb25zXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIEVtYWlsU2VydmljZS5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhbiBlbWFpbCBtZXNzYWdlLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgbWVzc2FnZSBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChvcHRpb25zOiBFbWFpbE1lc3NhZ2VTY2hlbWEpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHsgbG9jYWxzLCAuLi5vdGhlck9wdGlvbnMgfSA9IG9wdGlvbnM7XG5cbiAgICByZXR1cm4gc3VwZXIuc2VuZChcbiAgICAgIG5ldyBFbWFpbE1lc3NhZ2Uoe1xuICAgICAgICBmcm9tOiBcIm5vcmVwbHlAbnh0ZXAuaW9cIixcbiAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgLi4uRW1haWxTZXJ2aWNlLmJhc2VMb2NhbHMsXG4gICAgICAgICAgLi4ubG9jYWxzXG4gICAgICAgIH0sXG4gICAgICAgIC4uLm90aGVyT3B0aW9uc1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=