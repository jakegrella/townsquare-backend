exports.seed = function (knex) {
	return knex('users')
		.del()
		.then(function () {
			return knex('users').insert([
				{
					username: 'johnnyharris',
					password: 'johnnyharris',
					location_id: 1,
				},
				{
					username: 'jake',
					password: 'jake',
					location_id: 1,
				},
			]);
		});
};
