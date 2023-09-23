const multer = require("multer");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const { uploadSingleFile } = require("../config/cloudinary");
const constants = require("../config/constants");
const { MESSAGES } = require("../config/constants");
const { ServerError } = require("../error/errors");

const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, callback) => {
    const filename =
      path.parse(file.originalname).name.replace(/\s/g, "") + uuid();
    const extension = path.parse(file.originalname).ext;
    callback(null, `${filename}${extension}`);
  },
});

const limits = { fileSize: 1024 * 1024 };

const fileFilter = (req, file, callback) => {
  if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/))) {
    callback(null, false);
  } else {
    callback(null, true);
  }
};

const uploadImage = multer({ fileFilter, storage, limits });

const upload = async (req, res) => {
  try {
    const responses = [];

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    if (req.files.length >= 3) {
      return res
        .status(400)
        .json({ error: "Maximum number of files to upload is two" });
    }

    for (const file of req.files) {
      const { path, buffer } = file;

      const uploadedfile = await uploadSingleFile(path);
      responses.push(uploadedfile);
      fs.unlinkSync(path);
    }

    return res.status(201).json({
      message: constants.MESSAGES.CREATED,
      statusCode: 201,
      data: responses,
    });
  } catch (error) {
    throw new ServerError(MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  upload,
  uploadImage,
};
