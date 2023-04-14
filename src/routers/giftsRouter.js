const { Router } = require("express");
const GiftController = require("../controllers/giftController");

const giftRouter = Router();

giftRouter.get("/", GiftController.getAllGifts);

giftRouter.get("/:id", GiftController.getGiftById);

giftRouter.post("/", GiftController.createGift);

giftRouter.put("/:id", GiftController.updateGift);

giftRouter.delete("/:id", GiftController.deleteGift);


module.exports = giftRouter;
