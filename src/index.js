"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
require("./utils/db.js");

const PeopleRouter = require("./routers/peopleRouter.js");

app.get("api/people", PeopleRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port 3000");
});
