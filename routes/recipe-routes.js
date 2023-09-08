const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe-controller");

//getting all recipe of a perticular category
router.get("/:category", recipeController.getAllRecipes);

//adding a recipe
router.post("/:category", recipeController.addSingleRecipe);

//getting a single recipe
router.get("/about-recipe/:id", recipeController.singleRecipe);

//update a recipe
router.patch("/about-recipe/:id", recipeController.updateRecipe);

//delete a recipe
router.delete("/about-recipe/:id", recipeController.deleteRecipe);

//delete all recipe by category
router.delete("/about-recipe/delete-all-recipe-by-category/:c_id", recipeController.deleteAllRecipeByC);

//update a recipe's category details by c_id
router.patch("/about-recipe/update-all-recipe-by-category/:c_id", recipeController.updateRecipesCategory);


module.exports = router;
