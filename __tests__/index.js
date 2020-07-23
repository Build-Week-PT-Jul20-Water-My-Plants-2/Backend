const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/config");

afterAll(async () => {
  await db.destroy();
});

describe("intergration tests for endpoints", () => {
  it("GET /", async () => {
    const res = await supertest(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("API is running");
  });

  it("POST /api/auth/register", async () => {
    const res = await supertest(server).post("/api/auth/register").send({
      username: "test1",
      password: "test1",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
  });

  it("POST /api/auth/login", async () => {
    const res = await supertest(server).post("/api/auth/login").send({
      username: "test1",
      password: "test1",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Welcome test1");
  });
});
