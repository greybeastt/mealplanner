const Recipe = require("../model/receipe.model");
const logger = require("../utils/logger");

const paginationLimit = 20;

module.exports = class RecipeController {
  static async getAllRecipies(req, res, next) {
    const { page } = req.query || 1;
    const receipes = await Recipe.find(
      {},
      {
        images: 1,
        food_name: 1,
        calories: 1,
        fats: 1,
        proteins: 1,
        meal_category: 1,
        _id: 1,
      }
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
    const recipeId = req.params.recipeID;
    const { prep_time, cook_time, directions, ingredients, nutritions } =
      req.body;

    // Create an object to hold only defined attributes
    const updateFields = {};
    if (prep_time !== undefined) updateFields.prep_time = prep_time;
    if (cook_time !== undefined) updateFields.cook_time = cook_time;
    let order = 0;
    if (directions !== undefined)
      updateFields.directions = directions.map((d) => {
        return { text: d, order: order++ };
      });
    if (nutritions !== undefined) updateFields.nutirition = nutritions;
    // if (ingredients !== undefined) updateFields.ingredients = ingredients;

    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
          ...updateFields,
          nutrition: nutritions,
        },
        { new: true } // Returns the updated document
      );

      if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      res.json(updatedRecipe);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the recipe" });
    }
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
