const Recipe = require("../model/receipe.model");

const validateCalories = (nMeals, cals) => {
  if ((cals < Math.max(200, nMeals * 100)) | (nMeals * 4000 < cals))
    return false;
  return true;
};

exports.generatePlan = (req, res, next) => {
  // validation step
  let { numberOfMeals, calories } = req.params;
  if ((isNaN(parseInt(calories)), isNaN(parseInt(numberOfMeals)))) {
    res.status(400).send("invalide calories or number of meals");
    return;
  }
  calories = parseInt(calories);
  numberOfMeals = parseInt(numberOfMeals);
  if ((0 === numberOfMeals) | (9 < numberOfMeals))
    return res.send("number of meals should be between 1 and 9");
  if (!validateCalories(numberOfMeals, calories))
    return res.send(
      `number of calories should be between  ${Math.max(
        200,
        numberOfMeals * 100
      )} and ${numberOfMeals * 4000}`
    );
  // meal generation part
  res.send(`${calories}, \n ${numberOfMeals}`);
};
