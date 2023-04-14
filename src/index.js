"use strict";

const express = require("express");
const app = express();
const passport = require("passport");
const MongoStore = require("connect-mongo");
const debug = require("debug")("app:index.js");

const session = require("express-session");

require("dotenv").config();
require("./utils/db");

const peopleRouter = require("./routers/peopleRouter");
const giftRouter = require("./routers/giftsRouter");
const authRouter = require("./routers/authRouter");

debug("App runs");

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter)
app.use("/api/people", peopleRouter);
app.use("/api/people/:id/gifts", giftRouter);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});