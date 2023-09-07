const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//category schema
const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: false,
    },
    c_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ratingCount: {
      type: Number,
      required: false,
    },
    isVeg: {
      type: Boolean,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: false,
    },
    tags: {
      type: String,
      required: true,
    },
    recipeMethod: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

//category model
const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
