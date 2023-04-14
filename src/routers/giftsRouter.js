const { Router } = require("express");
const GiftController = require("../controllers/giftController");

const giftsRouter = Router();

giftsRouter.get("/", GiftController.getAllGifts);

giftsRouter.get("/:id", GiftController.getGiftById);

giftsRouter.post("/", GiftController.createGift);

giftsRouter.put("/:id", GiftController.updateGift);

giftsRouter.delete("/:id", GiftController.deleteGift);


module.exports = giftsRouter;
