const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("list of all categories");
});

router.post("/", (req, res, next) => {
  res.send("category created");
});

router.get("/:id", (req, res, next) => {
  res.send("single category get");
});

router.patch("/:id", (req, res, next) => {
  res.send("category updated");
});

router.delete("/:id", (req, res, next) => {
  res.send("category deleted");
});

module.exports = router;
