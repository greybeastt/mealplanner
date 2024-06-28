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
    fixBug();
    res.status(200).end();
    return;
    const recipeId = req.params.recipeID;
    const { prep_time, cook_time, directions, ingredients, nutritions } =
      req.body;
    console.log(ingredients);

    try {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      if (prep_time !== undefined) {
        recipe.prep_time = prep_time;
      }
      if (cook_time !== undefined) {
        recipe.cook_time = cook_time;
      }
      let order = 0;
      if (directions !== undefined)
        recipe.directions = directions.map((d) => {
          return { text: d, order: order++ };
        });
      if (nutritions !== undefined) {
        recipe.nutrition = nutritions;
      }
      recipe.ingredients = ingredients.map((e) => {
        return {
          amount: e.amount,
          food: {
            food_name: e.name,
            description: e.description,
            weight: [
              {
                description: e.weight_description,
                grams: e.weight_grams,
              },
            ],
          },
          unit: 0,
        };
      });
      const updated_reciep = await recipe.save();
      res.json(updated_reciep);
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
