const cloudinary = require('cloudinary').v2

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


const upload_image = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" })
		}

		const result = await cloudinary.uploader.upload(req.body.image)

		return res.json({ status: 200, url: result.secure_url })
	} catch (error) {
		console.error(error.message)
		res.status(500).json({ error: "internal server error" })
	}
}

module.exports = {
	upload_image
}

