const multer = require("multer");
// const sharp = require("sharp");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const { uploadSingleFile } = require("../config/cloudinary");
const constants = require("../config/constants");
const { BadGatewayError } = require("../error/errors");

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

const limits = { fileSize: process.env.MAX_FILE_SIZE || 1024 * 1024 };

const uploadImage = multer({ fileFilter, storage, limits });

const upload = async (req, res) => {
	try {
		const responses = [];

		if (!req.files || req.files.length === 0) {
			return res.status(400).json({ error: "Error: No files uploaded" });
		}
		
		if (req.files.length > 2)
			return res.status(400).json({ error: "Maximum number of files to uploaded is two" });

		const uploadPromises = req.files.map(async file => {
			const { path, buffer } = file;
		
			try {
				const uploadedfile = await uploadSingleFile(path);
				return uploadedfile;
			} catch (error) {
				console.error(error);
				fs.unlinkSync(path);
			}
		});

		responses.push(...await Promise.all(uploadPromises));

		return res.status(201).json({
			message: constants.MESSAGES.CREATED,
			statusCode: 201,
			data: responses,
		});
	} catch (error) {
		return res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	upload,
	uploadImage,
};
