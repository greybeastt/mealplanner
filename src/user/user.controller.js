const createHttpError = require("http-errors");
const Recipe = require("../model/receipe.model");
const logger = require("../utils/logger");
const error_margin = 30;

const meal_query = {
  breakfast: { options: { is_breakfast: true, breakfast: true } },
  lunch: { options: { is_lunch: true } },
  dinner: { options: { is_dinner: true } },
  snack: { options: { is_snack: true } },
};

const plans = {
  1: ["lunch"],
  2: ["lunch", "dinner"],
  3: ["breakfast", "lunch", "dinner"],
  4: ["breakfast", "lunch", "dinner", "snack"],
  5: ["breakfast", "lunch", "snack", "dinner", "snack"],
  6: ["breakfast", "snack", "lunch", "snack", "dinner", "snack"],
  7: ["breakfast", "snack", "lunch", "snack", "snack", "dinner", "snack"],
  8: [
    "breakfast",
    "snack",
    "lunch",
    "snack",
    "snack",
    "dinner",
    "snack",
    "snack",
  ],
  9: [
    "breakfast",
    "snack",
    "snack",
    "lunch",
    "snack",
    "snack",
    "dinner",
    "snack",
    "snack",
  ],
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

const getRecipies = async (options, calories, type, order) => {
  const recipes = await Recipe.find({
    calories: {
      $gt: calories / 2 - error_margin,
      $lt: calories / 2 + error_margin,
    },
    ...options,
  });
  if (recipes.length < 2) {
    return getRecipies(options, calories + Math.random() * 100, type, order);
  }
  let select_random = [];
  let recipes_length = recipes.length;

  let first_idx = Math.floor(Math.random() * recipes_length);

  let second_idx = Math.floor(Math.random() * (recipes_length - 1));
  if (second_idx >= first_idx) {
    second_idx++;
  }

  select_random.push(recipes[first_idx]);
  select_random.push(recipes[second_idx]);
  logger.info(`${type} ${recipes.length}`);

  return {
    type,
    order,
    recipes: select_random,
  };
};

exports.generatePlan = [
  this.validation,
  async (req, res, next) => {
    try {
      const { numberOfMeals, calories } = req;
      let order = 1;

      const plan = plans[numberOfMeals];

      const snacks = Math.max(numberOfMeals - 3, 0);
      const snack_calories = calories * 0.08;
      let meal_calories =
        (calories - snack_calories * snacks) / Math.min(numberOfMeals, 3);

      let promises = plan.map((meal) => {
        return getRecipies(
          meal_query[meal].options,
          meal === "snack" ? snack_calories : meal_calories,
          meal,
          order++
        );
      });

      let ans = await Promise.all(promises);
      res.send(ans);
    } catch (err) {
      next(err);
    }
  },
];
