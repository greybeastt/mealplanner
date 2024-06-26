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
    cook_time: Number,
    wait_time: Number,
    prep_time: Number,
    totat_time: Number,
    nutirition: Object,
    default_image: [{ image: String, thumbnail: String }],
    fats: Number,
    calories: Number,
    directions: [{ text: String, order: Number }],
  },
  { strict: false }
);

const Recipe = mongoose.model("Recipe ", schema, "reciepes");
module.exports = Recipe;
