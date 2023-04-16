'use-strict'

const debug = require("debug")("app:peopleController");
const GiftService = require('../services/giftService');


const getAllGifts = async (req, res, next) => {
  try {
    const gifts = await GiftService.getAllGifts(req.params.id);
    res.status(201).json({data: gifts});
  } catch (error) {
    next(error);
  }
};

const getGiftById = async (req, res, next) => {};



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



const deleteGift = async (req, res, next) => {};


module.exports = {
  getAllGifts,
  getGiftById,
  createGift,
  updateGift,
  deleteGift,
};
