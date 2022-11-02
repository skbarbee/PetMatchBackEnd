// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')


const Pet = require('../models/petModel')

// to throw a custom error
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

//pulling in Mongoose model for ratings
// const Rating = require('..models/rating')
// const Pet = require('../models/petModel')
// const router = express.Router()

// const removeBlanks = require('../../lib/remove_blank_fields')

//POST -> anybody can leave a rating for a pet (For now)
router.post('/rating/:petId', removeBlanks, (req, res, next) => {
    // get the rating from req.body
    const rating = req.body.rating
    const petId = req.params.petId
    // find the pet by its id
    Pet.findById(petId)
        .then(handle404)
        // add the rating to the pet
        .then(pet => {
            // push the rating into the pet's rating array and return the saved pet
            pet.rating.push(rating)

            return pet.save()
        })
        .then(pet => res.status(201).json({ pet: pet }))
        // pass to the next thing
        .catch(next)
})

module.exports = router