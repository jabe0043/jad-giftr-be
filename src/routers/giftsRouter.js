const { Router } = require("express");
const GiftController = require("../controllers/giftController");

const giftsRouter = Router();

giftsRouter.get("/", GiftController.getAllGifts);

giftsRouter.get("/:giftId", GiftController.getGiftById);

giftsRouter.post("/", GiftController.createGift);

giftsRouter.patch("/:giftId", GiftController.updateGift);

giftsRouter.delete("/:giftId", GiftController.deleteGift);


module.exports = giftsRouter;
