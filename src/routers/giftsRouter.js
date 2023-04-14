const { Router } = require("express");

const GiftRouter = Router();

GiftRouter.get("/", GiftController.getAllGift);

GiftRouter.get("/:id", GiftController.getGiftById);

GiftRouter.post("/", GiftController.createGift);

GiftRouter.put("/:id", GiftController.updateGift);

GiftRouter.delete("/:id", GiftController.deleteGift);

module.exports = GiftRouter;
