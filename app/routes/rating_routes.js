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


//POST -> anybody can leave a rating for a pet (For now)
router.post('/rating/:petId', requireToken, removeBlanks, (req, res, next) => {
    req.body.rating.author = JSON.stringify(req.user.email)
    // get the rating from req.body
    const rating = req.body.rating
    const petId = req.params.petId
    // find the pet by its id
    Pet.findById(petId)
        .then((pet)=>{
            pet.rating.push(rating)
            console.log("this is pet.rating\n", pet.rating)
            console.log(rating)
            return pet.save()
        })
        .then(pet => res.status(201).json({ pet: pet }))
        // pass to the next thing
        .catch(next)
})

//Update
router.patch('/rating/:petId/:ratingId', requireToken, (req, res, next) => {
    const { petId, ratingId } = req.params
 // find the pet
    Pet.findById(petId)
    .then(handle404)
    .then(pet => {
        // get the specific rating
        const theRating = pet.rating.id(ratingId)

        // make sure the user owns the pet
        requireOwnership(req, pet)

        // update that rating with the req body
        theRating.set(req.body.rating)

        return pet.save()
    })
    .then(pet => res.sendStatus(204))
    .catch(next)
})



// DESTROY a rating
// DELETE -> /ratings/<pet_id>/<rating_id>
router.delete('/rating/:petId/:ratingId', requireToken, (req, res, next) => {
    const { petId, ratingId } = req.params

    // find the pet
    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            // get the specific rating
            const theRating = pet.rating.id(ratingId)

            // make sure the user owns the pet
            requireOwnership(req, pet)

            // update that rating with the req body
            theRating.remove()

            return pet.save()
        })
        .then(pet => res.sendStatus(204))
        .catch(next)
})

module.exports = router