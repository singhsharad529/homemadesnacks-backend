const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe-controller");

//getting all recipe of a perticular category
router.get("/:category", recipeController.getAllRecipes);

//adding a recipe
router.post("/:category", recipeController.addSingleRecipe);

//getting a single recipe
router.get("/about-recipe/:id", recipeController.singleRecipe);

module.exports = router;
