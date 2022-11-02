const mongoose = require('mongoose')

const meetSchema = new mongoose.Schema({
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
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