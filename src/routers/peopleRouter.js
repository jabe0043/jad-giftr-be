const { Router } = require("express");
const PeopleController = require("../controllers/peopleController");

const PeopleRouter = Router();

PeopleRouter.get("/", PeopleController.getAllPeople);

PeopleRouter.get("/:id", PeopleController.getPersonById);

PeopleRouter.post("/", PeopleController.createPerson);

PeopleRouter.put("/:id", PeopleController.updatePerson);

PeopleRouter.delete("/:id", PeopleController.deletePerson);

module.exports = PeopleRouter;
