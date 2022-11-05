// basic subdoc routes, like the comments in the fruit app

const express = require('express')
const passport = require('passport')

const Pet = require('../models/petModel')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// only need Create Update and Delete

// POST -> anybody can leave a pet a message
// POST /petMessages/<pet_id>
router.post('/petMessages/:petId', removeBlanks, (req, res, next) => {
    // get the petMessage from req.body
    const petMessages= req.body.petMessages
    const petId = req.params.petId
    // find the pet by it's ID
    Pet.findByIdAndUpdate(petId)
        .then(handle404)
        // add the petMessage to the pet
        .then(pet => {
            // push the petMessage into the pet's petMessage array and retunr the saved pet
            pet.petMessages.push(petMessages)
            console.log("this is the pet", pet)
            return pet.save()
        })
        .then(pet => res.status(201).json({ pet: pet }))
        .catch(next)
        // pass to the next thing
})

// Sarah and Emily tried below route to get messages to post.
// router.post('/petMessages/:petId', removeBlanks, (req, res, next) => {
//     try{
//     const petMessages = req.body.petMessages 
//     const petId = req.params.petId

//     Pet.findByIdAndUpdate(petId,  {petMessages: petMessages} ,
//         function (err, doc) {
//                 if (err){
//                 console.log(err)
//                 }
//                 else{
//                 console.log("Updated Pet : ", doc);
//                 }
//                 })
//     res.json({msg: "success"})
//     } catch (error){
//         console.log(error)
//         res.status(500).json({err:error})
//     }
// })


// UPDATE a petMessage
// PATCH -> /petMessages/<pet_id>//<petMessage_id>
router.patch('/petMessages/:petId/:petMessageId', requireToken, removeBlanks, (req, res, next) => {
    const { petId, petMessageId } = req.params
    //console.log('this is the petId\n', petId)
    //console.log('this is the petMessageId\n', petMessageId)
   

    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            const thePetMessage = pet.petMessages.id(petMessageId)
            //console.log('this is thePetMessage\n', thePetMessage)
            requireOwnership(req, pet)

            thePetMessage.set(req.body.petMessages)
            //console.log('this is the newPetMessage\n', req.body.petMessages)

            return pet.save()

        })
        .then(pet => res.sendStatus(204))
        .catch(next)
})


// DESTROY a petMessage
// DELETE -> /petMessages/<pet_id>//<petMessage_id>
router.delete('/petMessages/:petId/:petMessageId', requireToken, (req, res, next) => {
    const { petId, petMessageId } = req.params

    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            const thePetMessage = pet.petMessages.id(petMessageId)

            requireOwnership(req, pet)

            thePetMessage.remove()

            return pet.save()
        })
        .then(pet => res.sendStatus(204))
        .catch(next)
})

// export router
module.exports = router
