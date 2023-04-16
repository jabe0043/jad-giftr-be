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

PeopleRouter.get("/:id/gifts", GiftController.getAllGifts);
PeopleRouter.get("/:id/gifts/:giftId", GiftController.getGiftById);

PeopleRouter.post("/:id/gifts", GiftController.createGift);

PeopleRouter.patch("/:id/gifts/:giftId", GiftController.updateGift);

PeopleRouter.delete("/:id/gifts/:giftId", GiftController.deleteGift);



module.exports = PeopleRouter;
