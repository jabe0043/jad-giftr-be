const { Schema, Types, model } = require("mongoose");

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
    // gifts: {
    //   type: [Gift],
    //   required: false,
    // }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Person", PersonSchema);
