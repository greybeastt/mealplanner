const {
  generateRecipeHtml,
  generateEditRecipeHtml,
  not_found,
} = require("../utils/generateHtml.js");

const { generateAccessToken } = require("../utils/jwt.js");
const logger = require("../utils/logger.js").default;
const Recipe = require("../model/receipe.model.js");
const createHttpError = require("http-errors");
const { from_public } = require("../utils/utils.js");

exports.auth = (req, res, next) => {
  const { username, password } = req.body;

  if (username != process.env.USER_NAME && password != process.env.PASSWORD) {
    next(createHttpError(401, "check your credintials"));
    return;
  }

  const token = generateAccessToken({}, "1d");
  return res.json({ message: "Login successful", token: token });
};

exports.createview = async (req, res, next) => {
  const recipieID = req.params.recipeID;
  try {
    const recipe = await Recipe.findById(recipieID);
    if (!recipe) {
      throw Error("not found");
    }
    res.send(generateRecipeHtml(recipe));
  } catch (err) {
    res.redirect("http://localhost:3000/notfound.html");
  }
};

exports.createEditView = async (req, res, next) => {
  const recipieID = req.params.recipeID;
  try {
    const recipe = await Recipe.findById(recipieID);
    if (!recipe) {
      throw Error("not found");
    }
    res.send(generateEditRecipeHtml(recipe));
  } catch (err) {
    res.redirect("http://localhost:3000/notfound.html");
    next(err);
  }
};
