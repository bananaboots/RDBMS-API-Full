exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('students')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('students').insert([
				{ name: 'George Michael Bluth', cohort_id: 1 },
				{ name: 'Michael Bluth', cohort_id: 2 },
				{ name: 'George Bluth', cohort_id: 3 },
				{ name: 'Tobias Funke', cohort_id: 4 },
				{ name: 'Lindsey Bluth', cohort_id: 3 },
				{ name: 'Lucille Bluth', cohort_id: 3 },
				{ name: 'Buster Bluth', cohort_id: 4 },
			]);
		});
};
