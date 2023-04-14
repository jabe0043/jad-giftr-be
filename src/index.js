"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
require("./utils/db.js");

const PeopleRouter = require("./routers/peopleRouter.js");
const GiftRouter = require("./routers/giftRouter.js");

app.use("/api/people", PeopleRouter);
app.use("/api/people/:id/gifts", GiftRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});