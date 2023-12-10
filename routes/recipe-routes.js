const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe-controller");

//getting all recipe of a perticular category
router.get("/category/:categoryId", recipeController.getAllRecipes);

//adding a recipe
router.post("/:categoryId", recipeController.addSingleRecipe);

//getting a single recipe
router.get("/:id", recipeController.singleRecipe);

//update a recipe by id
router.patch("/:id", recipeController.updateRecipe);

//delete a recipe
router.delete("/about-recipe/:id", recipeController.deleteRecipe);


module.exports = router;
