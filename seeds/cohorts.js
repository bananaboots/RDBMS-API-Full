exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('cohorts')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('cohorts').insert([
				{ name: 'web13' },
				{ name: 'web14' },
				{ name: 'web15' },
				{ name: 'web16' },
			]);
		});
};