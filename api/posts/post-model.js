const db = require('../../data/dbConfig');

module.exports = {
	// 🌕   [GET] - all posts globally
	find() {
		return db('posts');
	},

	// 🌕   [GET] - all posts for single location
	findByZipCode(zipCode) {
		return db('posts as p')
			.join('locations as l', 'l.location_id', 'p.location_id')
			.where('l.zipCode', zipCode);
	},

	// 🌕   [GET] - all posts by single user
	findByUsername(username) {
		return db('posts as p')
			.join('users as u', 'u.user_id', 'p.user_id')
			.where('u.username', username);
	},

	// 🌕   [GET] - all likes on specific post
	getLikes(postId) {
		return db('posts as p')
			.join('likes as l', 'l.post_id', 'p.post_id')
			.join('users as u', 'u.user_id', 'l.user_id')
			.select('l.post_id', 'l.user_id', 'u.username')
			.where('l.post_id', postId)
			.count();
	},

	// 🌕   [GET] - all likes on specific post
	getLikedPosts(username) {
		return db('posts as p')
			.join('likes as l', 'l.post_id', 'p.post_id')
			.join('users as u', 'u.user_id', 'l.user_id')
			.select('l.post_id', 'p.description', 'u.username')
			.where('u.username', username);
	},

	// 🌕   [POST] - create post
	async add(post) {
		return db('posts').insert(post);
	},

	// 🌕   [PUT] - update post
	async update(postId, change) {
		return db('posts').where({ post_id: postId }).update(change);
	},

	// 🌕   [DELETE] - delete post
	async remove(postId) {
		return db('posts').where({ post_id: postId }).del();
	},
};
