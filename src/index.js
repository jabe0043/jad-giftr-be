"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

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

app.get("/", (_req, res) => res.status(200).send("Server running"));
app.use("/auth", authRouter);
app.use("/api/people", sanitizedBody, peopleRouter);
app.use("/api/people/:id/gifts", sanitizedBody, giftsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
