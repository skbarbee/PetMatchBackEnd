const mongoose = require('mongoose')

const meetSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    date: {
        type: String,
    },
    address: {
        type: String,
    }, 
}, {
    timestamps: true,
})

module.exports = meetSchema