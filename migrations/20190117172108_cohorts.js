// make changes to our DB
exports.up = function(knex, Promise) {
	// createTable takes 2 arguments: table name and callback
	return knex.schema
		.createTable('cohorts', function(tbl) {
			// primary key
			tbl.increments('id'); // if empty, defaults to a column named id
			// other fields
			tbl.text('name', 255).notNullable();
			// timestamps
			// tbl.timestamps(true, true);
			// constraints
			// tbl.unique('name', 'uq_cohorts_name');
		})
		.createTable('students', function(tbl) {
			tbl.increments('id');
			tbl.text('name').notNullable();
			tbl.integer('cohort_id')
				.references('id')
				.inTable('students');
		});
};

exports.down = function(knex, Promise) {
	// roll back the changes
    return knex.schema
        .dropTableIfExists('cohorts')
        .dropTableIfExists('students');
};

// same as doing:
// module.exports = {
//     up: function() {

//     },
//     down: function() {

//     }
// }
