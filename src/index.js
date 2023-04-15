"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
require("./utils/db.js");

app.get("/", (_req, res) => res.send("Server running"));
app.use("/auth", authRouter);
app.use("/api/people", sanitizedBody, peopleRouter);
app.use("/api/people/:id/gifts", sanitizedBody, giftsRouter);

app.use("/api/people", PeopleRouter);
app.use("/api/people/:id/gifts", GiftRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});