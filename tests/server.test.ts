import MongodbMemoryServer from "mongodb-memory-server";
import * as mongoose from "mongoose";
import * as Package from "pjson";
import * as request from "supertest";
import MainServer from "../api/MainServer";

describe("api.MainServer", () => {
  let mongoServer;
  let database;

  beforeAll(async () => {
    mongoServer = new MongodbMemoryServer();
    const MainDatabase = require("../api/MainDatabase").default;
    database = MainDatabase.getInstance({ url: await mongoServer.getConnectionString() });
  });

  afterAll(async () => {
    if (mongoose.connection.readyState) {
      await mongoose.disconnect();
    }
    await mongoServer.stop();
    process.exit(0);
  });

  it("should respond to a simple status request", async () => {
    const server = new MainServer({ port: 3030 });
    await server.listen();

    // Perform a simple request to get a 200 response
    await request(server.app)
      .get("/status")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(async response => {
        expect(response.body.name).toBe(Package.name);
        expect(response.body.version).toBe(Package.version);
        await server.stop();
      });
  });
});
