const express = require("express");
const { generatePlan, regenerateRecipe } = require("./user.controller");

const Router = express.Router();

Router.get("/:numberOfMeals/:calories", generatePlan);

Router.post("/recipe", regenerateRecipe);

module.exports = Router;
