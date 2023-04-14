"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
require("./utils/db.js");

const PeopleRouter = require("./routers/peopleRouter.js");

app.use("/api/people", PeopleRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
