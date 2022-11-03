const mongoose = require('mongoose')

const meetSchema = new mongoose.Schema({
    person: {
        type: String,
        require: true
    },
    when: {
        type: String,
    },
    where: {
        type: String,
    }, 
}, {
    timestamps: true,
})

module.exports = meetSchema