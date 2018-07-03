"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = {
    type: "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "3306", 10),
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "root",
    database: "example_sql",
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, "../api/models/**/*.ts")],
    migrations: [path.join(__dirname, "../api/migrations/**/*.ts")],
    subscribers: [path.join(__dirname, "../api/subscribers/**/*.ts")],
    cli: {
        entitiesDir: path.join(__dirname, "../api/models/**/*.ts"),
        migrationsDir: path.join(__dirname, "../api/migrations/**/*.ts"),
        subscribersDir: path.join(__dirname, "../api/subscribers/**/*.ts")
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb25maWcvZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFFN0Isa0JBQWU7SUFDYixJQUFJLEVBQUUsT0FBTztJQUNiLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSxXQUFXO0lBQzlDLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUN2RCxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksTUFBTTtJQUM3QyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxNQUFNO0lBQ2pELFFBQVEsRUFBRSxhQUFhO0lBQ3ZCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLE9BQU8sRUFBRSxLQUFLO0lBQ2QsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztJQUN6RCxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0lBQy9ELFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDRCQUE0QixDQUFDLENBQUM7SUFDakUsR0FBRyxFQUFFO1FBQ0gsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHVCQUF1QixDQUFDO1FBQzFELGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQztRQUNoRSxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsNEJBQTRCLENBQUM7S0FDbkU7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHR5cGU6IFwibXlzcWxcIixcbiAgaG9zdDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfSE9TVCB8fCBcImxvY2FsaG9zdFwiLFxuICBwb3J0OiBwYXJzZUludChwcm9jZXNzLmVudi5EQVRBQkFTRV9QT1JUIHx8IFwiMzMwNlwiLCAxMCksXG4gIHVzZXJuYW1lOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VU0VSIHx8IFwicm9vdFwiLFxuICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfUEFTU1dPUkQgfHwgXCJyb290XCIsXG4gIGRhdGFiYXNlOiBcImV4YW1wbGVfc3FsXCIsXG4gIHN5bmNocm9uaXplOiB0cnVlLFxuICBsb2dnaW5nOiBmYWxzZSxcbiAgZW50aXRpZXM6IFtwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL2FwaS9tb2RlbHMvKiovKi50c1wiKV0sXG4gIG1pZ3JhdGlvbnM6IFtwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL2FwaS9taWdyYXRpb25zLyoqLyoudHNcIildLFxuICBzdWJzY3JpYmVyczogW3BhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vYXBpL3N1YnNjcmliZXJzLyoqLyoudHNcIildLFxuICBjbGk6IHtcbiAgICBlbnRpdGllc0RpcjogcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9hcGkvbW9kZWxzLyoqLyoudHNcIiksXG4gICAgbWlncmF0aW9uc0RpcjogcGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9hcGkvbWlncmF0aW9ucy8qKi8qLnRzXCIpLFxuICAgIHN1YnNjcmliZXJzRGlyOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL2FwaS9zdWJzY3JpYmVycy8qKi8qLnRzXCIpXG4gIH1cbn07XG4iXX0=