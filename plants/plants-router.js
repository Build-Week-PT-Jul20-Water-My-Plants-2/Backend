const router = require("express").Router();
const plantsModel = require("./plants-model");
const restrict = require("../middleware/restrict");

router.get("/:id", restrict, async (req, res, next) => {
  // returns list of plants for specified user
  try {
    const plants = await plantsModel.getUserPlants(req.params.id);

    res.status(200).json(plants);
  } catch (err) {
    next(err);
  }
});

router.post("/", restrict, async (req, res, next) => {
  // creates new plant and returns newly created plant
  try {
    const newplant = await plantsModel.addPlant(req.body);

    res.status(201).json(newplant);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", restrict, async (req, res, next) => {
  // updates plant and returns newly updated plant
  try {
    const updatedPlant = await plantsModel.updatePlant(req.body, req.params.id);

    res.status(200).json(updatedPlant);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restrict, async (req, res, next) => {
  // deletes plant returns deleted plant object
  try {
    const deletedPlant = await plantsModel.removePlant(req.params.id);

    res.status(200).json(deletedPlant);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
