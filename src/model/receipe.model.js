const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({});

const Recipe = mongoose.model('Recipe ', schema, 'reciepes');
module.exports = Recipe