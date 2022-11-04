const express = require('express')
const passport = require('passport')

// pull in Mongoose model for pets
const Pet = require('../models/petModel')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()



router.post('/meets/:petId',removeBlanks, (req, res, next) => {
    const meet = req.body.meet
    const petId = req.params.petId
    Pet.findById(petId)
        .then(handle404)
        
        .then(pet => {
            
            pet.meets.push(meet)

            return pet.save()
        })
        .then(pet => res.status(201).json({ pet: pet }))
       
        .catch(next)
})


router.patch('/meets/:petId/:meetId', requireToken, removeBlanks, (req, res, next) => {
    const { petId,meetId } = req.params

    
    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
           
            const theMeet = pet.meets.id(meetId)
            requireOwnership(req, pet)

            theMeet.set(req.body.meet)

            return pet.save()
        })
        .then(pet => res.sendStatus(204))
        .catch(next)
})

router.delete('/meets/:petId/:meetId', requireToken, (req, res, next) => {
    const { petId,meetId } = req.params

    
    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            
            const theMeet = pet.meets.id(meetId)

           
            requireOwnership(req, pet)

            
            theMeet.remove()

            return pet.save()
        })
        .then(pet => res.sendStatus(204))
        .catch(next)
})


// export router
module.exports = router