// import dependencies
const mongoose = require('mongoose')

const petMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    daysAvailable: {
        type: String
    }

}, {
    timestamps: true,
})

module.exports = petMessageSchema 