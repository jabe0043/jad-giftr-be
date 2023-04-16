const { UnauthorizedError } = require("../utils/errors");

const User = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  const rawToken = req.headers.authorization;
  const token = rawToken?.replace("Bearer ", "");
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);
    if (!user) {
      res.status(401).send("Invalid token");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};

module.exports = isAuthenticated;
