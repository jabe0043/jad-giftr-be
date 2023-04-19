const { Router } = require("express");
const User = require("../models/userModel");

const UserRouter = Router();

UserRouter.get("/", async (req, res) => {
  const ownerID = req.user._id;
  console.log("ownerID", ownerID);
  
  const userName = await User.findById(ownerID, "name");
  res.json(userName);
});
module.exports = UserRouter;
