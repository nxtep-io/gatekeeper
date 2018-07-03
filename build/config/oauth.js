"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
exports.default = {
    grantTypes: [
        'password',
        'client_credentials',
    ],
    clients: [
        { platform: 'api', clientId: 'root', clientSecret: 'root' },
    ],
    root: {
        name: 'John Connor',
        email: 'gatekeeper@nxtep.io',
        password: uuid.v4(),
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb25maWcvb2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFFN0Isa0JBQWU7SUFDYixVQUFVLEVBQUU7UUFDVixVQUFVO1FBQ1Ysb0JBQW9CO0tBQ3JCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRTtLQUM1RDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxhQUFhO1FBQ25CLEtBQUssRUFBRSxxQkFBcUI7UUFDNUIsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7S0FDcEI7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBncmFudFR5cGVzOiBbXG4gICAgJ3Bhc3N3b3JkJyxcbiAgICAnY2xpZW50X2NyZWRlbnRpYWxzJyxcbiAgXSxcbiAgY2xpZW50czogW1xuICAgIHsgcGxhdGZvcm06ICdhcGknLCBjbGllbnRJZDogJ3Jvb3QnLCBjbGllbnRTZWNyZXQ6ICdyb290JyB9LFxuICBdLFxuICByb290OiB7XG4gICAgbmFtZTogJ0pvaG4gQ29ubm9yJyxcbiAgICBlbWFpbDogJ2dhdGVrZWVwZXJAbnh0ZXAuaW8nLFxuICAgIHBhc3N3b3JkOiB1dWlkLnY0KCksXG4gIH0sXG59O1xuIl19