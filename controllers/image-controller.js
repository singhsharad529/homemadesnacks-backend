const createError = require("http-errors");
const mongoose = require("mongoose");
const Recipe = require("../models/recipe-model");

//getting all recipe list
const imageUpload = async (req, res, next) => {
  res.render("imageupload");
};

module.exports = {
  imageUpload,
};
