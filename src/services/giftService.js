"use strict";
const debug = require("debug")("app:peopleController");

const Person = require("../models/personModel");



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
    
    module.exports = {
        createGift,
        updateGift
    };