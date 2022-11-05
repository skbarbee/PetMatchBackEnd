// import dependencies
const mongoose = require('mongoose')

// rating is a subdoc NOT a model

const ratingSchema = new mongoose.Schema({

	scale: {
		type: Number,
	},
	comment: {
		type: String,
	},
	meetAgain: {
		type: Boolean,
	},
	author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true,
    },
}, {
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)
	
	
	
	module.exports = ratingSchema