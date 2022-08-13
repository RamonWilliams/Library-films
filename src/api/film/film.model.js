const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PLATFORM } = require("../../helpers/constants/platform");


const schema = new Schema(
  {
    title: { type: String, required: true },
    cover: { type: String, required: true },
    date: { type: String, required: true },
    platform: [{ type: String, enum: PLATFORM, required: true }],
    director: { type: Schema.Types.ObjectId, ref: "director", required: false },
    description: { type: String, required: false },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("films", schema);