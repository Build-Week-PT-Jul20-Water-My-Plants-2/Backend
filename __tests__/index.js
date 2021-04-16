const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/config");
require("dotenv").config();

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy();
});

describe("intergration tests for endpoints", () => {
  it("GET /", async () => { // checks to make sure API is running
    const res = await supertest(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("API is running");
  });

  it("POST /api/auth/register", async () => { // creates user successfully
    const res = await supertest(server).post("/api/auth/register").send({ 
      username: "test1",
      password: "test1",
      phoneNumber: "111-111-1111"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
  });

  it("GET /api/auth/users", async () => { // returns list of users
    const res = await supertest(server).get("/api/auth/users")
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

  it("POST /api/auth/login", async () => { // logs user in
    const res = await supertest(server).post("/api/auth/login").send({
      username: "Jane",
      password: "123"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Welcome Jane");
  });

  it("POST /api/auth/login & PUT /api/auth/users/:id", async () => { // logs user in and updates user info for specified user successfully
    const res1 = await supertest(server).post("/api/auth/login").send({
      username: "Jane",
      password: "123"
    });
    
    const res2 = await supertest(server)
    .put("/api/auth/users/1")
    .set("authorization", res1.body.token)
    .send({
        username: "Jane",
        password: "123",
        phoneNumber: "changed"
    })

    expect(res2.statusCode).toBe(200);
    expect(res2.body.phoneNumber).toBe("changed");
  });

  // PLANT CRUD TESTS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // GET -----------------------

  it("POST /api/auth/login & GET /api/auth/plants/:id", async () => { // logs user in and gets token to set authorization header and get all the plants for specified user successfully
    const res1 = await supertest(server).post("/api/auth/login").send({
      username: "Jane",
      password: "123"
    });
    
    const res2 = await supertest(server).get("/api/auth/plants/1").set("authorization", res1.body.token)

    expect(res2.statusCode).toBe(200);
    expect(res2.body).toBeDefined();
  });

  // POST -----------------------

  it("POST /api/auth/login & POST /api/auth/plants", async () => { // logs user in and gets token to set authorization header and create plant for specified user successfully
    const res1 = await supertest(server).post("/api/auth/login").send({
      username: "Jane",
      password: "123"
    });
    
    const res2 = await supertest(server).post("/api/auth/plants")
    .set("authorization", res1.body.token)
    .send({
      nickname: "newname",
      species: "newspecies",
      h2oFrequency: "alot",
      user_id: 1
    })

    expect(res2.statusCode).toBe(201);
    expect(res2.body).toMatchObject({
      id: 10,
      nickname: "newname",
      species: "newspecies",
      h2oFrequency: "alot",
      user_id: 1
    });
  });

  // PUT -----------------------

  it("POST /api/auth/login & PUT /api/auth/plants/:id", async () => { // logs user in and gets token to set authorization header and update plant for specified user successfully
    const res1 = await supertest(server).post("/api/auth/login").send({
      username: "Jane",
      password: "123"
    });
    
    const res2 = await supertest(server).put("/api/auth/plants/1") // :id is the id of the plant
    .set("authorization", res1.body.token)
    .send({
      nickname: "updatedname",
      species: "updatedspecies",
      h2oFrequency: "updatedalot",
      user_id: 1
    })

    expect(res2.statusCode).toBe(200);
    expect(res2.body).toMatchObject({
      id: 1,
      nickname: "updatedname",
      species: "updatedspecies",
      h2oFrequency: "updatedalot",
      user_id: 1
    });
  });

  // DELETE -----------------------

  it("POST /api/auth/login & DELETE /api/auth/plants/:id", async () => { // logs user in and gets token to set authorization header and delete plant for specified user successfully
    const res1 = await supertest(server).post("/api/auth/login").send({
      username: "Jane",
      password: "123"
    });
    
    const res2 = await supertest(server).delete("/api/auth/plants/1") // :id is the id of the plant
    .set("authorization", res1.body.token)

    expect(res2.statusCode).toBe(200);
    expect(res2.body).toMatchObject({
      id: 1,
      nickname: "Rose",
      species: "Damask rose",
      h2oFrequency: "once a week",
      user_id: 1
    });
  });

});
