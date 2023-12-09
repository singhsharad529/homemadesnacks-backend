const express = require("express");
const { imageUpload } = require("../controllers/image-controller");
const router = express.Router();

//getting all recipe of a perticular category
router.get("/", imageUpload);

module.exports = router;
