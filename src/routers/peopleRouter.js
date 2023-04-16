const { Router } = require("express");
const PeopleController = require("../controllers/peopleController");
const GiftController = require("../controllers/giftController");


const PeopleRouter = Router();

PeopleRouter.get("/", PeopleController.getAllPeople);

PeopleRouter.get("/:id", PeopleController.getPersonById);

PeopleRouter.post("/", PeopleController.createPerson);

PeopleRouter.patch("/:id", PeopleController.updatePerson);

PeopleRouter.put("/:id", PeopleController.replacePerson);

PeopleRouter.delete("/:id", PeopleController.deletePerson);


//Gift routes

PeopleRouter.post("/:id/gifts", GiftController.createGift);
PeopleRouter.patch("/:id/gifts/:giftId", GiftController.updateGift);



module.exports = PeopleRouter;
