const createError = require("http-errors");
const mongoose = require("mongoose");
const Recipe = require("../models/recipe-model");

//getting all categories list
const getAllRecipes = async (req, res, next) => {
  try {
    console.log("first");
    const splitStrings = req.params.category.split("-");
    const searchString = splitStrings.join(" ");

    const results = await Recipe.find({ category: searchString });
    res.send(results);
  } catch (error) {
    console.log("Error while getting all recipe : ", error.message);
    next(error);
  }
};

//add a recipe by category id and category name
const addSingleRecipe = async (req, res, next) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const recipe = new Recipe(req.body);
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

//getting all categories list
const singleRecipe = async (req, res, next) => {
  console.log("starting");

  try {
    const id = req.params.id;
    console.log(id);
    const results = await Recipe.findById(id);
    res.send(results);
  } catch (error) {
    console.log("Error while getting single recipe : ", error.message);
    next(error);
  }
};

module.exports = { getAllRecipes, addSingleRecipe, singleRecipe };
