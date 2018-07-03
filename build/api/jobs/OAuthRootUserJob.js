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
class OAuthRootUserJob extends ts_framework_1.BaseJob {
    constructor(options = {}) {
        super("OAuthRootUserJob", options);
    }
    /**
     * Create the initial OAuth 2.0 root user instance.
     *
     * @param server The main server instance.
     */
    run(server) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield models_1.User.count({ where: { role: "root" } })) === 0) {
                ts_framework_1.Logger.debug(`OAuthRootUserJob: Database is empty, creating root user...`);
                yield models_1.User.create(Object.assign({ role: "root" }, this.options.root));
                if (this.options.verbose) {
                    ts_framework_1.Logger.info("\n-------------------------------------------------------------\n" +
                        "                                                               \n" +
                        "              NOTICE: A root user was generated                \n" +
                        "                                                               \n" +
                        "                                                               \n" +
                        `            Name:       ${this.options.root.name}             \n` +
                        `            Email:      ${this.options.root.email}            \n` +
                        `            Password:   ${this.options.root.password}         \n` +
                        "                                                               \n" +
                        "-------------------------------------------------------------");
                }
            }
        });
    }
}
exports.default = OAuthRootUserJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhSb290VXNlckpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwaS9qb2JzL09BdXRoUm9vdFVzZXJKb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUErQztBQUUvQyxzQ0FBaUM7QUFFakMsc0JBQXNDLFNBQVEsc0JBQU87SUFDbkQsWUFBWSxPQUFPLEdBQUcsRUFBRTtRQUN0QixLQUFLLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxHQUFHLENBQUMsTUFBa0I7O1lBQ2pDLElBQUksQ0FBQyxNQUFNLGFBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN6RCxxQkFBTSxDQUFDLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO2dCQUMzRSxNQUFNLGFBQUksQ0FBQyxNQUFNLGlCQUFHLElBQUksRUFBRSxNQUFNLElBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztnQkFFMUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtvQkFDeEIscUJBQU0sQ0FBQyxJQUFJLENBQ1QsbUVBQW1FO3dCQUNqRSxtRUFBbUU7d0JBQ25FLG1FQUFtRTt3QkFDbkUsbUVBQW1FO3dCQUNuRSxtRUFBbUU7d0JBQ25FLDJCQUEyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQjt3QkFDbEUsMkJBQTJCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssZ0JBQWdCO3dCQUNsRSwyQkFBMkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxhQUFhO3dCQUNsRSxtRUFBbUU7d0JBQ25FLCtEQUErRCxDQUNsRSxDQUFDO2lCQUNIO2FBQ0Y7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQS9CRCxtQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlSm9iLCBMb2dnZXIgfSBmcm9tIFwidHMtZnJhbWV3b3JrXCI7XG5pbXBvcnQgTWFpblNlcnZlciBmcm9tIFwiLi4vTWFpblNlcnZlclwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0F1dGhSb290VXNlckpvYiBleHRlbmRzIEJhc2VKb2Ige1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihcIk9BdXRoUm9vdFVzZXJKb2JcIiwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBpbml0aWFsIE9BdXRoIDIuMCByb290IHVzZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBzZXJ2ZXIgVGhlIG1haW4gc2VydmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJ1bihzZXJ2ZXI6IE1haW5TZXJ2ZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoKGF3YWl0IFVzZXIuY291bnQoeyB3aGVyZTogeyByb2xlOiBcInJvb3RcIiB9IH0pKSA9PT0gMCkge1xuICAgICAgTG9nZ2VyLmRlYnVnKGBPQXV0aFJvb3RVc2VySm9iOiBEYXRhYmFzZSBpcyBlbXB0eSwgY3JlYXRpbmcgcm9vdCB1c2VyLi4uYCk7XG4gICAgICBhd2FpdCBVc2VyLmNyZWF0ZSh7IHJvbGU6IFwicm9vdFwiLCAuLi50aGlzLm9wdGlvbnMucm9vdCB9KTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICAgIExvZ2dlci5pbmZvKFxuICAgICAgICAgIFwiXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblwiICtcbiAgICAgICAgICAgIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXCIgK1xuICAgICAgICAgICAgXCIgICAgICAgICAgICAgIE5PVElDRTogQSByb290IHVzZXIgd2FzIGdlbmVyYXRlZCAgICAgICAgICAgICAgICBcXG5cIiArXG4gICAgICAgICAgICBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblwiICtcbiAgICAgICAgICAgIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXCIgK1xuICAgICAgICAgICAgYCAgICAgICAgICAgIE5hbWU6ICAgICAgICR7dGhpcy5vcHRpb25zLnJvb3QubmFtZX0gICAgICAgICAgICAgXFxuYCArXG4gICAgICAgICAgICBgICAgICAgICAgICAgRW1haWw6ICAgICAgJHt0aGlzLm9wdGlvbnMucm9vdC5lbWFpbH0gICAgICAgICAgICBcXG5gICtcbiAgICAgICAgICAgIGAgICAgICAgICAgICBQYXNzd29yZDogICAke3RoaXMub3B0aW9ucy5yb290LnBhc3N3b3JkfSAgICAgICAgIFxcbmAgK1xuICAgICAgICAgICAgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cIiArXG4gICAgICAgICAgICBcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19