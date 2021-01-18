const router = require('express').Router();

const Posts = require('./post-model');

// middleware
const restricted = require('../middleware/restricted');

// 🌕   [GET] - all posts globally
router.get('/', restricted, async (_, res) => {
	try {
		const posts = await Posts.find();
		res.status(200).json(posts);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

// 🌕   [GET] - all posts for single location
router.get('/z/:zipCode', restricted, async (req, res) => {
	const { zipCode } = req.params;
	try {
		const posts = await Posts.findByZipCode(zipCode);
		res.status(200).json(posts);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

// 🌕   [GET] - all posts by single user
router.get('/u/:username', restricted, async (req, res) => {
	const { username } = req.params;
	try {
		const posts = await Posts.findByUsername(username);
		res.status(200).json(posts);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

// 🌕   [GET] - all likes on specific post
router.get('/p/:postId/likes', restricted, async (req, res) => {
	const { postId } = req.params;
	try {
		const likes = await Posts.getLikes(postId);
		res.status(200).json(likes);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

// 🌕   [GET] - all posts liked by single user
router.get('/u/:username/liked', restricted, async (req, res) => {
	const { username } = req.params;
	try {
		const likedPosts = await Posts.getLikedPosts(username);
		res.status(200).json(likedPosts);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

// 🌕   [POST] - create post
router.post('/p/create', restricted, async (req, res) => {
	const { description, imageUrl } = req.body;
	try {
		const newPost = await Posts.add({
			description: description,
			imageUrl: imageUrl,
			user_id: parseInt(process.env.USER_ID),
			location_id: parseInt(process.env.LOCATION_ID),
		});
		res.status(201).json(newPost);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

// 🌕   [PUT] - update post
router.put('/p/:postId', restricted, async (req, res) => {
	const { postId } = req.params;
	const changes = req.body;
	try {
		const updatedPost = await Posts.update(postId, changes);
		res.status(200).json(updatedPost);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

// 🌕   [DELETE] - delete post
router.delete('/p/:postId', restricted, async (req, res) => {
	const { postId } = req.params;
	try {
		await Posts.remove(postId);
		res.status(200).json({ message: `post with id ${postId} deleted` });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: err.message });
	}
});

module.exports = router;
