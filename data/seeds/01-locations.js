exports.seed = function (knex) {
	return knex('locations')
		.del()
		.then(function () {
			return knex('locations').insert([
				{
					zipCode: 90210,
				},
			]);
		});
};
