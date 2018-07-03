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
const Package = require("pjson");
const ts_framework_1 = require("ts-framework");
let StatusController = StatusController_1 = class StatusController {
    static getStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.success({
                name: Package.name,
                version: Package.version,
                environment: process.env.NODE_ENV || "development",
                uptime: Date.now() - StatusController_1.STARTED_AT
            });
        });
    }
};
StatusController.STARTED_AT = Date.now();
__decorate([
    ts_framework_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StatusController, "getStatus", null);
StatusController = StatusController_1 = __decorate([
    ts_framework_1.Controller("/status")
], StatusController);
exports.default = StatusController;
var StatusController_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdHVzQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwaS9jb250cm9sbGVycy9TdGF0dXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBaUM7QUFDakMsK0NBQStDO0FBRy9DLElBQXFCLGdCQUFnQix3QkFBckM7SUFJRSxNQUFNLENBQU8sU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHOztZQUM3QixHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUNWLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtnQkFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2dCQUN4QixXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYTtnQkFDbEQsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxrQkFBZ0IsQ0FBQyxVQUFVO2FBQ2pELENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNGLENBQUE7QUFYUSwyQkFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUcvQjtJQURDLGtCQUFHLENBQUMsR0FBRyxDQUFDOzs7O3VDQVFSO0FBWGtCLGdCQUFnQjtJQURwQyx5QkFBVSxDQUFDLFNBQVMsQ0FBQztHQUNELGdCQUFnQixDQVlwQztrQkFab0IsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUGFja2FnZSBmcm9tIFwicGpzb25cIjtcbmltcG9ydCB7IENvbnRyb2xsZXIsIEdldCB9IGZyb20gXCJ0cy1mcmFtZXdvcmtcIjtcblxuQENvbnRyb2xsZXIoXCIvc3RhdHVzXCIpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0dXNDb250cm9sbGVyIHtcbiAgc3RhdGljIFNUQVJURURfQVQgPSBEYXRlLm5vdygpO1xuXG4gIEBHZXQoXCIvXCIpXG4gIHN0YXRpYyBhc3luYyBnZXRTdGF0dXMocmVxLCByZXMpIHtcbiAgICByZXMuc3VjY2Vzcyh7XG4gICAgICBuYW1lOiBQYWNrYWdlLm5hbWUsXG4gICAgICB2ZXJzaW9uOiBQYWNrYWdlLnZlcnNpb24sXG4gICAgICBlbnZpcm9ubWVudDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgXCJkZXZlbG9wbWVudFwiLFxuICAgICAgdXB0aW1lOiBEYXRlLm5vdygpIC0gU3RhdHVzQ29udHJvbGxlci5TVEFSVEVEX0FUXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==