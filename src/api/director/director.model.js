const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },   
    film: { type: Schema.Types.ObjectId, ref: "film", required: true },
    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("directors", schema);


