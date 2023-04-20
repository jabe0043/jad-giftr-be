'use-strict'

const debug = require("debug")("app:peopleController");
const GiftService = require('../services/giftService');


const getAllGifts = async (req, res, next) => {
  try {
    const gifts = await GiftService.getAllGifts(req.params.id, req.sanitizedBody);
    res.status(201).json({data: gifts});
  } catch (error) {
    next(error);
  }
};

const getGiftById = async (req, res, next) => {
  try{
    const gift = await GiftService.getGiftById(
      req.params.id,
      req.params.giftId,
      req.sanitizedBody
      );
      res.status(201).json({data: gift});
  } catch(error){
    next(error);
  }
};

//example

const createGift = async (req, res, next) => {
  try{
    const createdGift = await GiftService.createGift(
      req.params.id, 
      req.sanitizedBody
      );
    res.status(201).json({data: createdGift});
  } catch (error) {
    next(error);
  }
};

const updateGift = async (req, res, next) => {
  try{
    const updatedGift = await GiftService.updateGift(
      req.params.id,
      req.params.giftId,
      req.sanitizedBody
    );
    res.status(201).json({data: updatedGift})
  } catch(error){
    next(error);
  }
};



const deleteGift = async (req, res, next) => {
  try{
    const deletedGift = await GiftService.deleteGift(
      req.params.id,
      req.params.giftId,
    );
    res.status(201).json({data: deletedGift});
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllGifts,
  getGiftById,
  createGift,
  updateGift,
  deleteGift,
};
