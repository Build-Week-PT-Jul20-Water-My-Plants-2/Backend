const usersModel = require("../users/users-model");

describe("users-model unit tests", () => {
  it("will find and return all users", async () => {
    const users = await usersModel.getUsers();
    expect(users).toBeDefined();
    expect(users[0].id).toBeDefined();
    expect(users[0].username).toBe("Jane");
    expect(users[1].id).toBeDefined();
    expect(users[1].username).toBe("James");
    expect(users[1].phoneNumber).toBe("222-222-2222");
    console.log(users);
  });
});
