const createError = require("http-errors");
const mongoose = require("mongoose");
const Recipe = require("../models/recipe-model");
const fs = require("fs");
const Category = require("../models/category-model");

const uploadOnCloudinary = require("../utils/cloudinary");

//getting all recipe list
const imageUpload = async (req, res, next) => {
  res.render("imageupload");
};

const getAllCategoryWithId = async (req, res, next) => {
  res.send("get data");
};

const imageUploadTesting = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }
    //find path after multer created image in temporary folder upload
    var localFilePath = req.file.path;

    // Upload the local image to Cloudinary
    // and get image url as response
    var result = await uploadOnCloudinary(localFilePath);

    console.log("result is ", result);
    //update image url in category
    const category = await Category.findById(categoryId);
    console.log(category);
    category.imageUrl = result.secure_url;

    const categoryResult = await Category.findByIdAndUpdate(
      categoryId,
      category
    );

    if (!categoryResult) {
      next(createError(404, "Category does not exist"));
      return;
    }

    // Generate html to display images on web page.

    if (localFilePath) {
      res.render("imageUploadSuccess", { imageSuccessInfo: result });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  imageUpload,
  getAllCategoryWithId,
  imageUploadTesting,
};
