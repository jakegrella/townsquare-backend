const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		res.status(401).json({ errMessage: 'token required' });
	} else {
		jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				res.status(401).json('need valid token: ' + err.message);
			} else {
				req.decodeToken = decoded;
				next();
			}
		});
	}
};
