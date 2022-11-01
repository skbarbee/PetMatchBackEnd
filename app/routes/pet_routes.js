// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Pet = require('../models/petModel')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()


// ////////////////////////////
// Index
///////////////////////////////
// /pets
router.get('/petmatch', (req, res, next) => {
    Pet.find()
        .populate('owner')
        .then(pets => {
            return pets.map(pet => pet)
        })
        .then(pets =>  {
            res.status(200).json({ pets: pets })
        })
        .catch(next)
})

// ////////////////////////////
// Show
///////////////////////////////
// /petmatch/:id
router.get('/petmatch/:id', (req, res, next) => {
    Pet.findById(req.params.id)
    .populate('owner')
    .then(handle404)
    .then(pet => {
        res.status(200).json({ pet: pet })
    })
    .catch(next)

})


// ////////////////////////////
// Create
///////////////////////////////
// /pets
router.post('/petmatch', requireToken, (req, res, next) => {
    req.body.pet.owner = req.user.id

    // one the front end I HAVE TO SEND a pet as the top level key
    // pet: {name: '', type: ''}
    Pet.create(req.body.pet)
    .then(pet => {
        res.status(201).json({ pet: pet })
    })
    .catch(next)
    // .catch(error => next(error))

})

// ////////////////////////////
// Update
///////////////////////////////
// PATCH /pets/:id
router.patch('/petmatch/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.pet.owner

	Pet.findById(req.params.id)
		.then(handle404)
		.then(pet => {
			requireOwnership(req, pet)
			return pet.updateOne(req.body.pet)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// ////////////////////////////
// Destroy
///////////////////////////////
// DELETE /pets/:id
router.delete('/petmatch/:id', requireToken, (req, res, next) => {
	Pet.findById(req.params.id)
		.then(handle404)
		.then((pet) => {
			requireOwnership(req, pet)
			pet.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})


module.exports = router