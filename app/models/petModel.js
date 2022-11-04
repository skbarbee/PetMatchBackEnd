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
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		
	}
)

module.exports = mongoose.model('Pet', petSchema)