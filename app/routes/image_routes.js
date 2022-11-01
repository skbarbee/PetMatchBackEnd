
const express = require('express')

const passport = require('passport')

const Pet = require('../models/petModel')

const  cloudinary  = require('../../utils/cloudinary')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.post('/image/:petId',removeBlanks, async (req, res, next)=>{
	try{
		const fileStr = req.body.image //maybe data
    	const petId = req.params.petId
		const uploadedResponse = await cloudinary.uploader.upload(fileStr)
		console.log(uploadedResponse)
		Pet.findByIdAndUpdate(petId, { img: uploadedResponse },
			function (err, doc) {
					if (err){
					console.log(err)
					}
					else{
					console.log("Updated Pet : ", doc);
					}
					})
		res.json({msg: "success"})
		} catch (error){
			console.log(error)
			res.status(500).json({err:error})
		}
	})
	
// router.post('/image/:petId', removeBlanks, async (req, res, next) => {
// 	console.log('this is cloudinary?\n', cloudinary.cloudinary)
//     const fileStr = req.body.image //maybe data
//     const petId = req.params.petId
// 	const uploadedResponse = await cloudinary.cloudinary.uploader.upload(fileStr, {
// 		upload_preset: 'petMatch'
// 	})
//     // find the pet by its id
//     Pet.findById(petId)
// 		.then((pet)=>{
// 			Promise.resolve(req.body.image)    
// 				.then(handle404)
//        // add image to Cloudinary
	  
//         		.then(uploadedResponse)
// 		 // add the image to the pet
// 				.then(pet => {
//             // push the pet into the pet's image array and return the saved pet
//            		pet.image.push(uploadedResponse)

//             	return pet.save()
//         	})
//         		.then(pet => res.status(201).json({ pet: pet }))
//         // pass to the next thing
//        	 		.catch((error=>{
// 				console.error()
// 		}))
// 		})
// 		.catch((error) =>{
// 			console.error()
// 		})
	
// })

// //get the image 
// router.get('/image/:petId', removeBlanks, async (req, res, next) => {
//     // get the toy from req.body
//     const petId = req.params.petId
// 	const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
// 		upload_preset: 'petMatch'
// 	})
//     // find the pet by its id
//     Pet.findById(petId)
//         .then(handle404)
//        // add image to Cloudinary
//         .then(uploadedResponse)
// 		 // add the image to the pet
// 		.then(pet => {
//             // push the pet into the pet's image array and return the saved pet
//             pet.image.push(uploadedResponse)

//             return pet.save()
//         })
//         .then(pet => res.status(201).json({ pet: pet }))
//         // pass to the next thing
//         .catch(next)
// })

module.exports = router