"use strict";

const express = require("express");
const app = express();
const passport = require("passport");

require("dotenv").config();
require("./utils/db.js");

const PeopleRouter = require("./routers/peopleRouter.js");
const GiftRouter = require("./routers/giftRouter.js");
const AuthRouter = require("./routers/authRouter.js");

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

app.use("/auth", AuthRouter)
app.use("/api/people", PeopleRouter);
app.use("/api/people/:id/gifts", GiftRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});