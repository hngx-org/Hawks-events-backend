const express = require("express");
const { uploadImage, upload } = require("../controller/upload");
const router = express.Router();

router.post("/", uploadImage.array("images", 5), upload);

module.exports = router;
