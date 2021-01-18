exports.seed = function (knex) {
	return knex('posts')
		.del()
		.then(function () {
			return knex('posts').insert([
				{
					description: 'lorem ipsum dolor sit amet',
					imageUrl: `https://images.unsplash.com/photo-1575292005386-1d2ba352777d`,
					user_id: 1,
					location_id: 1,
				},
				{
					description: 'lorem ipsum dolor sit amet',
					imageUrl: `https://images.unsplash.com/photo-1575292005386-1d2ba352777d`,
					user_id: 2,
					location_id: 1,
				},
			]);
		});
};
