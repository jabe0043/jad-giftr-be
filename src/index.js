"use strict";

require("dotenv").config();

const cors = require("cors");
const express = require("express");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const morgan = require("morgan");

const peopleGiftsRouter = require("./routers/peopleGiftsRouter");
const authRouter = require("./routers/authRouter");
const { errorHandler } = require("./utils/errors");
const sanitizedBody = require("./middlewares/sanitizeBody");
const isAuthenticated = require("./middlewares/isAuthenticated");
const UserRouter = require("./routers/userRouter");

require("./utils/db");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_WHITELIST,
  })
);
app.use(express.json());
app.use(morgan("tiny"));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_req, res) => res.status(200).send("Server running"));
app.use("/auth", authRouter);
app.use("/api/people", isAuthenticated, sanitizedBody, peopleGiftsRouter);
app.use("/api/userName",isAuthenticated, UserRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
