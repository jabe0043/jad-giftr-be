const { Router } = require("express");
const debug = require("debug")("app:authRouter");
const jwt = require("jsonwebtoken");

const authRouter = Router();
const passport = require("passport");

require("../utils/passport.js");

authRouter.get("/google", (req, res, next) => {

  const redirect_url = req.query.redirect_url;
  console.log("redirect_url: ", redirect_url);

  const authenticator = passport.authenticate("google", {
    scope: ["profile"],
    state: redirect_url,
  });
  authenticator(req, res, next);
});

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const { state } = req.query;
    const redirectUrl = state ?? "/api/people";
    const id = req.user._id.toString();
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    res.redirect(`${redirectUrl}?token=${token}`);
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = authRouter;
