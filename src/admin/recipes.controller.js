const Recipe = require("../model/receipe.model");
const logger = require("../utils/logger");

const paginationLimit = 20;

module.exports = class RecipeController {
  static async getAllRecipies(req, res, next) {
    const { page } = req.query || 1;
    const receipes = await Recipe.find(
      {},
      { images: 1, food_name: 1, calories: 1, fats: 1, proteins: 1, _id: 1 }
    )
      .limit(paginationLimit)
      .skip(Math.max(page - 1, 0) * paginationLimit);

    res.status(200).json(receipes);
  }

  static async getRecipe(req, res, next) {
    const recipieID = req.params.recipeID;
    try {
      const reciepe = await Recipe.findById(recipieID);

      if (!reciepe) throw createHttpError(400, "reciepe not found");

      res.status(200).send(reciepe);
    } catch (err) {
      next(err);
    }
  }
  static async updateRecipe(req, res, next) {
    console.log(req.body);
    // TODO: implement it
    res.status(200).end();
  }

  static async creatRecipe(req, res, next) {
    // TODO: implement it
    res.status(200).end();
  }
  static async deleteRecipe(req, res, next) {
    // TODO: implement it
    res.status(200).end();
  }
};
