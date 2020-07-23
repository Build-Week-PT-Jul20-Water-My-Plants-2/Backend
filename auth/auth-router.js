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

router.put("/users/:id", restrict, async (req, res, next) => {
  // updates user info and returns newly updated user
  try {
    const payload = {
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      phoneNumber: req.body.phoneNumber,
    };

    const updatedUser = await usersModel.updateUser(payload, req.params.id);

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.get("/users", async (req, res, next) => {
  // returns list of users
  try {
    const users = await usersModel.getUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// PLANT CRUD ENDPOINTS BELOW

router.get("/plants/:id", restrict, async (req, res, next) => {
  // returns list of plants for specified user
  try {
    const plants = await usersModel.getUserPlants(req.params.id);

    res.status(200).json(plants);
  } catch (err) {
    next(err);
  }
});

router.post("/plants", restrict, async (req, res, next) => {
  // creates new plant and returns newly created plant
  try {
    const newplant = await usersModel.addPlant(req.body);

    res.status(201).json(newplant);
  } catch (err) {
    next(err);
  }
});

router.put("/plants/:id", restrict, async (req, res, next) => {
  // updates plant and returns newly updated plant
  try {
    const updatedPlant = await usersModel.updatePlant(req.body, req.params.id);

    res.status(200).json(updatedPlant);
  } catch (err) {
    next(err);
  }
});

router.delete("/plants/:id", restrict, async (req, res, next) => {
  // deletes plant returns deleted plant object
  try {
    const deletedPlant = await usersModel.removePlant(req.params.id);

    res.status(200).json(deletedPlant);
  } catch (err) {
    next(err);
  }
});

// RESTRICT MIDDELWARE THAT CHECKS IF THERE IS A JSON WEB TOKEN IN THE HEADERS OF THE REQUEST

function restrict(req, res, next) {
  try {
    // verify that there is a request header named authorization
    const token = req.headers.authorization;

    // if token is not present return this
    if (!token) {
      return res.status(401).json({ message: "You are not authorized!" });
    }

    // verify the token to make sure it has not been tampered with
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "You are not authorized!" });
      }

      next();
    });
  } catch (err) {
    next(err);
  }
}

module.exports = router;
