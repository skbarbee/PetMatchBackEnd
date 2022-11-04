// import dependencies
const mongoose = require('mongoose')

// toy is a subdoc NOT a model
// toy will be added in an array on pets
// one toy belongs to one pet -> NO SHARING!

const petMessageSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    message: {
        type: String
    }

}, {
    timestamps: true,
})

module.exports = petMessageSchema 