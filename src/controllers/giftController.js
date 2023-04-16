'use-strict'

const debug = require("debug")("app:peopleController");
const GiftService = require('../services/giftService');


const getAllGifts = async (req, res) => {
  try {
    console.log('GETALLGIFTS');
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (error) {
    
  }
};

const getGiftById = async (req, res, next) => {};


//HERE
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
    res.json({data: updatedGift})
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
