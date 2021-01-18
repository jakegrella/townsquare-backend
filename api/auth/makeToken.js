const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');

const makeToken = (user) => {
	const payload = {
		subject: user.id,
		username: user.username,
		department: user.department,
	};
	const options = {
		expiresIn: '24hr',
	};
	return jwt.sign(payload, jwtSecret, options);
};

module.exports = makeToken;
