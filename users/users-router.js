const router = require("express").Router();
const usersModel = require("./users-model");
const plantsRouter = require("../plants/plants-router");
const restrict = require("../middleware/restrict");

router.use("/plants", plantsRouter);

router.get("/", restrict, async (req, res) => {
  try {
    res.status(200).json(await usersModel.getUsers());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", restrict, async (req, res, next) => {
  try {
    const { id } = req.params;

    res.status(200).json(await usersModel.getUserById(id));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", restrict, async (req, res, next) => {
  try {
    const updatedUser = await usersModel.updateUser(req.body, req.params.id);

    res.status(201).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restrict, async (req, res, next) => {
  try {
    const deleteUser = await usersModel.deleteUser(req.params.id);

    deleteUser;

    res.status(200).json({ message: "Successfully removed user" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
