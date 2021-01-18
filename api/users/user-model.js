const db = require('../../data/dbConfig');

const Locations = require('../locations/locations-model');

module.exports = {
	find,
	findById,
	findBy,
	add,
	remove,
};

function find() {
	return db('users');
}

function findById(user_id) {
	return db('users').where({ user_id }).first();
}

function findBy(key) {
	return db('users').where(key).first();
}

async function add(user) {
	const [user_id] = await db('users').insert(user, 'user_id');
	return findById(user_id);
}

//messy
async function remove(username) {
	const [user_id] = await db('users').delete(username, 'username');
	return findById(user_id);
}
