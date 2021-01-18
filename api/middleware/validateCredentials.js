const validateCredentials = (req, res, next) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(400).json({ errMessage: 'missing username or password field' });
	} else if (typeof username !== 'string' || typeof password !== 'string') {
		res.status(400).json({ errMessage: 'fields must be strings' });
	} else {
		req.user = req.body;
		next();
	}
};

module.exports = validateCredentials;
