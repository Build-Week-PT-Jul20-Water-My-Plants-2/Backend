const usersModel = require("../users/users-model");

module.exports = async (req, res, next) => {
  try {
    const { username, password, phoneNumber } = req.body;
    const user = await usersModel.findByFilter(username);

    if (!user) {
      return next();
    }

    if (username === user.username) {
      return await res
        .status(404)
        .json({ errorMessage: "Username already exists" });
    }

    if (phoneNumber.length < 9) {
      return await res
        .status(404)
        .json({ errorMessage: "Phone number must be valid" });
    }

    if (!username || !password || !phoneNumber) {
      return await res.status(404).json({
        errorMessage: "Username, password, and phone number can not be empty",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
