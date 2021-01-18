exports.seed = function (knex) {
	return knex('likes')
		.del()
		.then(function () {
			return knex('likes').insert([
				{
					post_id: 1,
					user_id: 1,
				},
			]);
		});
};
