const supertest = require("supertest");
const server = require("../api/server");

describe("intergration tests for endpoints", () => {
  it("GET /", async () => {
    const res = await supertest(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("API is running");
  });
});
