const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400
	});
}

class UserController {
	async register(req, res) {
		try {
			const user = await User.create(req.body);

			user.password = undefined;

			return res.json({
				user,
				token: generateToken({ id: user.id })
			});
		} catch (err) {
			return res.status(400).send({ error: 'Erro ao cadastrar' });
		}
	}
}

module.exports = new UserController();
