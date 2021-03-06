// search db to see if zip code exists
// if yes, add location_id to user
const db = require('../../data/dbConfig');

module.exports = {
	findByZipCode(zipCode) {
		return db('locations').where({ zipCode }).first();
	},
	findById(location_id) {
		return db('locations').where({ location_id }).first();
	},

	async add(zipCode) {
		return db('locations').insert({ zipCode });
	},
};
