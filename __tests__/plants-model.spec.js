const plantsModel = require("../plants/plants-model");

describe("plants-model unit tests", () => {
  it("will find and return a specific user plants", async () => {
    const plants = await plantsModel.getUserPlants(1);
    console.log(plants);
    expect(plants[0].id).toBeDefined();
    expect(plants[0].nickname).toBe("Rose");
  });
});
