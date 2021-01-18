exports.seed = function (knex) {
	return knex('users')
		.del()
		.then(function () {
			return knex('users').insert([
				{
					username: 'username',
					password: 'password',
					location_id: 1,
				},
				{
					username: 'jake',
					password: 'password',
					location_id: 1,
				},
			]);
		});
};
