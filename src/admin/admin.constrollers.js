const { generateRecipeHtml } = require("../utils/generateHtml.js");
const { generateAccessToken } = require("../utils/jwt.js");
const logger = require("../utils/logger.js");
const Recipe = require("../model/receipe.model.js");
const paginationLimit = 20;

exports.auth = (req, res, next) => {
  const { username, password } = req.body;

  if (username === process.env.USER_NAME && password === process.env.PASSWORD) {
    // '120s'
    const token = generateAccessToken({}, "1d");
    return res.json({ message: "Login successful", token: token });
  }
  return res.status(401).json({ message: "Login failed" });
};

//  Image Title Calories Carbs Fat Protein
exports.recipies = async (req, res, next) => {
  const { page } = req.query || 1;
  const receipes = await Recipe.find(
    {},
    { images: 1, food_name: 1, calories: 1, fats: 1, proteins: 1, _id: 1 }
  )
    .limit(paginationLimit)
    .skip(Math.max(page - 1, 0) * paginationLimit);

  res.status(200).json(receipes);
};

exports.getRecipe = async (req, res, next) => {
  const recipieID = req.params.recipeID;
  try {
    const reciepe = await Recipe.findById(recipieID);
    res.status(200).send(reciepe);
  } catch (err) {
    res.status(404).send({ error: "reciep not found" });
  }
};

exports.createview = async (req, res, next) => {
  const recipieID = req.params.recipeID;
  const recipe = await Recipe.findById(recipieID);
  res.send(generateRecipeHtml(recipe));
};
