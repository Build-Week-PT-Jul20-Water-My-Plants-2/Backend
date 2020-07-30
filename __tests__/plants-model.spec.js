const plantsModel = require("../plants/plants-model");

describe("plants-model unit tests", () => {
  it("will find and return a specific user plants", () => {
    expect(plantsModel.getUserPlants(1)).toBeDefined();
  });
});
