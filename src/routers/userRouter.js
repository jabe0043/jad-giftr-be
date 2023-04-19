const { Router } = require("express");
const debug = require("debug")("app:UserRouter");

const User = require("../models/userModel");

const UserRouter = Router();

UserRouter.get("/userName", async (req, res) => {
  debug("Get /userName");
  const ownerID = req.user._id;
  const userName = await User.findById(ownerID, "name");
  debug("userName", userName);
  res.json({"data": userName});
});
module.exports = UserRouter;
