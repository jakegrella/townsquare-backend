const db = require('../../data/dbConfig');

module.exports = {
	// 🌕   [POST] - like post
	async addLike(postId, userId) {
		return db('likes').insert({ post_id: postId, user_id: userId });
	},

	// 🌕   [DELETE] - delete post
	async removeLike(postId, userId) {
		return db('likes').where({ post_id: postId, user_id: userId }).del();
	},
};
