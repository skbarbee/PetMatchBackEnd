// const mongoose = require('mongoose')

<<<<<<< HEAD
// const exampleSchema = new mongoose.Schema(
// 	{
// 		title: {
// 			type: String,
// 			required: true,
// 		},
// 		text: {
// 			type: String,
// 			required: true,
// 		},
// 		owner: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: 'User',
// 			required: true,
// 		},
// 	},
// 	{
// 		timestamps: true,
// 	}
// )
=======
const exampleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true,
	}
)
>>>>>>> c9d22150e0c654b5fcb7274feb50d6d8f7723a42

// module.exports = mongoose.model('Example', exampleSchema)
