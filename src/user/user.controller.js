const createHttpError = require("http-errors");
const Recipe = require("../model/receipe.model");
const logger = require("../utils/logger");
const error_margin = 20;

const getRecipies = async (options, calories, type, order) => {
  const recipes = await Recipe.find(
    {
      calories: {
        $gt: calories / 2 - error_margin,
        $lt: calories / 2 + error_margin,
      },
      ...options,
    },
    {
      _id: 0,
      food_name: 1,
      calories: 1,
      is_lunch: 1,
    }
  );

  const select_random = [];
  select_random.push(recipes[Math.round(Math.random() * 10) % recipes.length]);
  select_random.push(recipes[Math.round(Math.random() * 10) % recipes.length]);

  return {
    type,
    order,
    recipes: select_random,
  };
};

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

exports.generatePlan = [
  this.validation,

  async (req, res, next) => {
    const { numberOfMeals, calories } = req;
    let ans = [];
    let order = 1;
    // meal generation part
    try {
      if (numberOfMeals === 1) {
        ans.push(getRecipies({ is_lunch: true }, calories, "lunch", order));
      } else if (numberOfMeals == 2) {
        random_error = Math.random() % 0.1;
        logger.info(random_error);
        ans.push(
          await getRecipies(
            { is_lunch: true },
            calories * (0.52 + random_error),
            "lunch",
            order
          )
        );
        ans.push(
          await getRecipies(
            { is_breakfast: true },
            calories * (1 - 0.52 + random_error),
            "lunch",
            order
          )
        );
      }
      return res.send([ans]);
    } catch (err) {
      next(err);
    }
  },
];
