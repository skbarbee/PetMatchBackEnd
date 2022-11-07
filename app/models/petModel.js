const mongoose = require('mongoose')
const meetSchema = require('./meet')
const ratingSchema = require('./rating')
const petMessageSchema = require('./petMessage')

const petSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: false,
		},
		typeOfPet: {
			type: String,
			required: true,
		},
		breed: {
			type: String,
			required: true,
		},
		likes: {
			type: String,
			required: true,
		},
		available: {
			type: Boolean,
			required: false,
		},
		rating: [ratingSchema],
		meets: [meetSchema],
		petMessages: [petMessageSchema],
		// Remove double `meets` field. Both are doing the same thing.
		meets: [meetSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)

petSchema.virtual('ratingIcon').get(function () {
	// Super cute!!!
	if (this.typeOfPet === "DOG") {
		return " out of 5 bones"
	} else if (this.typeOfPet === "CAT") {
		return " out of 5 fish-bones"
	} else {
		return " out of 5 stars"
	}
})

module.exports = mongoose.model('Pet', petSchema)