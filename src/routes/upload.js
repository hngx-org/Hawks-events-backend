const express = require("express");
const {
	uploadImage,
	upload,
	handleNoFilesUploaded,
} = require("../controller/upload");
const protect = require("../middlewares/protect");
const router = express.Router();

router.post("/", protect, uploadImage.array("images", 5), upload);

module.exports = router;
