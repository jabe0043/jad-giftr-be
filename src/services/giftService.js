"use strict";
const debug = require("debug")("app:peopleController");
const Person = require("../models/personModel");
const { NotFoundError, BadRequestError } = require("../utils/errors");



const getAllGifts = async (personId) =>{
    const person = await Person.findOne({ _id: personId });
    return person.gifts;
}


const getGiftById = async (personId, giftId) =>{
    const person = await Person.findOne({_id: personId});
    const gift = person.gifts.find(gift => gift._id.toString() === giftId); 
    if (!gift) throw new NotFoundError(`Gift ${giftId} not found`)
    return gift;
}



const createGift = async (personId, giftInfo) => {
    const updatedPerson = await Person.findByIdAndUpdate(
        personId,
        {
            $addToSet: {
            gifts: giftInfo,
            },
        },
        {
            returnOriginal: false,
            runValidators: true,
        }
        );
        return updatedPerson.gifts[updatedPerson.gifts.length - 1];
    };



    const updateGift = async (personId, giftId, giftInfo) => {
        const updateObj = Object.entries(giftInfo).reduce((acc, [key, val]) => {
        acc[`gifts.$.${key}`] = val;
        return acc;
        }, {});
    
        const updatedGift = await Person.findOneAndUpdate(
        {
            _id: personId,
            "gifts._id": giftId,
        },
        {
            $set: updateObj,
        },
        {
            returnOriginal: false,
            runValidators: true,
        }
        );
        if (!updatedGift) throw new NotFoundError(`Gift ${giftId} not found.`)
        return updatedGift.gifts.find(
        (gift) => gift._id.toString() === giftId
        );
    };


    const deleteGift = async (personId, giftId) => {
        const person = await Person.findOneAndUpdate(
            { 
                _id: personId 
            },
            { 
                $pull: { gifts: { _id: giftId } }   //pull is a mongoose delete method
            },
            {            
                returnOriginal: true,
                runValidators: true, 
                //projection returns the original document before the delete is applied, this way, I can return it before deleting. 
                projection: { gifts: { $elemMatch: { _id: giftId } } } 
            }
        );
        const deletedGift = person.gifts[0];
        if (!deletedGift) throw new NotFoundError(`Gift ${giftId} not found.`)
        return deletedGift;
        };

    module.exports = {
        getGiftById,
        getAllGifts,
        createGift,
        updateGift,
        deleteGift
    };