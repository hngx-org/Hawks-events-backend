const express = require("express");
const {
	uploadImage,
	upload,
} = require("../controller/upload");
const protect = require("../middlewares/protect");
const router = express.Router();

router.post("/", protect, uploadImage.array("images", 2), upload);

module.exports = router;
