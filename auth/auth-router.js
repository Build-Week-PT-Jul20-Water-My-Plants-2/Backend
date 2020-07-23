const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModel = require("../users/users-model");
const validateUser = require("../middleware/validateUser");

router.post("/register", validateUser, async (req, res, next) => {
  try {
    const { username, password, phoneNumber } = req.body;

    const bodyData = {
      username: username,
      password: await bcrypt.hash(password, 10),
      phoneNumber: phoneNumber,
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

    // check if user is in the database
    if (!user) {
      return res.status(401).json({ message: "Username not found!" });
    }

    // compare the password the client is sending with the one in the database
    const passwordValid = await bcrypt.compare(password, user.password);

    // if password is WRONG
    if (!passwordValid) {
      return res.status(401).json({ message: "Your password is incorrect!" });
    }

    // set up the payload to be used in json signature
    const payload = {
      userId: user.id,
      username: user.username,
    };

    res.cookie("token", jwt.sign(payload, "secret"));

    res.status(201).json({
      message: `Welcome ${user.username}`,
      token: jwt.sign(payload, "secret"),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
