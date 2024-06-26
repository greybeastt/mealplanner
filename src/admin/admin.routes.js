const path = require("path");
const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const { auth, createview, createEditView } = require("./admin.controllers");
const RecipeController = require("./recipes.controller");

// admin/
const router = express.Router();

// should send a jwt
router.post("/auth", auth);

// get all
router.get("/recipies", authenticateToken, RecipeController.getAllRecipies);

router.route("/recipe/view/:recipeID").all().get(createview);

router
  .route("/recipe/:recipeID")
  .all()
  .get(RecipeController.getRecipe)
  .post(RecipeController.updateRecipe)
  .delete(RecipeController.deleteRecipe);

router.route("/recipe/view/edit/:recipeID").all().get(createEditView);

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../../public/auth.html"));
});

module.exports = router;
