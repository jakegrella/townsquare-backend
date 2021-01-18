const router = require('express').Router();

const Likes = require('./like-model');

// middleware
const restricted = require('../middleware/restricted');

// 🌕   [POST] - like post
router.post('/like', restricted, async (req, res) => {
	const { post_id } = req.body;
	try {
		const like = await Likes.addLike(post_id, process.env.USER_ID);
		res.status(201).json(like);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

// 🌕   [DELETE] - delete post
router.delete('/unlike', restricted, async (req, res) => {
	const { post_id } = req.body;
	try {
		await Likes.removeLike(post_id, process.env.USER_ID);
		res.status(200).json({ message: `post with id ${post_id} unliked` });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

module.exports = router;
