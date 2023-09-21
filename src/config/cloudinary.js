const multer = require("multer");
// const sharp = require("sharp");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const { uploadSingleFile } = require("../config/cloudinary");
const constants = require("../config/cloudinary");
/*
1) storage line 15-23 @wisdom209
2) filefilter line 25-29 @enniewelt
3) rewrite the for loop in a fucntion @AjKenz
4)

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
