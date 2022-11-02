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
	})
	
	ratingSchema.virtual('ratingIcon').get(function () {
		if (this.type == "dog") {
			return " out of 5 bones"
		} else if  (this.type == "cat"){
			return 	" out of 5 fish-bones"
		} else {
			return " out of 5 stars"
		}
	})
	
	module.exports = ratingSchema