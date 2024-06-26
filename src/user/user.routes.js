const express = require("express");
const { generatePlan } = require("./user.controller");

const Router = express.Router();

Router.get("/:numberOfMeals/:calories", generatePlan);

module.exports = Router;
