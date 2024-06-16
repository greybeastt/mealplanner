const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    food_name: String,
  },
  { strict: false }
);

const Recipe = mongoose.model("Recipe ", schema, "reciepes");
module.exports = Recipe;
