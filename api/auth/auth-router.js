const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');
const Locations = require('../locations/locations-model');

const makeToken = require('./makeToken');

// MIDDLEWARE
const validateCredentials = require('../middleware/validateCredentials');

// 🌕   REGISTER
router.post('/register', validateCredentials, async (req, res) => {
	//password
	const rounds = process.env.BCRYPT_ROUNDS || 10;
	const hash = bcrypt.hashSync(req.user.password, rounds);
	req.user.password = hash;

	// change zip code to location_id
	const location = await Locations.findByZipCode(req.user.zipCode);
	if (location === undefined) {
		await Locations.add(req.user.zipCode);
	}
	const newLocation = await Locations.findByZipCode(req.user.zipCode);
	req.user.location_id = newLocation.location_id;
	delete req.user.zipCode;
	try {
		const user = await Users.add(req.user);
		res.status(201).json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

// 🌕   LOGIN
router.post('/login', validateCredentials, async (req, res) => {
	try {
		const user = await Users.findBy({ username: req.user.username });
		if (user && bcrypt.compareSync(req.user.password, user.password)) {
			const token = makeToken(user);
			process.env.USERNAME = user.username;
			process.env.USER_ID = user.user_id;
			process.env.LOCATION_ID = user.location_id;
			res.status(200).json({
				message: `welcome ${user.username}`,
				user: user.username,
				token: token,
			});
		} else {
			res.status(401).json({ errMessage: 'invalid credentials' });
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

// 🌕   LOGOUT
router.post('/logout', validateCredentials, async (_, res) => {
	try {
		process.env.USERNAME = '';
		process.env.USER_ID = 0;
		process.env.LOCATION_ID = 0;
		res.status(200).json({ message: 'logout successful' });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

module.exports = router;
