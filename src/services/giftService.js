"use strict";
const debug = require("debug")("app:peopleController");

const Person = require("../models/personModel");


const getAllGifts = async (personId) =>{
    const person = await Person.findOne({ _id: personId });
    return person.gifts;
}

// TODO: May need to change this
const getGiftById = async (personId, giftId) =>{
    console.log('getGiftById', giftId);
    const person = await Person.findOne({_id: personId});
    const gift = person.gifts.find(gift => gift._id.toString() === giftId); 
    return gift;
}



const createGift = async (personId, giftInfo) => {
    console.log("GIFT SERVICE CREATE GIFT");
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
        return deletedGift;
        };

    module.exports = {
        getGiftById,
        getAllGifts,
        createGift,
        updateGift,
        deleteGift
    };