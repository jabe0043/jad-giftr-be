const { Schema, Types, model } = require("mongoose");

const giftSchema = new Schema(
  {
    giftName:{
      type: String,
      required: true
    },
    store:{
      type: String,
    },
    website:{
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  });



const PersonSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    ownerID: {
      type: Types.ObjectId,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    gifts: [giftSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Person", PersonSchema);
