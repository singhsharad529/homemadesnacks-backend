const createError = require("http-errors");
const mongoose = require("mongoose");
const Category = require("../models/category-model");
const Recipe = require("../models/recipe-model");


//getting all categories list
const getAllCategories = async (req, res, next) => {
  try {
    const results = await Category.find({}, { __v: 0 });
    res.send(results);
  } catch (error) {
    console.log("Error while getting all categories : ", error.message);
    next(error);
  }
};

//adding a category
const addSingleCategory = async (req, res, next) => {
  //using normal method
  // const category = new Category({
  //   name: req.body.name,
  //   imageUrl: req.body.imageUrl,
  //   description: req.body.description
  // })

  // category.save()
  //   .then(result => {
  //     res.send(result);
  //   })
  //   .catch(err => {
  //     console.log('Error while adding new category:', err.message);
  //   })

  //using try and catch
  try {
    const newCategory = req.body;
    const category = new Category(newCategory);
    const result = await category.save();
    res.send(result);
  } catch (error) {
    console.log("Error while adding a category: ", error.message);
    if (error.name === "ValidationError") {
      next(createError(422, error.message));
      return;
    }

    next(error);
  }
};

//getting a single category
const singleCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw createError("Category does not exist");
    }
    res.send(category);
  } catch (error) {
    console.log("Error while getting a single category: ", error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Category Id"));
      return;
    }
    next(error);
  }
};

//update a single category by id
const updateCategory = async (req, res, next) => {
  try {

    const categoryId = req.params.id;
    const updates = req.body;
    const options = { new: true };
    //updating category info
    const result = await Category.findByIdAndUpdate(categoryId, updates, options);
    if (!result) {
      next(createError(404, "Category does not exist"));
      return;
    }

    // updating category name in all the recipe
    if (req.body.name) {
      const updateRecipe = await Recipe.updateMany({}, { $set: { "category": req.body.name } })
    }
    res.send(result);
  } catch (error) {
    console.log("Error while updating a single category: ", error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Category id"));
      return;
    }
    next(error);
  }
};

//delete a category by id
const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {

    //deleting all recipe of a given category
    const deleteRecipes = await Recipe.deleteMany({ "c_id": categoryId })

    //deleting a category by category id
    const result = await Category.findByIdAndDelete(categoryId);
    if (!result) {
      next(createError(404, "Category does not exist"));
      return;
    }
    res.send(result);
  } catch (error) {
    console.log("Error while deleting a single category: ", error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Category id"));
      return;
    }
    next(error);
  }
};

module.exports = {
  getAllCategories,
  addSingleCategory,
  updateCategory,
  singleCategory,
  deleteCategory,
};
