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



router.post('/petmatch/:id',requireToken ,removeBlanks, (req, res, next) => {
  
    const meet = req.body.meets
  console.log('this is the post' , meet)
    
    Pet.findById(req.params.id)
        .then(handle404)
        
        .then(pet => {
            
            pet.meets.push(meet)

            return pet.save()
        })
        .then(pet => res.status(201).json({ pet: pet }))
       
        .catch(next)
})


// export router
module.exports = router