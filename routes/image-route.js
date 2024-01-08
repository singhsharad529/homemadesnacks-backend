const express = require("express");
const {
  imageUpload,
  getAllCategoryWithId,
  imageUploadTesting,
} = require("../controllers/image-controller");
const router = express.Router();
const upload = require("../middleware/multer.middleware");

//getting all recipe of a perticular category
router.get("/", imageUpload);
router.get("/get-all-category", getAllCategoryWithId);
router.post(
  "/upload-category-image/:id",
  upload.single("category"),
  imageUploadTesting
);

module.exports = router;
