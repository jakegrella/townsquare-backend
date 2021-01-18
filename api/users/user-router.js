const router = require('express').Router();

const Users = require('./user-model');
const restricted = require('../middleware/restricted');

// delete user
router.delete('/:username', restricted, async (req, res) => {
	const { username } = req.params;
	try {
		await Users.remove(username);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

module.exports = router;
