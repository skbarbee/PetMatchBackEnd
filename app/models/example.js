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
>>>>>>> 6b7b2abd2be69afbdfaeffe6fe85390def2b9d86

// module.exports = mongoose.model('Example', exampleSchema)
