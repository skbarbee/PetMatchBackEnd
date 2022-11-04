const mongoose = require('mongoose')
const meetSchema = require('./meet')
const ratingSchema = require('./rating')


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
			required: true,
		},
		rating: [ratingSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		meets: [meetSchema],
		
		
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
        toJSON: { virtuals: true }
	}
)

	petSchema.virtual('ratingIcon').get(function () {
	if (this.typeOfPet === "DOG") {
		return " out of 5 bones"
	} else if  (this.typeOfPet ==="CAT"){
		return 	" out of 5 fish-bones"
	} else {
		return " out of 5 stars"
	}
})

module.exports = mongoose.model('Pet', petSchema)