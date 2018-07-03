"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const oauth_1 = require("./oauth");
const server_1 = require("./server");
const smtp_1 = require("./smtp");
const user_1 = require("./user");
exports.default = {
    server: server_1.default,
    oauth: oauth_1.default,
    smtp: smtp_1.default,
    user: user_1.default,
    database: database_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb25maWcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBa0M7QUFDbEMsbUNBQTRCO0FBQzVCLHFDQUE4QjtBQUM5QixpQ0FBMEI7QUFDMUIsaUNBQTBCO0FBRTFCLGtCQUFlO0lBQ2IsTUFBTSxFQUFOLGdCQUFNO0lBQ04sS0FBSyxFQUFMLGVBQUs7SUFDTCxJQUFJLEVBQUosY0FBSTtJQUNKLElBQUksRUFBSixjQUFJO0lBQ0osUUFBUSxFQUFSLGtCQUFRO0NBQ1QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkYXRhYmFzZSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xuaW1wb3J0IG9hdXRoIGZyb20gXCIuL29hdXRoXCI7XG5pbXBvcnQgc2VydmVyIGZyb20gXCIuL3NlcnZlclwiO1xuaW1wb3J0IHNtdHAgZnJvbSBcIi4vc210cFwiO1xuaW1wb3J0IHVzZXIgZnJvbSBcIi4vdXNlclwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNlcnZlcixcbiAgb2F1dGgsXG4gIHNtdHAsXG4gIHVzZXIsXG4gIGRhdGFiYXNlXG59O1xuIl19