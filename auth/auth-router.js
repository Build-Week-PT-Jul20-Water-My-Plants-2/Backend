const router = require("express").Router();
const usersModel = require("../users/users-model");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const bodyData = {
      username: username,
      password: password,
    };

    const newUser = await usersModel.add(bodyData);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await usersModel.findByFilter(username);

    res.status(201).json({ message: `Welcome ${user.username}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
