exports.up = function (knex) {
	return knex.schema
		.createTable('locations', (table) => {
			table.increments('location_id');
			table.string('zipCode', 5);
		})
		.createTable('users', (table) => {
			table.increments('user_id');
			table.string('username', 32).notNullable().unique();
			table.string('password').notNullable();
			table
				.integer('location_id')
				.unsigned()
				.notNullable()
				.references('location_id')
				.inTable('locations')
				.onDelete('RESTRICT')
				.onUpdate('RESTRICT');
		})
		.createTable('posts', (table) => {
			table.increments('post_id');
			table.string('description').notNullable();
			table.string('imageUrl');
			table
				.integer('user_id')
				.unsigned()
				.notNullable()
				.references('user_id')
				.inTable('users')
				.onDelete('RESTRICT')
				.onUpdate('RESTRICT');
			table
				.integer('location_id')
				.unsigned()
				.notNullable()
				.references('location_id')
				.inTable('locations')
				.onDelete('RESTRICT')
				.onUpdate('RESTRICT');
		})
		.createTable('likes', (table) => {
			table.increments('like_id');
			table
				.integer('post_id')
				.unsigned()
				.notNullable()
				.references('post_id')
				.inTable('posts')
				.onDelete('RESTRICT')
				.onUpdate('RESTRICT');
			table
				.integer('user_id')
				.unsigned()
				.notNullable()
				.references('user_id')
				.inTable('users')
				.onDelete('RESTRICT')
				.onUpdate('RESTRICT');
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('likes')
		.dropTableIfExists('posts')
		.dropTableIfExists('users')
		.dropTableIfExists('locations');
};
