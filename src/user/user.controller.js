const Recipe = require("../model/receipe.model");
const logger = require("../utils/logger");

const validateCalories = (nMeals, cals) => {
  if (cals < Math.max(200, nMeals * 100) || nMeals * 4000 < cals) return false;
  return true;
};

exports.generatePlan = async (req, res, next) => {
  // validation step
  let { numberOfMeals, calories } = req.params;

  // Check if either calories or numberOfMeals is NaN
  if (isNaN(parseInt(calories)) || isNaN(parseInt(numberOfMeals))) {
    res.status(400).send("invalid calories or number of meals");
    return;
  }

  // Parse to integers
  calories = parseInt(calories);
  numberOfMeals = parseInt(numberOfMeals);

  // Validate numberOfMeals range
  if (numberOfMeals === 0 || numberOfMeals > 9) {
    return res.send("number of meals should be between 1 and 9");
  }

  // Validate calories using validateCalories function
  if (!validateCalories(numberOfMeals, calories)) {
    return res.send(
      `number of calories should be between ${Math.max(
        200,
        numberOfMeals * 100
      )} and ${numberOfMeals * 4000}`
    );
  }

  // meal generation part
  if (numberOfMeals === 1) {
    try {
      logger.info("hi");
      const recipes = await Recipe.find({
        calories: { $lt: calories + 5, $gt: calories - 5 },
      });
      console.log(recipes.length);
      logger.info("hi");
      return res.send(recipes);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      return res.status(500).send("Error fetching recipes");
    }
  }

  res.send(`${calories}, \n ${numberOfMeals}`);
};
