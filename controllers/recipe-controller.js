const createError = require("http-errors");
const mongoose = require("mongoose");
const Recipe = require("../models/recipe-model");
const Category = require("../models/category-model");

//getting all recipe list by category Id
const getAllRecipes = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const results = await Recipe.find({ c_id: categoryId }, { __v: 0 });
    res.send(results);
  } catch (error) {
    console.log("Error while getting all recipe : ", error.message);
    next(error);
  }
};

//add a recipe by category id and category name
const addSingleRecipe = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const categoryDetails = await Category.findById(categoryId);

    const newRecipe = req.body;
    newRecipe.category = categoryDetails.name;
    newRecipe.c_id = categoryId;
    const recipe = new Recipe(newRecipe);
    const result = await recipe.save();
    res.send(result);
  } catch (error) {
    console.log("Error while adding a recipe: ", error.message);
    if (error.name === "ValidationError") {
      next(createError(422, error.message));
      return;
    }

    next(error);
  }
};

//getting a recipe
const singleRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Recipe.findById(id, { __v: 0 });
    res.send(results);
  } catch (error) {
    console.log("Error while getting single recipe : ", error.message);
    next(error);
  }
};

//update a single recipe by id
const updateRecipe = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    const result = await Recipe.findByIdAndUpdate(id, updates, options);
    if (!result) {
      next(createError(404, "Recipe does not exist"));
      return;
    }
    res.send(result);
  } catch (error) {
    console.log("Error while recipe a single category: ", error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Recipe id"));
      return;
    }
    next(error);
  }
};

//delete a recipe by id
const deleteRecipe = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Recipe.findByIdAndDelete(id);
    if (!result) {
      next(createError(404, "Recipe does not exist"));
      return;
    }
    res.send(result);
  } catch (error) {
    console.log("Error while deleting a single recipe: ", error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Recipe id"));
      return;
    }
    next(error);
  }
};

//delete all recipe of a category(by c_id)
const deleteAllRecipeByC = async (req, res, next) => {
  const c_id = req.params.c_id;
  try {
    const fieldToDelete = c_id;
    const result = await Recipe.deleteMany({ c_id: fieldToDelete });
    if (!result) {
      next(createError(404, "Category does not exist"));
      return;
    }
    res.send(result);
  } catch (error) {
    console.log("Error while deleting a all recipe: ", error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid category id"));
      return;
    }
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  addSingleRecipe,
  singleRecipe,
  updateRecipe,
  deleteRecipe,
  deleteAllRecipeByC,
};
