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
const models_1 = require("../models");
class OAuthClientJob extends ts_framework_1.BaseJob {
    constructor(options = {}) {
        super("OAuthClientJob", options);
    }
    /**
     * Create the initial OAuth 2.0 client instances.
     *
     * @param server The main server instance.
     */
    run(server) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield models_1.OAuthClient.count({})) === 0) {
                const count = (this.options.clients || []).length;
                ts_framework_1.Logger.debug("OAuthClientJob: Database is empty, creating initial OAuth 2.0 clients from seed", { count });
                // Prepare model instances for database insertion
                const models = this.options.clients.map(model => new models_1.OAuthClient(model));
                // Insert all in a single operation
                yield models_1.OAuthClient.insert(models);
            }
        });
    }
}
exports.default = OAuthClientJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhDbGllbnRKb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcGkvam9icy9PQXV0aENsaWVudEpvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQStDO0FBRS9DLHNDQUF3QztBQUV4QyxvQkFBb0MsU0FBUSxzQkFBTztJQUNqRCxZQUFZLE9BQU8sR0FBRyxFQUFFO1FBQ3RCLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLEdBQUcsQ0FBQyxNQUFrQjs7WUFDakMsSUFBSSxDQUFDLE1BQU0sb0JBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZDLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNsRCxxQkFBTSxDQUFDLEtBQUssQ0FBQyxpRkFBaUYsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBRTNHLGlEQUFpRDtnQkFDakQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxvQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRXpFLG1DQUFtQztnQkFDbkMsTUFBTSxvQkFBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNsQztRQUNILENBQUM7S0FBQTtDQUNGO0FBdEJELGlDQXNCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VKb2IsIExvZ2dlciB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcbmltcG9ydCBNYWluU2VydmVyIGZyb20gXCIuLi9NYWluU2VydmVyXCI7XG5pbXBvcnQgeyBPQXV0aENsaWVudCB9IGZyb20gXCIuLi9tb2RlbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0F1dGhDbGllbnRKb2IgZXh0ZW5kcyBCYXNlSm9iIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoXCJPQXV0aENsaWVudEpvYlwiLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIGluaXRpYWwgT0F1dGggMi4wIGNsaWVudCBpbnN0YW5jZXMuXG4gICAqXG4gICAqIEBwYXJhbSBzZXJ2ZXIgVGhlIG1haW4gc2VydmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJ1bihzZXJ2ZXI6IE1haW5TZXJ2ZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoKGF3YWl0IE9BdXRoQ2xpZW50LmNvdW50KHt9KSkgPT09IDApIHtcbiAgICAgIGNvbnN0IGNvdW50ID0gKHRoaXMub3B0aW9ucy5jbGllbnRzIHx8IFtdKS5sZW5ndGg7XG4gICAgICBMb2dnZXIuZGVidWcoXCJPQXV0aENsaWVudEpvYjogRGF0YWJhc2UgaXMgZW1wdHksIGNyZWF0aW5nIGluaXRpYWwgT0F1dGggMi4wIGNsaWVudHMgZnJvbSBzZWVkXCIsIHsgY291bnQgfSk7XG5cbiAgICAgIC8vIFByZXBhcmUgbW9kZWwgaW5zdGFuY2VzIGZvciBkYXRhYmFzZSBpbnNlcnRpb25cbiAgICAgIGNvbnN0IG1vZGVscyA9IHRoaXMub3B0aW9ucy5jbGllbnRzLm1hcChtb2RlbCA9PiBuZXcgT0F1dGhDbGllbnQobW9kZWwpKTtcblxuICAgICAgLy8gSW5zZXJ0IGFsbCBpbiBhIHNpbmdsZSBvcGVyYXRpb25cbiAgICAgIGF3YWl0IE9BdXRoQ2xpZW50Lmluc2VydChtb2RlbHMpO1xuICAgIH1cbiAgfVxufVxuIl19