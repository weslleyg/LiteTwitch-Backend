const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const shortid = require('shortid');

const User = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: shortid.generate
		},
		username: {
			type: String,
			required: true,
			unique: true,
			required: [ true, 'Não pode estar em branco' ],
			match: [ /^[a-zA-Z0-9]+$/, 'is invalid' ],
			index: true
		},
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: [ true, 'Não pode estar em branco' ],
			match: [ /\S+@\S+\.\S+/, 'is invalid' ],
			index: true
		},
		password: {
			type: String,
			required: true,
			select: false
		}
	},
	{ timestamps: true }
);

User.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});

User.plugin(uniqueValidator, { message: 'Ja esta cadastrado!' });

module.exports = mongoose.model('User', User);
