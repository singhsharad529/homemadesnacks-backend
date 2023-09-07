const createError = require("http-errors");
const mongoose = require("mongoose");
const Category = require("../models/category-model");

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
    const category = new Category(req.body);
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
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
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
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    const result = await Category.findByIdAndUpdate(id, updates, options);
    if (!result) {
      next(createError(404, "Category does not exist"));
      return;
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
  const id = req.params.id;
  try {
    const result = await Category.findByIdAndDelete(id);
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
