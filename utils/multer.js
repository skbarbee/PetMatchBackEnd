const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const storage = cloudinaryStorage({
folder: "petMatch",
allowedFormats: ["jpg", "png"],
transformation: [{
width: 400,
height: 400,
crop: "limit"
}],
cloudinary: cloudinary
});
module.exports = multer({storage: storage});