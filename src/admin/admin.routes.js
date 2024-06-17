const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const {
  auth,
  recipies,
  getRecipe,
  createview,
} = require("./admin.constrollers");

const router = express.Router();

// should send a jwt
router.post("/auth", auth);

// get all
router.get("/recipies");
router.get("/recipies", authenticateToken, recipies);

router.route("/recipe/view/:recipeID").all().get(createview);
router.route("/recipe/:recipeID").all().get(getRecipe);

module.exports = router;
