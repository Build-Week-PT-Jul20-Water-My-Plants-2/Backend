const usersModel = require("../users/users-model");

describe("users-model unit tests", () => {
  it("will find and return all users", async () => {
    const users = await usersModel.find();
    expect(users).toBeDefined();
    expect(users[1].id).toBe(2);
    expect(users[0].username).toBe("Dan");
  });
});
