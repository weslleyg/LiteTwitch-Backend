const mongoose = require('mongoose');
const shortid = require('shortid');

const Stream = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: shortid.generate
		},
		streamer: {
			type: String,
			required: true,
			lowercase: true
		},
		theme: {
			type: String,
			lowercase: true,
			default: 'dark'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Stream', Stream);
