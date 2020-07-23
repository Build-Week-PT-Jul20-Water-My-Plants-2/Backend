module.exports = async (req, res, next) => {
  try {
    resource = {
      username: req.body.username,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
    };

    if (resource.username) {
      return await res
        .status(404)
        .json({ errorMessage: "Username already exists" });
    }

    if (!resource.username || !resource.password || !resource.phoneNumber) {
      return await res.status(404).json({ errorMessage: "Missing user data" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
