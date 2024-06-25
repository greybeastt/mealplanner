const createHttpError = require("http-errors");
const Recipe = require("../model/receipe.model");
const logger = require("../utils/logger").default;

const validateCalories = (nMeals, cals) => {
  if (cals < Math.max(200, nMeals * 100) || nMeals * 4000 < cals) return false;
  return true;
};

exports.validation = async (req, res, next) => {
  try {
    // validation step
    let { numberOfMeals, calories } = req.params;

    // Check if either calories or numberOfMeals is NaN
    if (isNaN(parseInt(calories)) || isNaN(parseInt(numberOfMeals))) {
      throw createHttpError(400, "invalid calories or number of meals");
    }

    // Parse to integers
    req.calories = parseInt(calories);
    req.numberOfMeals = parseInt(numberOfMeals);

    // Validate numberOfMeals range
    if (numberOfMeals === 0 || numberOfMeals > 9) {
      throw createHttpError(400, "number of meals should be between 1 and 9");
    }

    // Validate calories using validateCalories function
    if (!validateCalories(numberOfMeals, calories)) {
      throw createHttpError(
        400,
        `number of calories should be between ${Math.max(
          200,
          numberOfMeals * 100
        )} and ${numberOfMeals * 4000}`
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};
const genMeal = async (type, cals) => {
  return recipes;
};

exports.generatePlan = [
  this.validation,

  async (req, res, next) => {
    const { numberOfMeals, calories } = req;
    // meal generation part
    if (numberOfMeals === 1) {
      try {
        logger.info("hi");
        const ans = [];
        let recipes = await Recipe.find({
          calories: { $lt: calories + 5, $gt: calories - 5 },
          is_lunch: true,
        });

        console.log(recipes.length);
        ans.push(recipes[Math.round(Math.random() * 10) % recipes.length]);
        ans.push(recipes[Math.round(Math.random() * 10) % recipes.length]);

        return res.send([
          ans.map((e) => {
            return {
              food_name: e.food_name,
              calories: e.calories,
              is_lunch: e.is_lunch,
            };
          }),
        ]);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        return res.status(500).send("Error fetching recipes");
      }
    }

    res.send(`${calories}, \n ${numberOfMeals}`);
  },
];
