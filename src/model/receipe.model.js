const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    food_name: String,
    is_lunch: Boolean,
    is_breakfast: Boolean,
    breakfast: Boolean,
    is_snack: Boolean,
    is_dinner: Boolean,
  },
  { strict: false }
);

const Recipe = mongoose.model("Recipe ", schema, "reciepes");
module.exports = Recipe;
