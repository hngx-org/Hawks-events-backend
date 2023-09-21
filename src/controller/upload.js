const multer = require("multer");
// const sharp = require("sharp");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const { uploadSingleFile } = require("../config/cloudinary");
const constants = require("../config/constants");

/*
1) storage line 15-23 @wisdom209
2) filefilter line 25-29 @enniewelt
3) rewrite the for loop in a fucntion @AjKenz
4) return securl_url 
*/
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, callback) => {
    const filename =
      path.parse(file.originalname).name.replace(/\s/g, "") + uuid();
    const extension = path.parse(file.originalname).ext;
    callback(null, `${filename}${extension}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/)))
    callback(null, false);
  callback(null, true);
};
const limits = { fileSize: 1024 * 1024 };

const uploadImage = multer({ storage: storage, fileFilter, limits });

const upload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files uploaded" });
    const responses = [];

    for (const file of req.files) {
      const { path, buffer } = file;
      //   const resizedImageBuffer = await sharp(buffer)
      //     .resize({ width: 1000, height: 1000 }) // Adjust dimensions as needed
      //         .toBuffer();
      const uploadedfile = await uploadSingleFile(path);
      responses.push(uploadedfile);
      fs.unlinkSync(path);
    }

    return res
      .status(201)
      .json({
        message: constants.MESSAGES.CREATED,
        statusCode: 201,
        data: responses,
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  upload,
  uploadImage,
};
