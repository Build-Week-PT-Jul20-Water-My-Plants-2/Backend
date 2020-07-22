const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModel = require("../users/users-model");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 12);

    const bodyData = {
      username: username,
      password: hashed,
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

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid || !username) {
      return res.status(501).json({
        message: "Invalid Credentials",
      });
    }

    const payload = {
      userId: user.id,
      username: user.username,
    };

    res.cookie("token", jwt.sign(payload, "secret"));

    res.status(201).json({ message: `Welcome ${user.username}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
