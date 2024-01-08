const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category-controller");

//getting all categories list
router.get("/", CategoryController.getAllCategories);

//adding a category
router.post("/", CategoryController.addSingleCategory);

//getting a single category
router.get("/:id", CategoryController.singleCategory);

//update a single category by id
router.patch("/:id", CategoryController.updateCategory);

//delete a category by id
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
