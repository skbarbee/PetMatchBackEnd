const express = require('express')
const passport = require('passport')
const Pet = require('../models/petModel')
require("dotenv").config()
const cloudinary = require('cloudinary').v2
//const upload = require('../../utils/multer')
// Remove console.log or comment it out
console.log(cloudinary.config().cloud_name)
const customErrors = require('../../lib/custom_errors')
// Remove unused import
const handle404 = customErrors.handle404
// Remove unused import
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
// Remove unused import
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// ////////////////////////////
// Create
// Post an image of the pet
///////////////////////////////
router.post('/image/:petId', removeBlanks, (req, res, next) => {
	try {
		const fileStr = req.body.image

		//console.log('this is the file\n', fileStr) 
		const petId = req.params.petId
		// Remove console log or comment it out
		console.log('this is fileStr in imagePost', fileStr)

		// console.log('this is the uploaded info\n', uploadedResponse)
		Pet.findByIdAndUpdate(petId, { img: fileStr },
			function (err, doc) {
				if (err) {
					// We don't want to console log our errors we always want to handle them
					// Instead of console logging here pass the error to next()
					// Remeber our `next()` will move along the error to the error handler that is in `server.js` `app.use(errorHandler)`
					// So here we can do `next(err)`
					console.log(err)
				}
				else {
					// Again we don't want to console log a success we want to handle it
					// We can just return the doc
					// return doc
					console.log("Updated Pet : ", doc);
				}
			})
		res.json({ msg: "success" })
	} catch (error) {
		// Remove console log or comment it out
		console.log(error)
		res.status(500).json({ err: error })
	}
})

/////////////////////////////////////////
// Export Router
/////////////////////////////////////////
module.exports = router