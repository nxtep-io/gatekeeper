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
const ts_framework_notification_1 = require("ts-framework-notification");
class TextService extends ts_framework_notification_1.Text {
    /**
     * Gets the singleton Text service.
     *
     * @param connectionUrl The Text connection url
     */
    static getInstance(options) {
        if (!TextService.instance) {
            TextService.instance = new TextService(Object.assign({}, options));
        }
        return TextService.instance;
    }
    /**
     * Sends a a text message using the SMS gateway.
     *
     * @param options The message options
     */
    send(options) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return _super("send").call(this, options);
        });
    }
}
exports.TextService = TextService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwaS9zZXJ2aWNlcy90ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5RUFBcUc7QUFFckcsaUJBQXlCLFNBQVEsZ0NBQUk7SUFNbkM7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBNEI7UUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7WUFDekIsV0FBVyxDQUFDLFFBQVEsR0FBRyxJQUFJLFdBQVcsbUJBQU0sT0FBTyxFQUFHLENBQUM7U0FDeEQ7UUFDRCxPQUFPLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxJQUFJLENBQUMsT0FBMEI7OztZQUMxQyxPQUFPLGNBQVUsWUFBQyxPQUFPLEVBQUU7UUFDN0IsQ0FBQztLQUFBO0NBQ0Y7QUExQkQsa0NBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dCwgVGV4dE1lc3NhZ2UsIFRleHRNZXNzYWdlU2NoZW1hLCBUZXh0U2VydmljZU9wdGlvbnMgfSBmcm9tIFwidHMtZnJhbWV3b3JrLW5vdGlmaWNhdGlvblwiO1xuXG5leHBvcnQgY2xhc3MgVGV4dFNlcnZpY2UgZXh0ZW5kcyBUZXh0IHtcbiAgLyoqXG4gICAqIFRoZSBzaW5nbGV0b24gc2VydmljZSBpbnN0YW5jZS5cbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFRleHRTZXJ2aWNlO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzaW5nbGV0b24gVGV4dCBzZXJ2aWNlLlxuICAgKlxuICAgKiBAcGFyYW0gY29ubmVjdGlvblVybCBUaGUgVGV4dCBjb25uZWN0aW9uIHVybFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZShvcHRpb25zPzogVGV4dFNlcnZpY2VPcHRpb25zKTogVGV4dFNlcnZpY2Uge1xuICAgIGlmICghVGV4dFNlcnZpY2UuaW5zdGFuY2UpIHtcbiAgICAgIFRleHRTZXJ2aWNlLmluc3RhbmNlID0gbmV3IFRleHRTZXJ2aWNlKHsgLi4ub3B0aW9ucyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFRleHRTZXJ2aWNlLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgYSB0ZXh0IG1lc3NhZ2UgdXNpbmcgdGhlIFNNUyBnYXRld2F5LlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgbWVzc2FnZSBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2VuZChvcHRpb25zOiBUZXh0TWVzc2FnZVNjaGVtYSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHN1cGVyLnNlbmQob3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==