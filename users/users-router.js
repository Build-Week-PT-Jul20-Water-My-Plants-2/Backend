const router = require("express").Router();
const usersModel = require("./users-model");
const restrict = require("../middleware/restrict");

router.get("/", restrict, async (req, res) => {
  try {
    res.status(200).json(await usersModel.find());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
