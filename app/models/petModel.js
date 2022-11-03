const mongoose = require('mongoose')
const meetSchema = require('./meetModel')
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
			required: false,
		},
		rating: [ratingSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		meets: [meetSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
        	ref:'User',
        	require: true
		},
		
	},
	{
		timestamps: true,
		
	}
)

module.exports = mongoose.model('Pet', petSchema)